
//Section ___: Initialize Canvas
var canvas = document.getElementById("main_canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d");

var Rows = 12
var Cols = 19
var side_bar_x = 120
var tile_size
var board_width
var board_height
initBoardSize()
resizeCanvas()

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
function resizeCanvas() {         //dangerous to allow resize midgame; affects game boundaries
  //console.log("resizing")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
function initBoardSize() {
  tile_size = Math.round((canvas.width - side_bar_x) / (Rows+1)) //max width

  //trim width
  board_width = side_bar_x + (tile_size * Rows)
  if (board_width > canvas.width) {
    tile_size = Math.round((canvas.height) / (Cols+1))
  }

  //trim height
  board_height = tile_size * Cols
  if (board_height > canvas.height) {
    tile_size = Math.round((canvas.height) / (Cols+1))
  }

  //update board variables
  board_width = side_bar_x + (tile_size * Rows)
  board_height = tile_size * Cols
}

//Section ___: Initialize Board Elements
var tile = []
for (col = 0; col < Cols; col++){
  tile.push([])
  for (row = 0; row < Rows; row++){
    tile[col].push([0])
  }
}
var tile_orientation = 0

//Section ___: Game Speed Variables
var gravity = 28                 //lower = faster
var DownMovement = tile_size*2   //down button speed
var level_increment = 2
var gravity_escalation = .9

function NewLineCompleted() {
  stats_lines +=1
  if (stats_lines % level_increment == 0) {
    gravity = gravity * gravity_escalation;
    stats_level+=1
  }
}

//Section ___: Prepare Side Bar
var stats_level = 1
var stats_lines = 0
var side_timer = 0

function startTime() {
  side_timer += 1
}

function draw_side_bar () {
  document.getElementById("display_timer").innerHTML = side_timer
  document.getElementById("display_lines").innerHTML = stats_lines
  document.getElementById("display_level").innerHTML = stats_level
  document.getElementById("score").value = stats_lines    //for high score data (TODO: could improve)
}

//Section ___: Initialize Tiles
function getRandomInt(max) {
  return RandomRow = Math.floor(Math.random() * max);
}
var Tile_Bit = {}
function InitTiles() {
  Tile_Bit[0] = {   //piece
    x: side_bar_x + (tile_size * getRandomInt(Rows-3)), //center
    y: 0,
    testx: 0,
    testy: 0,
    alive: false
  }
  Tile_Bit[1] = {   //piece
    x: Tile_Bit[0].x + tile_size*(1), //center
    y: 0,
    testx: 0,
    testy: 0,
    alive: false
  }
  Tile_Bit[2] = {   //piece
    x: Tile_Bit[0].x + tile_size*(2), //center
    y: 0,
    testx: 0,
    testy: 0,
    alive: false
  }
  Tile_Bit[3] = {   //piece
    x: Tile_Bit[0].x + tile_size*(3), //center
    y: 0,
    testx: 0,
    testy: 0,
    alive: false
  }
  Tile_Bit[4] = {   //piece
    x: Tile_Bit[0].x + (tile_size*0), //center
    y: tile_size,
    testx: 0,
    testy: 0,
    alive: false
  }
  Tile_Bit[5] = {   //piece
    x: Tile_Bit[0].x + tile_size*(1), //center
    y: tile_size,
    testx: 0,
    testy: 0,
    alive: false
  }
  Tile_Bit[6] = {   //piece
    x: Tile_Bit[0].x + tile_size*(2), //center
    y: tile_size,
    testx: 0,
    testy: 0,
    alive: false
  }
  Tile_Bit[7] = {   //piece
    x: Tile_Bit[0].x + tile_size*(3), //center
    y: tile_size,
    testx: 0,
    testy: 0,
    alive: false
  }
}

var random_piece = 0
function NewPiece (){
  //piece(0) = OOOO    aqua
  //           XXXX

  //piece(1) = XOOO    blue
  //           XXX0

  //piece(2)=  OOOX    orange
  //           0XXX

  //piece(3) = 0XX0    yellow
  //           0XX0

  //piece(4) = OXX0     green
  //           XXO0

  //piece(5) = OXO0     purple
  //           XXX0

  //piece(6) = XXO0     red
  //           OXX0

  random_piece = getRandomInt(7)
  if (random_piece == 0) {
    Tile_Bit[0].alive = true
    Tile_Bit[1].alive = true
    Tile_Bit[2].alive = true
    Tile_Bit[3].alive = true
    Tile_Bit[4].alive = false
    Tile_Bit[5].alive = false
    Tile_Bit[6].alive = false
    Tile_Bit[7].alive = false
    for (i=0; i<8; i++){
      Tile_Bit[i].color = "#00ffff"
    }
  }
  if (random_piece == 1) {
    Tile_Bit[0].alive = true
    Tile_Bit[1].alive = true
    Tile_Bit[2].alive = true
    Tile_Bit[3].alive = false
    Tile_Bit[4].alive = true
    Tile_Bit[5].alive = false
    Tile_Bit[6].alive = false
    Tile_Bit[7].alive = false
    for (i=0; i<8; i++){
      Tile_Bit[i].color = "#0000ff"
    }
  }
  if (random_piece == 2) {
    Tile_Bit[0].alive = true
    Tile_Bit[1].alive = true
    Tile_Bit[2].alive = true
    Tile_Bit[3].alive = false
    Tile_Bit[4].alive = false
    Tile_Bit[5].alive = false
    Tile_Bit[6].alive = true
    Tile_Bit[7].alive = false
    for (i=0; i<8; i++){
      Tile_Bit[i].color = "#ff7f00"
    }
  }
  if (random_piece == 3) {        //TODO: disable rotate?
    Tile_Bit[0].alive = true
    Tile_Bit[1].alive = true
    Tile_Bit[2].alive = false
    Tile_Bit[3].alive = false
    Tile_Bit[4].alive = true
    Tile_Bit[5].alive = true
    Tile_Bit[6].alive = false
    Tile_Bit[7].alive = false
    for (i=0; i<8; i++){
      Tile_Bit[i].color = "#ffff00"
    }
  }
  if (random_piece == 4) {            //rotating funny
    Tile_Bit[0].alive = false
    Tile_Bit[1].alive = true
    Tile_Bit[2].alive = true
    Tile_Bit[3].alive = false
    Tile_Bit[4].alive = true
    Tile_Bit[5].alive = true
    Tile_Bit[6].alive = false
    Tile_Bit[7].alive = false
    for (i=0; i<8; i++){
      Tile_Bit[i].color = "#00ff00"
    }
  }
  if (random_piece == 5) {
    Tile_Bit[0].alive = false
    Tile_Bit[1].alive = true
    Tile_Bit[2].alive = false
    Tile_Bit[3].alive = false
    Tile_Bit[4].alive = true
    Tile_Bit[5].alive = true
    Tile_Bit[6].alive = true
    Tile_Bit[7].alive = false
    for (i=0; i<8; i++){
      Tile_Bit[i].color = "#800080"
    }
  }
  if (random_piece == 6) {
    Tile_Bit[0].alive = true
    Tile_Bit[1].alive = true
    Tile_Bit[2].alive = false
    Tile_Bit[3].alive = false
    Tile_Bit[4].alive = false
    Tile_Bit[5].alive = true
    Tile_Bit[6].alive = true
    Tile_Bit[7].alive = false
    for (i=0; i<8; i++){
      Tile_Bit[i].color = "#ff0000"
    }
  }

  //randomize tile_orientation       //TODO: notworking, not enough space
  //if (Math.random() > .5) {
  //}

}

//Section __: draw tile borders
function draw_borders(){
  //for (col = 0; col < Cols; col++){
  //  for (row = 0; row < Rows; row++){
  //    ctx.beginPath();
  //    ctx.rect(side_bar_x + (row*tile_size), col*tile_size, tile_size, tile_size);
  //    ctx.stroke();
  //  }
  //}
  var i = 0
  for (row = 0; row < Rows; row+=2){   //see previously identified col-row mismatch!
    i++
    if (i % 2 == 0) {ctx.fillStyle = "#f2f2f2"}
    else {ctx.fillStyle = "#e6e6e6"}
    ctx.fillRect(side_bar_x + (row*tile_size), 0, tile_size*2, tile_size*Cols);
  }
  ctx.beginPath();
  ctx.rect(side_bar_x, 0, tile_size*Rows, tile_size*Cols);
  ctx.stroke();
}

//Section __: draw existing pieces
function draw_existing_pieces() {
  for (col = 0; col < Cols; col++){
    for (row = 0; row < Rows; row++){
      if (tile[col][row] != 0) {
        ctx.fillStyle = tile[col][row]                                      //fill
        ctx.fillRect(side_bar_x + (row*tile_size)+1, col*tile_size+1, tile_size-2, tile_size-2)

        ctx.beginPath();                                                    //border
        ctx.rect(side_bar_x + (row*tile_size), col*tile_size, tile_size, tile_size)
        ctx.stroke();
      }
    }
  }
}

//Section __: draw pieces
function draw_pieces() {
  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    if (Tile_Bit[bit].alive == true) {
      ctx.fillStyle = Tile_Bit[bit].color                                 //fill
      ctx.fillRect(Tile_Bit[bit].x+1, Tile_Bit[bit].y+1, tile_size-2, tile_size-2)

      ctx.beginPath();                                                    //border
      ctx.rect(Tile_Bit[bit].x, Tile_Bit[bit].y, tile_size, tile_size);
      ctx.stroke();
    }
  }
}

