import net from 'net';

const PORT: number = 3000;
const HOST: string = 'localhost';

// Create an TCP server
const server = net.createServer((socket) => {
    // Отримання IP-адреси
    const clientIPAddress: string | undefined = socket.remoteAddress;

    // Отримання поточного часу
    const currentTime: Date = new Date();
    const formattedTime: string = currentTime.toISOString();

    console.log(`[${formattedTime}] Accepted connection from: ${clientIPAddress}`);

    // Обробка події отримання даних від клієнта
    socket.on('data', (data) => {
        const receivedMessage: string = data.toString();

        const startTime = new Date().toLocaleString();

        console.log(`[${startTime}] Received message from client: ${receivedMessage}`);

        // Відправка того самого тексту у відповідь
        socket.write(receivedMessage);
    });

    // Обробка події закриття з'єднання з клієнтом
    socket.on('close', () => {
        const closeTime = new Date().toLocaleTimeString();
        console.log(`[${closeTime}] Connection with ${clientIPAddress} closed`);
    });
});

// Запуск сервера на вказаному порті та хості
server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

// Обробка події помилок сервера
server.on('error', (err) => {
    console.error(`Server error: ${err.message}`);
});

// Обробка події закриття сервера
server.on('close', () => {
    console.log('Server closed');
});