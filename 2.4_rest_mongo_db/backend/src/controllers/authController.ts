import { Request, Response } from 'express';
import User from '../models/userModel';

// база даних користувачів
const usersDatabase = [];

/**
 * Обробник POST-запиту для авторизації користувача.
 * Приймає JSON із логіном та паролем у тілі запиту. Перевіряє валідність логіну та пароля.
 * У разі успішної авторизації зберігає інформацію про користувача у сесії.
 * Повертає відповідь із об'єктом { "ok": true } у випадку успішної авторизації.
 * У разі невдалої авторизації або помилки виводить її в консоль та повертає відповідь
 * з HTTP-кодом 500 та повідомленням про помилку.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleLogin(req: Request, res: Response) {
    try {
        const { login, pass } = req.body;

        // Пошук користувача за логіном
        const user = users.find((user) => user.login === login);

        // перевірка пароля
        if (user && user.password === pass) {

            // Зберігання інформації про користувача у сесії
            // req.session.user = { login }; ____________________________________________________________________

            // Успішна аутентифікація
            res.status(200).json({ "ok": true });
        } else {
            // Невірний логін або пароль
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad Request" });
    }
};


/**
 * Обробник POST-запиту для виходу користувача з системи та завершення сесії.
 * Не приймає жодних параметрів. Рубає поточну сесію користувача.
 * Повертає відповідь із об'єктом { "ok": true } у випадку успішного завершення сесії.
 * У разі помилки виводить її в консоль та повертає відповідь з HTTP-кодом 500 та повідомленням про помилку.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleLogout(req: Request, res: Response) {
    try {
        // Знищення сесії (виход з системи)
        req.session.destroy((err: Error | null) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                // Відправлення відповіді про успішне завершення сесії
                res.status(200).json({ "ok": true });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad Request" });
    }
}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const users: User[] = [];

/**
 * Обробник POST-запиту для реєстрації нового користувача.
 * Приймає JSON з об'єктом `{ "login": "...", "pass": "..." }`. Перевіряє, чи існує користувач із таким логіном.
 * Якщо такий користувач вже існує, повертає відповідь з HTTP-кодом 400 та повідомленням про помилку.
 * Якщо користувача з таким логіном не знайдено, додає нового користувача та відправляє відповідь із `{ "ok": true }`.
 * У разі помилки виводить її в консоль та повертає відповідь з HTTP-кодом 400 та повідомленням про помилку.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleRegister(req: Request, res: Response) {
    try {
        // Розпакування логіну та паролю із тіла запиту
        const { login, pass } = req.body;

        // Перевірка, чи користувач із таким логіном вже існує
        const existingUser = users.find((user) => user.login === login);
        if (existingUser) {
            // Відправлення відповіді з HTTP-кодом 400 та повідомленням про помилку
            res.status(400).json({ error: "User with this login already exists" });
            return;
        }

        // Додавання нового користувача до бази даних

        const newUser: User = { login, password: pass, items: [] };

        users.push(newUser);

        res.status(200).json({ "ok": true });
    } catch (error) {
        console.error(error);
        // Відправлення відповіді з HTTP-кодом 400 та повідомленням про помилку у разі виникнення помилки
        res.status(400).json({ error: "Bad Request" });
    }
}

/**
 * Обробник GET-запиту для отримання інформації про поточну сесію користувача.
 * Виводить в консоль об'єкт сесії у JSON-форматі та повертає його відповідь.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleGetSession(req: Request, res: Response) {
    try {
        // Вивід об'єкта сесії у JSON-форматі в консоль
        console.log(JSON.stringify(req.session));

        // Відправлення відповіді із об'єктом сесії
        res.json({ session: req.session });
    } catch (error) {
        console.error(error);
        // Відправлення відповіді з HTTP-кодом 500 та повідомленням про помилку, якщо є помилка
        res.status(500).json({ error: 'Internal Server Error' });
    }
}