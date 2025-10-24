import express from 'express';
import { userRouter } from './Router/userRouter';
const app=express();
app.use(express.json());

app.use('/api/v1/user',userRouter);

app.listen(3001,()=>{
    console.log("server is listening on port 3001");
})