import { Request, Response } from 'express';

// 
export function handleLogin(req: Request, res: Response) {
    // 
    res.json({ message: 'Login action' });
}

export function handleLogout(req: Request, res: Response) {
    // 
    res.json({ message: 'Logout action' });
}

export function handleRegister(req: Request, res: Response) {
    // 
    res.json({ message: 'Register action' });
}