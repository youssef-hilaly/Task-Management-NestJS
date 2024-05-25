import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasksStatus.enum";

export class GetTasksFilterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    
    @IsOptional()
    @IsString()
    search: string;
}