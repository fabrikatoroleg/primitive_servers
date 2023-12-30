import fetch from 'node-fetch';

// URL для отримання IP-адреси від ipify API
const ipifyURL = 'https://api.ipify.org?format=json';

/**
 * Task 2.2.1
 * Використати node-fetch, щоб зробити запит await fetch("https://api.ipify.org?format=json"), 
 * отримати відповідь та вивести на екран свій айпі
 */
/**
 * Представляє структуру відповіді від ipify API.
 * @interface
 */
interface IpifyResponse {
    /**
    * IP-адреса користувача.
    * @type {string}
    */
    ip: string;
}
/**
 * Робить запит до ipify API, отримує IP-адресу користувача та
 * відображає його на консолі.
 * @returns {Promise<void>} Проміс який вирішується після завершення операції.
 */
const displayIpAddress = async (): Promise<void> => {
    try {
        // Зробіть запит до ipify API
        const response = await fetch(ipifyURL);
        // Розпакуйте відповідь JSON і обробіть її як IpifyResponse
        const data = await response.json() as IpifyResponse;
        // Відображення IP-адреси користувача на консолі
        console.log(`Task 2.2.1 IP: ${data.ip}`);
    } catch (error) {
        // Обробка помилок, які можуть виникнути під час операції
        console.error("Task 2.2.1 error:", error);
    }
};
// Виклик функції для отримання та відображення IP-адреси
displayIpAddress();

/**
 * Task 2.2.2
 * Напишіть функцію за мотивами п.2.2.1, яка повертає ваш айпі.
 */
/**
 * Здійснює запит до ipify API, отримує IP-адресу користувача та
 * виводить її на консоль.
 * @returns {Promise<string | null>} Проміс, який вирішується із значенням IP-адреси 
 * або null у випадку помилки.
 */
async function getIpAddress(): Promise<string | null> {
    try {
        // Зробіть запит до ipify API
        const response = await fetch(ipifyURL);
        // Розпакуйте відповідь JSON і обробіть її як IpifyResponse
        const data = await response.json() as IpifyResponse;
        // Отримайте IP-адресу з розпакованого об'єкта
        const ipAddress: string = data.ip;
        // Відображення IP-адреси користувача на консолі
        console.log(`Task 2.2.2 Your IP address: ${ipAddress}`);
        // Повернути IP-адресу як результат вирішеного промісу
        return ipAddress;
    } catch (error) {
        // Обробка помилок, які можуть виникнути під час операції
        console.error("Task 2.2.2 error: ", error);
        // Повернути null у випадку помилки
        return null;
    }
}
// Виклик функції для отримання та виведення IP-адреси
getIpAddress();