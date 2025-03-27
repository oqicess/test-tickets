import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum TicketStatus {
    NEW = 'Новое',
    IN_PROGRESS = 'В работе',
    COMPLETED = 'Завершено',
    CANCELED = 'Отменено',
}

@Table
export class Ticket extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    subject!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;

    @Column({ type: DataType.ENUM(...Object.values(TicketStatus)), defaultValue: TicketStatus.NEW })
    status!: TicketStatus;

    @Column({ type: DataType.TEXT, allowNull: true })
    resolutionText?: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    cancelReason?: string;
}
