import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto'
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasksStatus.enum'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { Op } from 'sequelize';
import { User } from 'src/user/user.entity';

@Injectable()
export class TasksService {

    constructor(@Inject('Task_REPOSITORY') private readonly taskRepository: typeof Task) { }

    async getAllTasks(user: User): Promise<Task[]> {
        return await this.taskRepository.findAll({ where: { userId: user.id } });
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const task = await this.taskRepository.findByPk(id);

        if (!task || task.userId !== user.id) {
            throw new NotFoundException(`task with id '${id}' not found`);
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = await this.taskRepository.create({ title, description, status: TaskStatus.OPEN, userId: user.id });
        return task;
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const task = await this.getTaskById(id, user);
        return await task.destroy();
    }

    async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);

        task.status = updateTaskStatusDto.status;
        return await task.save();

        await this.taskRepository.update({ status: updateTaskStatusDto.status }, { where: { id: id } });
        return await this.getTaskById(id, user);
    }

    async filterTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {

        const searchQuery = {
            [Op.or]: [
                {
                    title: { [Op.like]: `%${getTasksFilterDto.search}%` }
                },
                {
                    description: { [Op.like]: `%${getTasksFilterDto.search}%` }
                }
            ]
        }

        const statusQuery = {
            status: getTasksFilterDto.status
        }

        const query = {
            where: {
                [Op.and]: []
            }
        }

        query['where'][Op.and].push({ userId: user.id });

        if (getTasksFilterDto.search) {
            query['where'][Op.and].push({ ...searchQuery });
        }

        if (getTasksFilterDto.status) {
            query['where'][Op.and].push({ ...statusQuery });
        }

        const tasks = this.taskRepository.findAll(query);

        return tasks;
    }
}
