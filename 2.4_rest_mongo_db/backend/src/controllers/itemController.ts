import { Request, Response } from 'express';

// 

export function handleGetItems(req: Request, res: Response) {
    // 
    res.json({ message: 'GetItems action' });
}

export function handleDeleteItem(req: Request, res: Response) {
    // 
    res.json({ message: 'DeleteItem action' });
}

export function handleAddItem(req: Request, res: Response) {
    // 
    res.json({ message: 'AddItem action' });
}

export function handleEditItem(req: Request, res: Response) {
    // 
    res.json({ message: 'EditItem action' });
}
