import { Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ErrorUtils {
  getErrorMessage(
    error: unknown,
    expectedErrorCode: string,
    errorMessage: string,
  ): string {
    return error instanceof QueryFailedError &&
      error.driverError.code === expectedErrorCode
      ? errorMessage
      : '';
  }
}
