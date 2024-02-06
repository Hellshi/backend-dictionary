import { Inject } from '@nestjs/common';
import { CacheService } from 'src/app/cache/cache.service';

export const CacheProxyDecoratorResponse = (): MethodDecorator => {
  const injectService = Inject(CacheService);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    injectService(target, 'cacheService');
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const data = await originalMethod.apply(this, args);
      const cacheService: CacheService = this.cacheService;
      await cacheService.setWordCache(data);

      return data;
    };

    return descriptor;
  };
};
