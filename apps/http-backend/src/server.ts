import express from 'express'; 
import { userRouter } from './routes/userRoute';
import {credentials} from '@repo/backend-common/config'
import cors from 'cors';
import { roomRouter } from './routes/roomRoute';
const app=express();
const corsOptions={
    origin:"http://localhost:3000"
}
const port=Number(credentials.HTTP_PORT);

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/user',userRouter);
app.use('/api/room',roomRouter);

if(!port){
    throw new Error('Invalid port number')
}
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})