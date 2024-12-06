import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(port: number): string {
    return `Hello World! My port ${port}`;
  }
}
