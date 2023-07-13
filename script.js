const gridSize = document.querySelector('input.grid-size');
const grid = document.querySelector('.grid-container')
const eraserBtn = document.querySelector('input.eraser');
const penColorBtn = document.getElementById('color-button');
const penColorSelect = document.querySelector('input.color');
const rainbowBtn = document.querySelector('input.rainbow');
const gridBtn = document.getElementById('grid-toggle');
let columns;
let penColor;
let colorSelect = penColorSelect.value;


//pick random color
function randomColor(){
    h = Math.floor(Math.random() * 360);
    color = `hsl(${h}, 100%, 50%)`;
    return color;
}

//get color selected by user
function getColor(){
    colorSelect = penColorSelect.value;
}

//switch brushes
function switchBrush(brush){
    penColor = brush;
}

//toggle grid on-off
function toggleGrid(){
    columns.forEach((column) => column.classList.toggle('grid-off'));
}

//paint one column
function paint(e){
    if (penColor == 'color') e.currentTarget.style.backgroundColor = `${colorSelect}`
    else if (penColor == 'rainbow')  e.currentTarget.style.backgroundColor = `${randomColor()}`
    else if (penColor == 'eraser')  e.currentTarget.style.backgroundColor = 'white';
    //column.currentTarget.style.backgroundColor = `${penColor}`;
};

//switch between painting and non-painting
function isPainting(bool) {
    if(bool){
        columns.forEach((column) => column.addEventListener('mouseover', paint));
    }
    else{
        columns.forEach((column) => column.removeEventListener('mouseover', paint));
    }  
};


//grid function
function makeGrid(size) {
    //create grid divider and remove previous one
    const grid = document.createElement('div');
    grid.classList.add('grid');
    const gridCont = document.querySelector('div.grid-container');
    if (gridCont.firstChild) {gridCont.removeChild(gridCont.firstChild)};

    //divide grid into rows and colors
    for(let i = 0; i < size; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < size; j++){
            let column = document.createElement('div');
            column.classList.add('column');
            //change pen color
            //column.onmouseover = function() {column.style.backgroundColor = `${penColor.value}`};
            row.appendChild(column);
        }
        grid.appendChild(row)
    }
    gridCont.appendChild(grid);
    columns = document.querySelectorAll('div.column');
    //click and drag drawing
    grid.onmousedown = function() {isPainting(true)};
    grid.onmouseup = function() {isPainting(false)}
};

//  EVENT LISTENERS
// grid size
gridSize.addEventListener('input', function(e){ 
    makeGrid(e.currentTarget.value);
    document.querySelector('span.grid-size').textContent = e.currentTarget.value;
});
// eraser tool
eraserBtn.addEventListener('click', function(e) {
    if(this.checked) switchBrush('eraser');
});
// rainbow brush
rainbowBtn.addEventListener('click', function(e) {
    if(this.checked) switchBrush('rainbow');
});
// color brush
penColorBtn.addEventListener('click', function(e) {
    if (this.checked) switchBrush('color');
})
// brush color change
penColorSelect.addEventListener('change', function() {
        getColor();
});
// grid toggle
gridBtn.addEventListener('change', () => toggleGrid());


//initial grid
makeGrid(gridSize.value);
switchBrush('color');


// first switch brush function
/* function switchBrush(brush){
    if (brush == 'rainbow'){
        penColor = randomColor();
    }
    else if (brush == 'eraser'){
        penColor = 'white';
    }
    else if (brush == 'color'){
        getColor();
    }
}; */
