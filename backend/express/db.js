import { createConnection } from 'mysql';

export const connection = createConnection({
    host: 'localhost',
    user: 'test',
    password: '1234',
    database: 'blog_db',
});