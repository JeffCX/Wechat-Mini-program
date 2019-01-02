

//finger coordinate pressed
var startX = 0;
var startY = 0;

//finger move coordinate
var moveX = 0;
var moveY = 0;

//substraction
var x;
var y;

var length = 6

//snake tougue 
var snakeHead = {
  x:0,
  y:0,
  color:"#ff0000",
  width:20,
  height:20
}

//snake body 
var snakeBody = []

//direction
var direction;
var snakeDirection="right"

var screenWidth
var screenHeight 

wx.getSystemInfo({
  success(res) {
    screenWidth = res.windowWidth
    screenHeight = res.windowHeight
  }
})

var NumberOfBoxes = 15
var boxes = []
for (var i = 0; i < NumberOfBoxes;i++){
  boxes.push({
    width:20,
    height:20,
    color:"#F0FFF0",
    x:Math.round(Math.random() * screenWidth),
    y: Math.round(Math.random() * screenHeight)
  })
}


Page({
 canvasStart:function(e){
  startX = e.touches[0].x 
  startY = e.touches[0].y
  console.log("x",startX)
   console.log("y", startY)
 },
 canvasMove:function(e){
   moveX = e.touches[0].x
   moveY = e.touches[0].y 
   x = moveX - startX 
   y = moveY - startY 
   if(Math.abs(x)>Math.abs(y) && x>0){
     direction = "right"
     console.log("right")
   } else if (Math.abs(x) > Math.abs(y) && x < 0){
     direction = "left"
     console.log("left")
   } else if (Math.abs(x) < Math.abs(y) && y > 0){
     direction="down"
     console.log("")
   } else if (Math.abs(x) < Math.abs(y) && y < 0){
     direction="up"
     console.log("up")
   }
 },
 canvasEnd(e){
   snakeDirection = direction
   
 },
 onReady:function(){
   //get canvas context 
  var context = wx.createContext()
  var frameNum = 0;

   function draw(Obj) {
     context.setFillStyle(Obj.color)
     context.beginPath()
     context.rect(Obj.x, Obj.y, Obj.width, Obj.height)
     context.closePath()
     context.fill()

   }

   function collide(width, height, x1, y1, x2, y2) {
     var p1 = Math.abs(x1 - x2) - (width + width) / 2
     var p2 = Math.abs(y1 - y2) - (height + height) / 2
     if (p1 < 0 && p2 < 0) {
       return true
     }

     return false

   }




  function animate(){
    frameNum++
    if(frameNum % 15 ==0){
      //get the previous position 
      snakeBody.push({
        x: snakeHead.x,
        y: snakeHead.y,
        width: 20,
        height: 20,
        color: "black"
      })

      if (snakeBody.length > length) {
        snakeBody.shift()
      }
     
      switch (snakeDirection) {
        case "left":
          snakeHead.x -= snakeHead.width 
          break;

        case "right":
          snakeHead.x += snakeHead.width 
          break;


        case "up":
          snakeHead.y -= snakeHead.height 
          break;


        case "down":
          snakeHead.y += snakeHead.height 
          break;
      }
    }

  
    draw(snakeHead)
    for (var i = 0; i < snakeBody.length; i++) {
      var snakeBodyObj = snakeBody[i]
      draw(snakeBodyObj)

    }

    for (var i = 0; i < boxes.length; i++) {
      var snakeBodyObj = boxes[i]
      draw(snakeBodyObj)
    }



      for(var j=0;j<boxes.length;j++){
        if (collide(20, 20, boxes[j].x, boxes[j].y,snakeHead.x,snakeHead.y)){       
         boxes[j].x+=1000
          boxes.push({
            width: 20,
            height: 20,
            color: "#F0FFF0",
            x: Math.round(Math.random() * screenWidth),
            y: Math.round(Math.random() * screenHeight)
          })
         length +=1
        }
      }
 





    
    wx.drawCanvas({
      canvasId:"main",
      actions:context.getActions()
    })

    requestAnimationFrame(animate)
  }

  animate()
 }
})
