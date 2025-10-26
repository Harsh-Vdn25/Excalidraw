interface RectType{
    type:"rect";
    x:number;
    y:number;
    width:number;
    height:number;
}
interface CircleType{
    type:"circle";
    centerX:number;
    centerY:number;
    radius:number;
}
type Shape=CircleType|RectType;
export default function initDraw(canvas: HTMLCanvasElement) {
  const ctx=canvas.getContext('2d')
  let existingShapes:Shape[]=[];
  if(!ctx)return;
  let startX = 0;
  let startY = 0;
  let clicked = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  canvas.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width=e.clientX-startX;
    const height=e.clientY-startY;
    existingShapes.push({
        type:'rect',
        x:startX,
        y:startY,
        height,
        width
    })
    clearCanvas(existingShapes,canvas,ctx);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) {
      return;
    }
    const width = (e.clientX - startX);
    const length = (e.clientY - startY);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    clearCanvas(existingShapes,canvas,ctx);
    ctx.strokeRect(startX, startY, width, length);
  });
}

function clearCanvas(existingShapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    existingShapes.map((shape:Shape)=>{
        if(shape.type==='rect'){
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
        }
    })
}