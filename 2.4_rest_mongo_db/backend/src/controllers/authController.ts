import { Request, Response } from 'express';
import User from '../models/userModel';


// Логін користувача
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

export function handleLogout(req: Request, res: Response) {
    try {
        // Знищення сесії (виход з системи)
        // req.session.destroy((err: Error | null) => {
        //     if (err) {
        //         console.error(err);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     } else {
        //         res.status(200).json({ "ok": true });
        //     }
        // });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad Request" });
    }
}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const users: User[] = [];
export function handleRegister(req: Request, res: Response) {
    try {
        // &&&&&&&&&
        const { login, pass } = req.body;

        // Перевірка, чи користувач із таким логіном вже існує
        const existingUser = users.find((user) => user.login === login);
        if (existingUser) {
            res.status(400).json({ error: "User with this login already exists" });
            return;
        }

        // Додавання нового користувача до масиву (в реальному додатку використовуйте базу даних)

        const newUser: User = { login, password: pass, items: [] };

        users.push(newUser);

        res.status(200).json({ "ok": true });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad Request" });
    }
}

export const handleGetSession = async (req: Request, res: Response) => {
    // Logging the session
    // console.log(JSON.stringify(req.session))
} 