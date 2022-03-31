import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code == 11000) {
      const error = new ConflictException('A duplicate object already exists');
      response
        .status(error.getStatus())
        .json(error.getResponse());
      return;
    }

    const error = new InternalServerErrorException();
    response
      .status(error.getStatus())
      .json(error.getResponse());
  }
}
