import { query } from '../index';

const createUserTableSQL = `
CREATE TABLE IF NOT EXISTS "User" (
    "user_id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
);
`;
const createTokenTableSQL = `
CREATE TABLE IF NOT EXISTS "Token" (
    "token_id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY ("user_id")
        REFERENCES "User" ("user_id")
);
`;
const createArticleTableSQL = `
CREATE TABLE IF NOT EXISTS "Article" (
    "article_id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "is_published" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY ("user_id")
        REFERENCES "User" ("user_id")
);
`;
const SQLStrings = [
    createUserTableSQL,
    createTokenTableSQL,
    createArticleTableSQL
];
const createTables = async () => {
    for (const string of SQLStrings) {
        await query({ text: string });
    }
};
createTables();
