import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3005;

// Використовуйте cors middleware, щоб дозволити звертання до сервера з іншого домену
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// Статичні файли з frontend
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

// Обробник для відправлення index.html при запиті 
app.get('/', (req, res) => {
    // Вказати шлях до index.html
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});

// Слухаємо на заданому порту
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});