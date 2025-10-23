const dotenv=require('dotenv');
dotenv.config();

function getRequired(name:string){
    if(!name){
        throw new Error("No name given"); 
    }
    const value=process.env.JWT_SECRET;
    if(!value){
        throw new Error("The env folder doesnt have the asked value"); 
    }
    return value;
}


export const requiredInfo={
    PORT:"",
    JWT_SECRET:getRequired('JWT_SECRET'),
    
}