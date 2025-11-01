import {z} from 'zod'

const Join=z.object({
    type:z.literal('join-room'),
    roomId:z.number()
})
const Draw=z.object({
    type:z.literal('draw'),
    roomId:z.number(),
    shapeObj:z.any()
})

type JoinType=z.infer<typeof Join>
type DrawType=z.infer<typeof Draw>

const IPType={
    "join-room":Join,
    "draw":Draw
}

export function IPCheck(data:string){
    if(!data)return;
    const parsedData:(JoinType|DrawType)=JSON.parse(data);
    try{
        const IPdata=IPType[parsedData.type].safeParse(parsedData);
        if(!IPdata.success){
        return;
    }
    return IPdata.data;
    }catch(err){
        return;
    }
}