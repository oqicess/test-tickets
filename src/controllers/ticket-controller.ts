import { Request, Response } from 'express';
import { TicketService } from '../services/ticket-service';

export class TicketController {
    static async createTicket(req: Request, res: Response) {
        try {
            const { subject, description } = req.body;
            const ticket = await TicketService.createTicket(subject, description);
            res.status(201).json(ticket);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка создания обращения', error: error.message });
        }
    }

    static async takeTicketInProgress(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await TicketService.takeTicketInProgress(Number(id));
            res.json({ message: 'Обращение взято в работу' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка обновления статуса обращения', error: error.message });
        }
    }

    static async completeTicket(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { resolutionText } = req.body;
            await TicketService.completeTicket(Number(id), resolutionText);
            res.json({ message: 'Обращение завершено' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка завершения обращения', error: error.message });
        }
    }

    static async cancelTicket(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { cancelReason } = req.body;
            await TicketService.cancelTicket(Number(id), cancelReason);
            res.json({ message: 'Обращение отменено' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка отмены обращения', error: error.message });
        }
    }

    static async getTickets(req: Request, res: Response) {
        try {
            const tickets = await TicketService.getTickets(req.query);
            res.json(tickets);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка получения списка обращений', error: error.message });
        }
    }

    static async cancelAllInProgressTickets(req: Request, res: Response) {
        try {
            await TicketService.cancelAllInProgressTickets();
            res.json({ message: `Все обращения 'В работе' отменены` });
        } catch (error: any) {
            console.error(error); 
            res.status(500).json({ message: 'Ошибка отмены всех обращений в работе', error: error.message });
        }
    }
}
