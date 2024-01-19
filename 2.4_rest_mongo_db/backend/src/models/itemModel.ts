import { ObjectId } from "mongodb";

interface Item {
    _id: ObjectId;
    text: string;
    checked: boolean;
}

export default Item;