import http from 'http';

// Порт, на якому працює сервер.
const PORT: number = 8000;
// Хост, на якому розміщений сервер.
const HOST: string = "localhost";

// Create an HTTP server
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    let requestData = '';

    // Отримати IP-адресу клієнта
    const clientIPAddress: string | undefined = req.socket.remoteAddress;
    // Отримуємо поточний час
    const currentTime = new Date().toLocaleTimeString();
    // Виведення інформації про клієнта та час події
    console.log(`[${currentTime}] Accepted connection from: ${clientIPAddress}`);

    // Обробляє подію отримання частини даних запиту
    req.on('data', (chunk) => {
        // Додає отриману частину даних до загальних отриманих даних
        requestData += chunk;
        // час отримання даних
        const startTime = new Date().toLocaleString();
        // Виведення в консоль отриманих даних та часу отримання
        console.log(`[${startTime}] Повідомлення прийняте від клієнта: ${requestData}`);
    });

    // Обробник події завершення отримання даних запиту
    req.on('end', () => {
        const endTime = new Date().toLocaleString();
        // Встановлення статусу коду
        res.statusCode = 200;
        // Встановлення заголовка Content-Type
        res.setHeader('Content-Type', 'text/plain');
        // Відправлення отриманих даних назад клієнту
        res.end(requestData);
        // Виведення в консоль часу відправлення відповіді
        console.log(`[${endTime}] Відповідь надіслано`);
    });

    // Обробник події закриття з'єднання з клієнтом
    req.on('close', () => {
        const closeTime = new Date().toLocaleTimeString();
        console.log(`[${closeTime}] Connection with ${clientIPAddress} closed`);
    });
});

// Запуск сервера на вказаному порті та хості, і виведення адреси у консоль після успішного запуску.
server.listen(PORT, HOST, () => {
    console.log(`Server running at http:// ${HOST}:${PORT}`);
});