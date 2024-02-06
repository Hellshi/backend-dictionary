import { Inject } from '@nestjs/common';
import { CacheService } from 'src/app/cache/cache.service';

export const CacheProxyDecoratorResponse = (): MethodDecorator => {
  const injectService = Inject(CacheService);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    injectService(target, 'cacheService');
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const cacheService: CacheService = this.cacheService;

      const cachedWord = await cacheService.getWordCache(args[0]);

      if (cachedWord) {
        return cachedWord;
      }

      const data = await originalMethod.apply(this, args);
      await cacheService.setWordCache(data);

      return data;
    };

    return descriptor;
  };
};
