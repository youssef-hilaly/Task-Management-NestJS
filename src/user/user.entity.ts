import { Column, DataType, PrimaryKey, Table,Model, Unique, HasMany } from "sequelize-typescript";
import { Task } from "src/tasks/task.entity";

@Table
export class User extends Model{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({
        unique: true
    })
    userName:string;

    @Column
    password:string;

    @HasMany(()=> Task)
    tasks: Task[];
}