// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// function getRequired(name: string) {
//     const value = process.env[name];
//     if (!value) throw new Error("The env folder doesnt have the asked value");
//     return value;
// }

export const requiredInfo = {
    SERVER_PORT:3001,
    JWT_SECRET:'iamlearningtocode',
    SOCKET_PORT: 8080,
};
