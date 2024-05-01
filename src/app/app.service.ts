import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): { message: string } {
    return { message: 'Hi folk, This API made by @ratchanonp' };
  }
}
