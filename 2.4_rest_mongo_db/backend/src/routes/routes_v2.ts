import express, { Router, Request, Response } from 'express';

import { handleLogin, handleLogout, handleRegister } from '../controllers/authController';
import { handleGetItems, handleDeleteItem, handleAddItem, handleEditItem } from '../controllers/itemController';

const v2Routes: Router = express.Router();

// Роутер для обробки
v2Routes.all('/router', async (req: Request, res: Response) => {
  try {
    // по query string викликайте конкретну функцію
    const { action } = req.query;

    // Валідація параметра action
    if (!action) {
      return res.status(400).json({ error: `The "action" parameter is required` });
    }

    // Визначити відповідну функцію в залежності від action
    switch (action) {
      // Обробляє логін
      case 'login':
        handleLogin(req, res);
        break;
      // Обробляє вихід користувача з системи чи облікового запису
      case 'logout':
        handleLogout(req, res);
        break;
      // Обробляє реєстрацію нового користувача в системі
      case 'register':
        handleRegister(req, res);
        break;
      // Обробляє отримання елементів
      case 'getItems':
        handleGetItems(req, res);
        break;
      // Обробляє видалення елемента
      case 'deleteItem':
        handleDeleteItem(req, res);
        break;
      // Обробляє додавання елемента
      case 'addItem':
        handleAddItem(req, res);
        break;
      // Обробляє редагування елемента
      case 'editItem':
        handleEditItem(req, res);
        break;
      default:
        res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    // Обробка помилок
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default v2Routes;