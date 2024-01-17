import dgram from 'dgram';

// Створення UDP-сокету для клієнта
const client = dgram.createSocket('udp4');

// Задання параметрів сервера та повідомлення для відправки
const HOST: string = 'localhost';
const PORT: number = 8000;
const clientMessage = 'Hello, my primitive server';

// початковий час запиту еквівалентно до new Date().getTime(), але не створює проміжного об’єкта Date
const requestStartTime = Date.now();

// Відправка повідомлення на сервер
client.send(clientMessage, PORT, HOST, (err) => {
    // Обробка можливої помилки при відправці повідомлення
    if (err) {
        console.error(`Error sending message: ${err}`);
    } else {
        // Вивід інформації про успішну відправку повідомлення
        console.log(`Message sent to ${HOST}:${PORT} - ${clientMessage}`);
    }
    // Закриття UDP клієнта
    client.close();
});

// Обробка помилок
client.on('error', (error) => {
    console.error(`Помилка: ${error.message}`);
    client.close();
});