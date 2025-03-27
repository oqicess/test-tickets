import dotenv from 'dotenv';
import express from 'express';
import database from './config/database';
import ticketRoutes from './routes/ticket-routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await database.sync();
        console.log('Таблицы синхронизированы');

        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (error) {
        console.error('Ошибка подключения к БД:', error);
    }
}

start();
