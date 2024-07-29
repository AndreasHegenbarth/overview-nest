import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { ItemsModule } from './items/items.module';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [ItemsModule, AuthzModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
