import express from 'express';
import path from 'path';

const app = express();
const port = 3005;

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