import express from 'express';
import cors from 'cors';
import { userRouter } from './Router/userRouter';
const app=express();
app.use(express.json());
const corsOptions={
    origin:"http://localhost:3000"
}
app.use(cors(corsOptions))
app.use('/api/v1/user',userRouter);

app.listen(3001,()=>{
    console.log("server is listening on port 3001");
})