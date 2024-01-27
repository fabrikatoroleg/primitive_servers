import express from 'express';
import { handleLogin, handleLogout, handleRegister, handleGetSession } from '../controllers/authController';
import { handleGetItems, handleDeleteItem, handleAddItem, handleEditItem } from '../controllers/itemController';
const v1Routes = express.Router();

// Шляхи для маршрутів API
const ITEMS_PATH = '/items'; // Маршрути для операцій з елементами (CRUD: створення, читання, оновлення, видалення)
const LOGIN_PATH = '/login'; // Маршрут для логіну - надає можливість користувачам увійти в систему та отримати доступ
const LOGOUT_PATH = '/logout'; // Маршрут для логауту - користувач може вийти з системи або завершити сесію
const REGISTER_PATH = '/register'; // Маршрут для реєстрації нових користувачів в системі
const SESSION_PATH = '/session' // Маршрут, пов'язаний із сесіями користувача (отримання/оновлення параметрів сесії)

// Визначення маршрутів API для обробки різних запитів
v1Routes
    .get(ITEMS_PATH, handleGetItems) // GET /items - Отримати елементи
    .post(ITEMS_PATH, handleAddItem) // POST /items - Додати новий елемент
    .put(ITEMS_PATH, handleEditItem) // PUT /items - Редагувати існуючий елемент
    .delete(ITEMS_PATH, handleDeleteItem) // DELETE /items - Видалити елемент
    .post(LOGIN_PATH, handleLogin) // POST /login - Виконати логін
    .post(LOGOUT_PATH, handleLogout) // POST /logout - Виконати логаут
    .post(REGISTER_PATH, handleRegister) // POST /register - Зареєструвати нового користувача
    .get(SESSION_PATH, handleGetSession);  // GET /session - Отримати інформацію про сесію

export default v1Routes;