//Section ___: User Left-Right-Flip Inputs
function keydown(event) {
  if (event.keyCode == 13) { //return
    event.preventDefault()
  }
  if (event.keyCode == 40) { //down
    event.preventDefault()
  }
  else if (event.keyCode == 37) { //left
    event.preventDefault()
  }
  else if (event.keyCode == 39) { //right
    event.preventDefault()
  }
  else if (event.keyCode == 32) { //space
    event.preventDefault()
  }
}
function keyup(event) {
  if (Pause == false) {
    if (event.keyCode == 13) { //return
      KeyReturn()
      event.preventDefault()
    }
    if (event.keyCode == 40) { //down
      KeyDown()
      event.preventDefault()
    }
    else if (event.keyCode == 37) { //left
      KeyLeft()
      event.preventDefault()
    }
    else if (event.keyCode == 39) { //right
      KeyRight()
      event.preventDefault()
    }
    else if (event.keyCode == 32) { //space
      KeySpace()
      event.preventDefault()
    }
  }
}
document.addEventListener("keydown", keydown)
document.addEventListener("keyup", keyup)

//detect mobile actions
var canvasElem = document.getElementById('main_canvas')
var rect = canvas.getBoundingClientRect();
var startx
var starty
var endx
var endy

canvasElem.addEventListener('touchstart', function(e){
  var touchobj = e.changedTouches[0]
  rect = canvas.getBoundingClientRect();
  startx = touchobj.clientX - rect.left;
  starty = touchobj.clientY - rect.top;
  //mousedown_event(true, startx, starty)
  e.preventDefault()
}, false)
canvasElem.addEventListener('touchend', function(e){
  var touchobj = e.changedTouches[0]
  rect = canvas.getBoundingClientRect();
  endx = touchobj.clientX - rect.left;
  endy = touchobj.clientY - rect.top;
  mouse_event()
  e.preventDefault()
}, false)

