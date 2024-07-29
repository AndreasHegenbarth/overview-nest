import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {

    @Get()
    listMessages(): string {
        return 'This action returns list messages';
    }

    @Post('')
    createMessage(@Body() body: CreateMessageDto): string {
        console.log(body);
        return 'This action adds a new message';
    }
    
    @Get('/:id')
    getMessage(@Param('id') id: string): string {
        console.log(id);
        return 'This action returns one message';
    }

}
