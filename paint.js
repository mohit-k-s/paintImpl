let activeTool = null
let tools =[]

document.getElementById('paint-brush').addEventListener('click', ()=> {
  
  activeTool = new BrushTool()
  actions.push('tool-switch')
  tools.push('paint-brush')
})
document.getElementById('pen').addEventListener('click', () =>{
  
  activeTool = new LineTool()
  tools.push('pen')
  actions.push('tool-switch')
})


function createCanvas(width, height, set2dTransform = true) {
    const ratio = Math.ceil(window.devicePixelRatio);
    const canvas = document.createElement('canvas');
    canvas.style.width= `${width}px`;
    canvas.style.height=`${height}px`;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    if (set2dTransform) {
      canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    return canvas;
}

const redChannel = document.getElementById('red')
const greenChannel = document.getElementById('green')
const blueChannel = document.getElementById('blue')

const changeColor = () =>{
    canvas.style.backgroundColor = `rgb(${redChannel.value} ,${greenChannel.value}, ${blueChannel.value })`
}

const changeWidth = (lw) =>{
    ctx.lineWidth = lw
}


const toolsPop = () =>{
  if(tools) {
    tools.pop()
  }
}
const toolSelect =(i) =>{
  if(i >0 && tools.length > 0) {
    if(tools[i] ==='pen')  activeTool = new LineTool()
    else if(tools[i] ==='brush') activeTool= new BrushTool()
  }
}

/**
 * Draw all the actions from i to j in actions array, j is the last action before array ends or tool-switch
 * all the actions are assumed draw actions here
 * @param {*} tool 
 * @param {*} i 
 * @param {*} j 
 */
const drawWithcurrentTool = (i, j) =>{
    let fp = actions[i]
    activeTool.firstPoint(new Point(fp.x, fp.y))
    for(let k =i+1; k<=j ;++k) {
      let {x, y} = actions[k];
      activeTool.makeLine(new Point(x, y))
    }
}

const undoLastAction = () =>{
  console.log(actions)
  ctx.clearRect(0, 0, W, H)
  if(actions.length > 0){
    let lastAction = actions.pop()
    if(lastAction === 'tool-switch') toolsPop()
    let t = 0 
    for(let i =0; i< actions.length ;){
      if(actions[i] === 'tool-switch'){
        i++;
        console.log(t)
        toolSelect(t)
        while(i < actions.length  && actions[i] === 'tool-switch') { i++; t++ ; }
        console.log(t)
        let j = i++
        if(t-1 > 0) toolSelect(t-1) // last tool is what we want
        if(j < actions.length){
            while(i < actions.length && actions[i+1] !== 'tool-switch' ) i++;
            if(i == actions.length ) i--;
            if(activeTool)drawWithcurrentTool(j, i) ;
        }
        

      }else i++;
    }
  }
}


const redo = ()=>{
  
}


let actions = []


redChannel.addEventListener('change', changeColor)
greenChannel.addEventListener('change', changeColor)
blueChannel.addEventListener('change', changeColor)


const canvas = createCanvas(1000, 600)
canvas.id ='canvas'
document.body.appendChild(canvas)
let W = 1000 
let H = 600

const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true

ctx.lineWidth = 2
ctx.strokeStyle ='red'


canvas.addEventListener('mousedown', (event)=>{
  let x = event.x - canvas.offsetLeft
  let y = event.y - canvas.offsetTop

  if(activeTool){
    if(!activeTool.p1) { 
      activeTool.firstPoint(new Point(x, y))
    }else activeTool.makeLine(new Point(x, y))
  }

  let imageData = ctx.getImageData(0, 0, W, H).data
  let pixelIndex = 4 * (x + y*W)
  console.log(imageData[pixelIndex], imageData[pixelIndex+1], imageData[pixelIndex+2], imageData[pixelIndex+3])

  actions.push(new MouseAction(x, y))

})

window.addEventListener('keypress', (ev) =>{
  if(ev.ctrlKey && ev.key ==='z') undoLastAction()
})



//run()