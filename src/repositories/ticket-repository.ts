import { Ticket, TicketStatus } from '../models/tickets/ticket';

export class TicketRepository {
    static async findById(id: number) {
        return await Ticket.findByPk(id);
    }

    static async createTicket(subject: string, description: string) {
        return await Ticket.create({ subject, description });
    }

    static async updateTicketStatus(id: number, status: TicketStatus, resolutionText?: string, cancelReason?: string) {
        return await Ticket.update({ status, resolutionText, cancelReason }, { where: { id } });
    }

    static async getTickets(filter?: { date?: string; from?: string; to?: string }) {
        const where: any = {};
        if (filter?.date) where.createdAt = filter.date;

        if (filter?.from && filter?.to) where.createdAt = { between: [filter.from, filter.to] };

        return await Ticket.findAll({ where });
    }

    static async cancelAllInProgressTickets() {
        return await Ticket.update({ status: TicketStatus.CANCELED }, { where: { status: TicketStatus.IN_PROGRESS } });
    }
}
