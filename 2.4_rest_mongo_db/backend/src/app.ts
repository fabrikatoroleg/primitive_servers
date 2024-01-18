import express from 'express';
import path from 'path';

const app = express();
const port = 3005;

// Вказати шлях до статичних файлів (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Обробник для відправлення index.html при запиті на корінь
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Решта вашого коду Express...

// Слухати на заданому порту
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});