function mouse_event(){
  absx = Math.abs(startx-endx)
  absy = Math.abs(starty-endy)
  if (Pause == false) {
    if (absx >= absy) { //horizant event
      if (startx > endx) { //left
        KeyLeft()
      }
      else {               //right
        KeyRight()
      }
    }
    else {              //vertical event
      if (starty < endy) { //down
        KeyDown()
      }
      else {               //up
        KeySpace()
      }
    }
  }
}

//input firing functions
var board_width_left = side_bar_x
var board_width_right = side_bar_x + (tile_size * Rows)

function KeyReturn(){
  Send_Down()
}
function KeyDown_OLD(){
  if (CheckDownSpaceFor(DownMovement) == true) {
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      Tile_Bit[bit].y = Tile_Bit[bit].y + DownMovement
    }
  }
}

function KeyDown(){
  //simplified
  var space = true
  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    if (Tile_Bit[bit].alive == true) {
      if (Tile_Bit[bit].y + tile_size + tile_size > board_height) {  //check for board
        space = false
        //console.log("board")
      }

      if (space == true) {                                  //check for pieces
        x = (Tile_Bit[bit].x - side_bar_x) / tile_size
        y1 = Math.ceil( (Tile_Bit[bit].y + tile_size) / tile_size)   //protects top edge
        y2 = Math.round( (Tile_Bit[bit].y + tile_size) / tile_size)  //potects to middle

        if (tile[y1][x] != 0) {
          space = false
          //console.log("piece:", y1, x)
        }
        if (tile[y2][x] != 0) {
          space = false
          //console.log("piece:",  y2, x)
        }
      }
    }
  }
  if (space == true) {
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      Tile_Bit[bit].y = Tile_Bit[bit].y + tile_size
    }
  }

}
function KeyLeft(){
  var space = true
  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    if (Tile_Bit[bit].alive == true) {
      if (Tile_Bit[bit].x - tile_size < board_width_left) {  //check for board
        space = false
      }

      if (space == true) {                                  //check for pieces
        x = (Tile_Bit[bit].x - side_bar_x) / tile_size
        y1 = Math.ceil((Tile_Bit[bit].y / tile_size))   //protects top edge
        y2 = Math.round(((Tile_Bit[bit].y) / tile_size))  //potects to middle
        if (tile[y1][x-1] != 0) {
          space = false
        }
        if (tile[y2][x-1] != 0) {
          space = false
        }
      }
    }
  }
  if (space == true) {
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      Tile_Bit[bit].x = Tile_Bit[bit].x - tile_size
    }
  }
}
function KeyRight(){
  var space = true
  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    if (Tile_Bit[bit].alive == true) {
      if (Tile_Bit[bit].x > board_width_right) {     //check for board
        space = false
      }

      if (space == true) {                                  //check for pieces
        x = (Tile_Bit[bit].x - side_bar_x) / tile_size
        y1 = Math.ceil((Tile_Bit[bit].y / tile_size))   //protects top edge
        y2 = Math.round(((Tile_Bit[bit].y) / tile_size))  //potects to middle
        if (tile[y1][x+1] != 0) {
        }
        if (tile[y2][x+1] != 0) {
          space = false
        }
      }
    }
  }
  if (space == true) {
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      Tile_Bit[bit].x = Tile_Bit[bit].x + tile_size
    }
  }
}
function KeySpace(){
  if (random_piece != 3) {    //don't rotate block
    reorient()
  }
}

