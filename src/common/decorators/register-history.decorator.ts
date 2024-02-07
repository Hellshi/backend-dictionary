import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request, Response } from 'express';
import repositoryCatalogFactory from 'src/database/repositories/common/factory/genericRepositoru.factory';

export const RegisterHistoryDecorator = (): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const [context] = args.filter((arg) => arg?.request && arg?.response);
      const {
        user: { userId },
      } = context.request;

      const data = await originalMethod.apply(this, args);
      const repositories = await repositoryCatalogFactory();
      await repositories.userHistory.insert({
        word: args[0],
        userId,
      });

      return data;
    };

    return descriptor;
  };
};

export const ContextDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const response: Response = ctx.switchToHttp().getResponse();
    return { request, response };
  },
);
