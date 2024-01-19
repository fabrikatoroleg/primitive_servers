import Item from './itemModel'

interface User {
    login: string;
    password: string;
    items: Array<Item>
}

export default User;