function reorient() {
  if (tile_orientation == 0) {
    Tile_Bit[0].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[0].testy = Tile_Bit[1].y
    Tile_Bit[1].testx = Tile_Bit[1].x //
    Tile_Bit[1].testy = Tile_Bit[1].y //
    Tile_Bit[2].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[2].testy = Tile_Bit[1].y
    Tile_Bit[3].testx = Tile_Bit[1].x + tile_size*(2)
    Tile_Bit[3].testy = Tile_Bit[1].y
    Tile_Bit[4].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[4].testy = Tile_Bit[1].y + tile_size*(1)
    Tile_Bit[5].testx = Tile_Bit[1].x
    Tile_Bit[5].testy = Tile_Bit[1].y + tile_size*(1)
    Tile_Bit[6].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[6].testy = Tile_Bit[1].y + tile_size*(1)
    Tile_Bit[7].testx = Tile_Bit[1].x + tile_size*(2)
    Tile_Bit[7].testy = Tile_Bit[1].y + tile_size*(1)
    if (check_rotate() == true) {
      implement_rotate()
    }
  }
  else if (tile_orientation == 1) {
    Tile_Bit[0].testx = Tile_Bit[1].x
    Tile_Bit[0].testy = Tile_Bit[1].y + tile_size*(1)
    Tile_Bit[4].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[4].testy = Tile_Bit[1].y + tile_size*(1)
    Tile_Bit[1].testx = Tile_Bit[1].x //
    Tile_Bit[1].testy = Tile_Bit[1].y //
    Tile_Bit[5].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[5].testy = Tile_Bit[1].y
    Tile_Bit[2].testx = Tile_Bit[1].x
    Tile_Bit[2].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[6].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[6].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[3].testx = Tile_Bit[1].x
    Tile_Bit[3].testy = Tile_Bit[1].y - tile_size*(2)
    Tile_Bit[7].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[7].testy = Tile_Bit[1].y - tile_size*(2)
    if (check_rotate() == true) {
      implement_rotate()
    }
  }
  else if (tile_orientation == 2) {
    Tile_Bit[4].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[4].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[5].testx = Tile_Bit[1].x
    Tile_Bit[5].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[6].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[6].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[7].testx = Tile_Bit[1].x - tile_size*(2)
    Tile_Bit[7].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[0].testx = Tile_Bit[1].x + tile_size*(1)
    Tile_Bit[0].testy = Tile_Bit[1].y
    Tile_Bit[1].testx = Tile_Bit[1].x //
    Tile_Bit[1].testy = Tile_Bit[1].y //
    Tile_Bit[2].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[2].testy = Tile_Bit[1].y
    Tile_Bit[3].testx = Tile_Bit[1].x - tile_size*(2)
    Tile_Bit[3].testy = Tile_Bit[1].y
    if (check_rotate() == true) {
      implement_rotate()
    }
  }
  else if (tile_orientation == 3) {
    Tile_Bit[4].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[4].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[0].testx = Tile_Bit[1].x
    Tile_Bit[0].testy = Tile_Bit[1].y - tile_size*(1)
    Tile_Bit[5].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[5].testy = Tile_Bit[1].y
    Tile_Bit[1].testx = Tile_Bit[1].x //
    Tile_Bit[1].testy = Tile_Bit[1].y //
    Tile_Bit[6].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[6].testy = Tile_Bit[1].y + tile_size*(1)
    Tile_Bit[2].testx = Tile_Bit[1].x
    Tile_Bit[2].testy = Tile_Bit[1].y + tile_size*(1)
    Tile_Bit[7].testx = Tile_Bit[1].x - tile_size*(1)
    Tile_Bit[7].testy = Tile_Bit[1].y + tile_size*(2)
    Tile_Bit[3].testx = Tile_Bit[1].x
    Tile_Bit[3].testy = Tile_Bit[1].y + tile_size*(2)
    if (check_rotate() == true) {
      implement_rotate()
    }
  }
}

