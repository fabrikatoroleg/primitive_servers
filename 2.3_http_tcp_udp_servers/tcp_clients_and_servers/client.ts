import net from 'net';

const HOST = 'localhost';
const PORT = 3000;

// повідомлення, яке буде надіслано за певним протоколом на програму-сервер
const clientMessage = "Hello, my primitive server"

// Створення нового клієнтського сокета
const client = new net.Socket();

// час початку передачі даних
const requestStartTime = Date.now();

// Встановлення з'єднання з сервером
client.connect(PORT, HOST, () => {
    console.log(`Connected to server at ${HOST}:${PORT}`);
    // Відправка повідомлення серверу
    client.write(clientMessage);
});

// Обробка події отримання даних від сервера
client.on('data', (data) => {
    const responseData = data.toString();
    // час отримання відповіді
    const responseEndTime = Date.now();

    // час, витрачений на запит і відповідь
    const requestResponseTime = responseEndTime - requestStartTime;
    /* Вивести на екран, чи вийшов у відповідь той же текст, що був відправлений, 
            і сумарний час, який пішов на передачу даних та отримання їх назад*/
    if (clientMessage === responseData) {
        console.log('Response matches the sent message');
    } else {
        console.log('Response does not matches the sent message');
    }

    console.log(`The total time spent on data transmission and reception: ${requestResponseTime} ms`);

    // поки не знаю чи потрібна ця частина
    console.log(`Received message from server: ${responseData}`);

    // Закриття з'єднання після отримання відповіді
    client.end();

});

// обробка події помилок 
client.on("error", (err) => {
    console.log(err);
});

// Обробка події закриття з'єднання
client.on('close', () => {
    console.log('Connection closed');
});