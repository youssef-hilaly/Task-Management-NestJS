import { Body, Controller, Get, Post, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasksStatus.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthCredentialsDto } from 'src/user/auth/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
// Controllers are responsible for handling incoming requests and returning responses to the client.
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getTasks(@Body() getTasksFilterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        if (Object.keys(getTasksFilterDto).length) {
            return await this.tasksService.filterTasks(getTasksFilterDto, user);
        }
        else
            return await this.tasksService.getAllTasks(user);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return await this.tasksService.getTaskById(id, user);
    }

    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return await this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return await this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    async updateStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
        return await this.tasksService.updateTaskStatus(id, updateTaskStatusDto, user);
    }

}