function check_rotate() {
  BorderSpace = true
  TileSpace = true

  //check borders
  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    if (Tile_Bit[bit].alive == true) {
      if (Tile_Bit[bit].testx < board_width_left) {                 //left
        BorderSpace = false
        //console.log("can't rotate left")
      }
      if ((Tile_Bit[bit].testx + tile_size) > board_width_right) {   //right
        BorderSpace = false
        //console.log("can't rotate right")
      }
      if (Tile_Bit[bit].testy < 0) {                                //top
        BorderSpace = false
        //console.log("can't rotate top")
      }
      if ((Tile_Bit[bit].testy + tile_size) > Cols*tile_size) {      //bottom
        BorderSpace = false
        //console.log("can't rotate bottom")
      }
    }
  }

  //check tiles
  if (BorderSpace == true) {
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      if (Tile_Bit[bit].alive == true) {

        x = (Tile_Bit[bit].testx - side_bar_x) / tile_size
        y1 = Math.floor((Tile_Bit[bit].testy / tile_size))
        y2 = Math.ceil((Tile_Bit[bit].testy / tile_size))
        if (tile[y1][x] != 0) {
          TileSpace = false
          //console.log("can't rotate onto another tile")
        }
        if (tile[y2][x] != 0) {
          TileSpace = false
          //console.log("can't rotate onto another tile")
        }
      }
    }
  }

  if ((BorderSpace == true) && (TileSpace == true)) {
    return true
  }
}

