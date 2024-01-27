import session from 'express-session';
import FileStore from 'session-file-store';


const FileStoreOptions = { logFn: function () { } };

const FileStoreSession = FileStore(session);

const sessionConfig: session.SessionOptions = {
    store: new FileStoreSession(FileStoreOptions),
    secret: 'keyboard cat',
    resave: true, // чи має сесія зберігатися
    saveUninitialized: true, // чи створювати сесію для нових користувачів
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // час життя куки в мілісекундах
    },
};

export default sessionConfig;