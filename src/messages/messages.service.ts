import { MessagesRepository } from "./messages.repository";

export class MessagesService {
    constructor(public messagesRepository: MessagesRepository) {}


    findOne(id: string) {
        console.log('MessagesService');
        return this.messagesRepository.findOne(id);
    }

    findAll() {
        return this.messagesRepository.findAll();
    }

    create(content: string) {
        return this.messagesRepository.create(content)
    }
}