function implement_rotate() {
  tile_orientation = tile_orientation + 1
  if (tile_orientation == 4) {
    tile_orientation = 0
  }

  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    Tile_Bit[bit].x = Tile_Bit[bit].testx
    Tile_Bit[bit].y = Tile_Bit[bit].testy
  }
}

function CheckDownSpaceFor(DiffSize) {  ///BUGGY
  //breakdown DiffSize into chunks less than tile_size so there's no cheating
  if (DiffSize > tile_size) {
    NumChucks = Math.ceil(DiffSize / tile_size)
    ChuckSize = DiffSize / NumChucks
  }
  else {
    NumChucks = 1
    ChuckSize = DiffSize
  }

  //check space for each chunk
  for (i = 0 ; i <= NumChucks; i++) {
  DownSpace = true

    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      if (Tile_Bit[bit].alive == true) {                      //check alive

        //console.log(DiffSize, ChuckSize, bit, Tile_Bit[bit].y)
        if ((Tile_Bit[bit].y + (tile_size)) + ChuckSize > board_height) {    //check for bottom
          DownSpace = false
          console.log("down: bottom")
        }

        if (DownSpace == true) {
          x = (Tile_Bit[bit].x - side_bar_x) / tile_size
          //y = Math.ceil(((Tile_Bit[bit].y + ChuckSize) / tile_size))
          y1 = Math.ceil((Tile_Bit[bit].y  + ChuckSize) / tile_size)   //protects top edge
          y2 = Math.floor((Tile_Bit[bit].y  + ChuckSize) / tile_size)  //bottom

          if (y1 >= Cols) {
            DownSpace = false
            //console.log("down: exceeded Cols")
          }
          if (y2 >= Cols) {
            DownSpace = false
            //console.log("down: exceeded Cols")
          }

          if (DownSpace == true){
            if (tile[y1][x] != 0){                               //check for pieces
              DownSpace = false
              //console.log("down: collision")
            }
            if (tile[y2][x] != 0){
              DownSpace = false
              //console.log("down: collision")
            }
          }
        }
      }
    }

    //if space available, there are multiple chucks, and this isn't the last chuck, move down
    if ((NumChucks > 1) && (i < NumChucks) && (DownSpace == true)) {
      console.log("taking intermediary chuck move")
      for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
        Tile_Bit[bit].y = Tile_Bit[bit].y + ChuckSize
      }
    }

    //if last chunk and no downspace; clean up with send down
    if ((i == NumChucks) && (DownSpace == false)) {
      console.log("sending to Send_Down")
      Send_Down()
    }
  }

  //just a de-bugging check; to weed out normal gravity downs
  if (NumChucks > 1) {
    var LowestBitValue = 0
    var LowestBitID
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      if (Tile_Bit[bit].alive == true) {
        console.log(bit, Tile_Bit[bit].y)
        if (Tile_Bit[bit].y > LowestBitValue) {
          LowestBitValue = Tile_Bit[bit].y
          LowestBitID = bit
        }
      }
    }
  }

  return DownSpace          //problem: gravity relies on send_down to complete
}

