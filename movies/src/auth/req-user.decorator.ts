import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const ReqUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp().getRequest<Request>();
    return ctx.user;
  }
)
