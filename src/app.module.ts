import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(
      'mongodb+srv://prasad:12345@prasad.qao3nk3.mongodb.net/prasad?retryWrites=true&w=majority',
    ),
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
