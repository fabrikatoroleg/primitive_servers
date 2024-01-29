import { Request, Response } from 'express';
import Item from '../models/itemModel';
// 

const items: Item[] = [];

export function handleGetItems(req: Request, res: Response) {
    try {
        res.json({ items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
