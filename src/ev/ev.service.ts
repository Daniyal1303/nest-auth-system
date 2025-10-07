/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EvService {
  constructor(private configService: ConfigService) {}

  getApiBaseUrl(): string {
    return this.configService.get<string>('API_BASE_URL');
  }
}
