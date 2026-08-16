import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post('chat')
  @HttpCode(200)
  chat(@Body() body: { message: string; history?: Array<{ role: 'user' | 'assistant'; content: string }> }) {
    return this.ai.chat(body.message || '', body.history || []);
  }

  @Post('realtime/session')
  @HttpCode(200)
  async realtimeSession(@Res() response: { status: (code: number) => { json: (body: unknown) => void } }) {
    const result = await this.ai.realtimeSession();
    response.status(result.statusCode).json(result.body);
  }

  @Post('speech')
  async speech(
    @Body() body: { text: string; voice?: string },
    @Res() response: { status: (code: number) => { json: (body: unknown) => void }; setHeader: (key: string, value: string) => void; send: (body: Buffer) => void }
  ) {
    const result = await this.ai.speech(body.text || '', body.voice);
    if ('statusCode' in result) {
      return response.status(result.statusCode).json(result.body);
    }

    response.setHeader('content-type', 'audio/mpeg');
    return response.send(Buffer.from(await result.arrayBuffer()));
  }
}
