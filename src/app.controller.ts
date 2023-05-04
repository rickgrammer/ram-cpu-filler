import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

const fillRam = (mb: number) => {
  const bytes = mb*1024*1024
  const buffer =  Buffer.alloc(bytes)
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = i % 256;
  }
  return buffer
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ram/:mb/timeout/:timeout')
  async ram(@Param('mb') mb: number, @Param('timeout') timeout: number) {
    const ram = fillRam(mb)
    await new Promise((r) => setTimeout(r, timeout*1000))
    return {
      ram: ram.byteLength/1024
    }
  }

  @Get('cpu/:timeout')
  cpu(@Param('timeout') timeout: number): any {
    const t = new Date().getTime()
    while (true) {
      if (new Date().getTime()-t > timeout*1000) break
    }
    return {
      timeout
    }
  }
}
