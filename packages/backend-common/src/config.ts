const path=require('path');
require('dotenv').config({path:'../../.env'});
function getRequired(name:string){
    if(!name){
        console.log('Name not provided');
        return null;
    }
    const value=process.env[name];
    if(!value){
        throw new Error('dotenv doesnot have the asked value');
    }
    return value;
}
export const credentials={
    JWT_SECRET:getRequired('JWT_SECRET'),
    HTTP_PORT:getRequired('HTTP_PORT'),
    WS_PORT:getRequired('WS_PORT'),
}