import { TicketStatus } from '../models/tickets/ticket';
import { TicketRepository } from '../repositories/ticket-repository';

export class TicketService {
    static async findById(id: number) {
        return await TicketRepository.findById(id);
    }

    static async createTicket(subject: string, description: string) {
        return await TicketRepository.createTicket(subject, description);
    }

    static async takeTicketInProgress(id: number) {
        const ticket = await this.findById(id);

        if (!ticket) {
            throw new Error('Обращение не найдено');
        }

        if (ticket?.status === TicketStatus.IN_PROGRESS) {
            throw new Error('Обращение в работе');
        }

        return await TicketRepository.updateTicketStatus(id, TicketStatus.IN_PROGRESS);
    }

    static async completeTicket(id: number, resolutionText: string) {
        const ticket = await this.findById(id);

        if (!ticket) {
            throw new Error('Обращение не найдено');
        }

        if (ticket?.status === TicketStatus.COMPLETED) {
            throw new Error('Обращение завершено');
        }

        return await TicketRepository.updateTicketStatus(id, TicketStatus.COMPLETED, resolutionText);
    }

    static async cancelTicket(id: number, cancelReason: string) {
        const ticket = await this.findById(id);

        if (!ticket) {
            throw new Error('Обращение не найдено');
        }

        if (ticket?.status === TicketStatus.CANCELED) {
            throw new Error('Обращение уже отменено');
        }

        return await TicketRepository.updateTicketStatus(id, TicketStatus.CANCELED, undefined, cancelReason);
    }

    static async getTickets(filter?: { date?: string; from?: string; to?: string }) {
        return await TicketRepository.getTickets(filter);
    }

    static async cancelAllInProgressTickets() {
        return await TicketRepository.cancelAllInProgressTickets();
    }
}
