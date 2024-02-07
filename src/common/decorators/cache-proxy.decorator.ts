import { Inject } from '@nestjs/common';
import { CacheService } from '../../app/cache/cache.service';
import { WordsService } from '../../app/words/words.service';

export const CacheProxyResponseDecorator = (): MethodDecorator => {
  const injectService = Inject(CacheService);
  const injectWordService = Inject(WordsService);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    injectService(target, 'cacheService');
    injectWordService(target, 'wordsService');
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const [context] = args.filter((arg) => arg?.request && arg?.response);
      const cacheService: CacheService = this.cacheService;
      const wordsService: WordsService = this.wordsService;

      const { response } = context;

      const cachedWord = await cacheService.getWordCache(args[0]);

      if (cachedWord) {
        response.setHeader('x-cache', 'values HIT');
        return cachedWord;
      }

      const data = await originalMethod.apply(this, args);
      await cacheService.setWordCache(data);
      await wordsService.registerNeologism(args[0]);
      response.setHeader('x-cache', 'values MISS');
      return data;
    };

    return descriptor;
  };
};
