import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

interface Repository {
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(content: string): Promise<any>;
}

@Injectable()
export class MessagesService {
    
    constructor(public messagesRepo: MessagesRepository) {}


    findOne(id: string) {
        console.log('MessagesService');
        return this.messagesRepo.findOne(id);
    }

    findAll() {
        return this.messagesRepo.findAll();
    }

    create(content: string) {
        return this.messagesRepo.create(content)
    }
}