function Send_Down() {
  //find lowest bit   (ie largest y)
  var LowestBitValue = 0
  var LowestBitID
  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    if (Tile_Bit[bit].alive == true) {
      //console.log(bit, Tile_Bit[bit].y)
      if (Tile_Bit[bit].y > LowestBitValue) {
        LowestBitValue = Tile_Bit[bit].y
        LowestBitID = bit
      }
    }
  }

  //iterate until (board_height - LowestBitValue > tile_size)
  KeepCutting = true
  if (board_height - (Tile_Bit[LowestBitID].y+tile_size) <= tile_size) {
    KeepCutting = false
  }
  DownSpace == true
  while ((KeepCutting == true) && (DownSpace == true)) {
    //console.log("current lowest y: ", Tile_Bit[LowestBitID].y)

    //check if tile_size down is occupied by a piece
    DownSpace = true
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      if (Tile_Bit[bit].alive == true) {
        x = (Tile_Bit[bit].x - side_bar_x) / tile_size
        y = Math.floor((Tile_Bit[bit].y + (tile_size*2)) / tile_size)
        if (tile[y][x] != 0) {
          DownSpace = false
        }
      }
    }

    //if available, move down
    if (DownSpace == true) {
      for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
        Tile_Bit[bit].y = Tile_Bit[bit].y + tile_size
      }
    }
    //console.log("new lowest y: ", Tile_Bit[LowestBitID].y)

    //check if down; repeat
    if (board_height - (Tile_Bit[LowestBitID].y+tile_size) <= tile_size) {
      KeepCutting = false
    }
  }

  Record_Placement()
}

function CrashCheck() {
  Crash = false
  for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
    if (Tile_Bit[bit].alive == true) {
      x = (Tile_Bit[bit].x - side_bar_x) / tile_size
      y = Math.ceil(((Tile_Bit[bit].y) / tile_size))
      if (y != Cols) {
        if (tile[y][x] != 0) {
          Crash = true
        }
      }
    }
  }
  return Crash
}

function CheckLines() {
  for (col = Cols-1; col >=0 ; col--) {
    completed = true
    for (row = 0; row < Rows; row++) {
      //console.log(col, row, tile[col][row])
      if (tile[col][row] == 0) {
        completed = false
      }
    }
    if (completed == true) {
      completed_row = col   //just realizing inconsistent use of col v. row!
      break
    }
  }

  if (completed == true) {
    //spice
    for (col = completed_row; col >=1 ; col--) {
      for (row = 0; row < Rows; row++){
        tile[col][row] = tile[col-1][row]
      }
    }

    //update statistics
    NewLineCompleted()
  }
}

//Section ___: Game Loop
GameTimer = setInterval(startTime, 1000);
InitTiles ()
NewPiece ()

function newgame_button(){
  tile = []
  for (col = 0; col <= Cols; col++){
    tile.push([])
    for (row = 0; row < Rows; row++){
      tile[col].push([0])
    }
  }
  stats_level = 1
  stats_lines = 0
  side_timer = 0
  gravity = 30
  InitTiles()
  NewPiece()
  Pause = false
  clearInterval(GameTimer)
  GameTimer = setInterval(startTime, 1000);
  window.requestAnimationFrame(MainLoop)
}

var Pause = false
function pause_button() {
  if (Pause == false) {
    Pause = true
    clearInterval(GameTimer)
    window.cancelAnimationFrame(MainLoop)
  }
  else {
    Pause = false
    GameTimer = setInterval(startTime, 1000);
    window.requestAnimationFrame(MainLoop)
  }
}

const PauseButt = document.getElementById("pause_button");
PauseButt.addEventListener("click", function (event) {
  if (PauseButt.textContent === 'Pause Game') {
    PauseButt.textContent = "Resume"
  }
  else {
    PauseButt.textContent = "Pause Game"
  }
})

var p = 0
function UpdateGravity(progress) {     //Gravity Down Speed
  //console.log(progress)
  if (progress>200){progress=16} //fixing pause, so that long times result in zero
  p = progress * (1 / gravity)

  //apply normal p down if space
  if (CheckDownSpaceFor(p) == true) {
    for (bit = 0; bit < Object.keys(Tile_Bit).length; bit++) {
      Tile_Bit[bit].y += p
    }
  }
}

function Record_Placement() {
  for (bit=0; bit<8; bit++){
    if (Tile_Bit[bit].alive == true) {
      x = (Tile_Bit[bit].x - side_bar_x) / tile_size
      y = Math.ceil((Tile_Bit[bit].y / tile_size))
      tile[y][x] = Tile_Bit[bit].color
    }
  }

  //check for line completion (possible 4x)
  CheckLines()
  CheckLines()
  CheckLines()
  CheckLines()

  //create new piece
  InitTiles()
  NewPiece()
}

