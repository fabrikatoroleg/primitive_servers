import http from 'http';

// повідомлення, яке буде надіслано за певним протоколом на програму-сервер
const clientMessage = "Hello, my primitive server"

// початковий час запиту еквівалентно до new Date().getTime(), але не створює проміжного об’єкта Date
const requestStartTime = Date.now();

/**
 * Параметри HTTP-запиту.
 *
 * @type {http.RequestOptions}
 */
const options: http.RequestOptions = {
    hostname: 'localhost', // хост на який надсилається завит
    port: 8000, // Порт сервера
    path: '/', // Шлях запиту
    method: 'POST',  // Метод запиту (у цьому випадку POST)
    headers: {
        'Content-Type': 'text/plain',   // Тип контенту        
        'Content-Length': Buffer.byteLength(clientMessage), // довжина тіла запиту
    },
};

/**
 * Створює HTTP-запит та надсилає повідомлення.
 *
 * @param {http.RequestOptions} options - Налаштування HTTP-запиту.
 * @param {Function} callback - Функція, яка буде викликана при отриманні відповіді.
 * @param {http.IncomingMessage} res - Вхідне повідомлення від сервера.
 */
const req = http.request(options, (res) => {
    let responseData = '';

    // Обробка події отримання даних
    res.on('data', function (chunk) {
        responseData += chunk;
    });
    // Обробка події завершення отримання даних
    res.on('end', () => {
        // час отримання відповіді
        const responseEndTime = Date.now();
        // час, витрачений на запит і відповідь
        const requestResponseTime = responseEndTime - requestStartTime;
        /* Вивести на екран, чи вийшов у відповідь той же текст, що був відправлений, 
        і сумарний час, який пішов на передачу даних та отримання їх назад*/
        if (clientMessage === responseData) {
            console.log('Response matches the sent message');
        } else {
            console.log('Response does not match the sent message');
        }
        console.log(`The total time spent on data transmission and reception: ${requestResponseTime} ms`);
        // поки не знаю чи потрібна ця частина
        console.log(`Received message from server: ${responseData}`);
    });
});

/**
 * Обробляє помилки під час виконання запиту.
 *
 * @param {Object} error - Об'єкт, який представляє помилку.
 * @param {string} error.message - Повідомлення про помилку.
 */
req.on('error', (error: { message: any; }): void => {
    console.log(`problem with request: ${error.message}`);
});
// записати дані в тіло запиту
req.write('data\n');
req.write('data\n');
req.end();