import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../database/database.module'
import { tasksProviders } from './tasks.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders]
})
export class TasksModule { }
