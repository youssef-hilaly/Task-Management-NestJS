import { Task } from './task.entity';

export const tasksProviders = [{
    provide: 'Task_REPOSITORY',
    useValue: Task,
}];