function draw() {
  ctx.clearRect(side_bar_x, 0, board_width, board_height)
  draw_borders()
  draw_existing_pieces()
  draw_pieces()
  draw_side_bar()
}

function MainLoop(timestamp) {
  draw()
  progress = timestamp - lastRender

  if (Pause == false) {
    if (CrashCheck() == false) {
      UpdateGravity(progress)
      lastRender = timestamp
      window.requestAnimationFrame(MainLoop)
    }
    else {
      clearInterval(GameTimer)
      document.getElementById("display_endgame").innerHTML = "<i>Game Over</i>"
      pause_button()
      DisplayHSPage()
    }
  }
}
var lastRender = 0
var progress = 0
window.requestAnimationFrame(MainLoop)


//Section ___: High Scores
var modal1 = document.getElementById("myModal1");
function DisplayHSPage() {
  modal1.style.display = "block";
  Parse_JSON_Scores()
}

function CloseHSPage() {
  HSButt.disabled = false
  document.getElementById("highscores").innerHTML = ""
  modal1.style.display = "none"
  initBoardSize()
  resizeCanvas()
  Get_JSON_Scores_On_Load()
  newgame_button()
}

//Get High Scores from JSON
var JSON_scores
var Do_Not_Fetch = false
Get_JSON_Scores_On_Load()
function Get_JSON_Scores_On_Load() {
    if (Do_Not_Fetch == false) {
    const Errors = document.getElementById('error');
    let file = "assets/js/hs.json";
    fetch(file, {cache: 'no-cache'})
      .then(function(response) {
          //  If the response isn't OK
          if (response.status !== 200) {
            Errors.innerHTML = response.status;
          }
          // If the response is OK
          response.json().then(function(data) {
            let scores = JSON.stringify(data);
            JSON_scores = JSON.stringify(data)
            //console.log(scores);
            //callback (scores);
          });
        })
      // If there is an error
      .catch(function(err) {
        //Errors.innerHTML = err;
        //console.log("error")
        Do_Not_Fetch = true
      });
  }
}

//Post High School Data to Pop Up Window
function Parse_JSON_Scores (){
  document.getElementById("myform").style.visibility = 'hidden'; //hide form for local testing

  if (Do_Not_Fetch == false) {
    document.getElementById("myform").style.visibility = 'visible';

    const List = document.getElementById("highscores");
    let object = JSON.parse(JSON_scores);

    // loop through high scores
    var currentscores = []
    for (let i=0; i<object.length; i++) {
      //console.log(object[i]);
      if (object[i] != null) {
        currentscores.push(object[i].score) //tracking

        let li = document.createElement("LI");
        let text = document.createTextNode(object[i].name + ": " + object[i].score);
        li.appendChild(text);
        List.appendChild(li);
        if (i===0) {
          li.setAttribute('class',"top1");
        }
        if (i===1) {
          li.setAttribute('class',"top2");
        }
        if (i===2) {
          li.setAttribute('class',"top3");
        }
      }
    }

    //Hide form if no high score                   //TODO: could build form programatically so no blank space
    maxscore = Math.max(...currentscores)
    if (stats_lines > maxscore) {
      document.getElementById("myform").style.visibility = 'visible';
    }
    else {
      document.getElementById("myform").style.visibility = 'hidden';
    }
  }
}

//Write High Score to JSON
const Myform = document.getElementById("myform");
Myform.addEventListener("submit", function (event) {
  // don't reload page
  event.preventDefault();

  //Form Data Object
  var formData = new FormData(this);
  //console.log(formData)

  // fetch request
  fetch ("assets/js/hs.php", {
    method: "post",
    body: formData
  })
  .then (function (response){
    //console.log(response)
    return response.text();
  })
  .then(function(text) {
    //resetForm();
    //console.log("ok")
  })
  .catch(function (err) {
    //console.log("error")
  })
});

const HSButt = document.getElementById("HS_submit_button")
function HSButt_disabled(){
  HSButt.disabled = true;
}
