import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType, HasOne, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import { TaskStatus } from "./tasksStatus.enum";
import { User } from "src/user/user.entity";
import { Exclude } from "class-transformer";

@Table
export class Task extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4, 
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    status: TaskStatus;


    @BelongsTo(()=> User)
    user: User;
}