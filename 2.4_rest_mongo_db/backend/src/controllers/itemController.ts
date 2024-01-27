import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Item from '../models/itemModel';

// // база даних елементів
const itemsDatabase: Item[] = [];

/**
 * Обробник запиту GET   ___________________________________________     /api/v1/items.
 * Відправляє у відповідь масив елементів у форматі JSON.
 * Якщо сталася помилка, повертає відповідь з HTTP-кодом 500 та повідомленням про помилку.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleGetItems(req: Request, res: Response) {
    try {
        res.json({ items: itemsDatabase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/**
 * Обробник POST-запиту для створення нового елемента.
 * Приймає JSON з текстом у тілі запиту. Створює новий елемент з унікальним ідентифікатором та додає його до бази даних.
 * Повертає відповідь із створеним ідентифікатором або відповідь з HTTP-кодом 400 та повідомленням про помилку, якщо відсутній текст у тілі.
 * У разі помилки виводить її в консоль та повертає відповідь з HTTP-кодом 500 та повідомленням про помилку.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleAddItem(req: Request, res: Response) {
    try {
        // Парсинг тіла запиту
        const { text } = req.body;

        // Перевірка чи є текст в запиті
        if (!text) {
            return res.status(400).json({ error: 'Text is required in the request body' });
        }

        // Створення нового елемента
        const newItem: Item = {
            id: getNewItemId(),
            text,
            checked: false,
        };

        // Додавання елемента до бази даних
        itemsDatabase.push(newItem);

        // Відправлення відповіді з ідентифікатором нового елемента
        res.json({ id: newItem.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Пам'ять для зберігання останнього ідентифікатора
let lastItemId: number = 0;

// Отримати новий унікальний ідентифікатор для елемента
function getNewItemId(): number {
    lastItemId += 1;
    return lastItemId;
}

/**
 * Обробник PUT-запиту для зміни тексту та статусу запису за ідентифікатором.
 * Приймає JSON з ідентифікатором, новим текстом та новим статусом у тілі запиту.
 * Змінює відповідний запис у базі даних та повертає об'єкт підтвердження змін.
 * Повертає відповідь з HTTP-кодом 400 та повідомленням про помилку, якщо відсутній ідентифікатор у тілі.
 * У разі помилки виводить її в консоль та повертає відповідь з HTTP-кодом 500 та повідомленням про помилку.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleEditItem(req: Request, res: Response) {
    // 
    res.json({ message: 'EditItem action' });
}

/**
 * Обробник DELETE-запиту для видалення елемента за ідентифікатором.
 * Приймає JSON з ідентифікатором у тілі запиту. Видаляє елемент з бази даних та повертає об'єкт підтвердження видалення.
 * Повертає відповідь з HTTP-кодом 400 та повідомленням про помилку, якщо відсутній ідентифікатор у тілі.
 * У разі помилки виводить її в консоль та повертає відповідь з HTTP-кодом 500 та повідомленням про помилку.
 * @param req Об'єкт запиту (Request) з Express.
 * @param res Об'єкт відповіді (Response) з Express.
 */
export function handleDeleteItem(req: Request, res: Response) {
    try {
        // Парсинг тіла запиту
        const { id } = req.body;

        // Перевірка чи є ідентифікатор в запиті
        if (!id) {
            return res.status(400).json({ error: 'ID is required in the request body' });
        }

        // Знаходження індексу елемента за ідентифікатором
        const index = findItemIndexById(id);

        // Перевірка чи існує елемент з вказаним ідентифікатором
        if (index === -1) {
            return res.status(400).json({ error: 'Item with specified ID not found' });
        }

        // Видалення елемента з бази даних
        itemsDatabase.splice(index, 1);

        // Відправлення відповіді із підтвердженням видалення
        res.json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}