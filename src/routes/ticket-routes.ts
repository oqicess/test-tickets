import { Router } from 'express';
import { TicketController } from '../controllers/ticket-controller';

const router = Router();

router.post('/', TicketController.createTicket);
router.get('/:id/in-progress', TicketController.takeTicketInProgress);
router.patch('/:id/complete', TicketController.completeTicket);
router.patch('/:id/cancel', TicketController.cancelTicket);
router.get('/', TicketController.getTickets);
router.get('/cancel-all', TicketController.cancelAllInProgressTickets);

export default router;
