"use client"
import { ReactNode,useState,createContext, SetStateAction } from "react";

 type Shape='rect'|'circle';
interface ShapeContextType{
    shapeType:Shape;
    setShapeType:React.Dispatch<SetStateAction<Shape>>
}
export const ShapeContext=createContext<ShapeContextType|null>(null);

export const ShapeProvider=({children}:{children:ReactNode})=>{
    const [shapeType,setShapeType]=useState<Shape>('rect');
    return(
        <ShapeContext.Provider value={{shapeType,setShapeType}}>
            {children}
        </ShapeContext.Provider>
    );
}