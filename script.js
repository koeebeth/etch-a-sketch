const gridSize = document.querySelector('input.grid-size');
const grid = document.querySelector('.grid-container')
const eraserBtn = document.querySelector('input.eraser');
const penColorBtn = document.getElementById('color-button');
const rainbowBtn = document.querySelector('input.rainbow');
const darkenBtn = document.getElementById('darken-button');
const gridBtn = document.getElementById('grid-toggle');
const clearBtn = document.getElementById('clear-button');
const penColorSelect = document.querySelector('input.color');
const backgroundColorSelect = document.getElementById('background-color');

let backgroundColor = backgroundColorSelect.value;
let colorSelect = penColorSelect.value;
let columns;
let brushType;


function getRGB(rgb) {
    return rgb.substr(4).split(')')[0].split(',');
}
//pick random color
function randomColor(){
    h = Math.floor(Math.random() * 360);
    color = `hsl(${h}, 100%, 50%)`;
    return color;
}

//get color selected by user
function getColor(inpt){
    return inpt.value;
}

//switch brushes
function switchBrush(brush){
    brushType = brush;
}

//toggle grid on-off
function toggleGrid(){
    columns.forEach((column) => column.classList.toggle('grid-off'));
}

//paint one column
function paint(e){
    if (brushType == 'color') e.currentTarget.style.backgroundColor = `${colorSelect}`
    else if (brushType == 'rainbow')  e.currentTarget.style.backgroundColor = `${randomColor()}`
    else if (brushType == 'eraser')  e.currentTarget.style.backgroundColor = `${backgroundColor}`;
    else if (brushType == 'darken') {
        curcolor = e.currentTarget.style.backgroundColor;
        rgb = getRGB(curcolor);
        r = Math.floor(parseInt(rgb[0]) * 9 / 10);
        g = Math.floor(parseInt(rgb[1]) * 9 / 10);
        b = Math.floor(parseInt(rgb[2]) * 9 / 10);
        e.currentTarget.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
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
            column.style.backgroundColor = `${backgroundColor}`;
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

///// EVENT LISTENERS /////

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
// darken brush
darkenBtn.addEventListener('click', () => switchBrush('darken'));
// brush color change
penColorSelect.addEventListener('change', () => colorSelect = getColor(penColorSelect));
// grid toggle
gridBtn.addEventListener('change', () => toggleGrid());

// change background color
backgroundColorSelect.addEventListener('input', function() {
    backgroundColor = getColor(backgroundColorSelect);
    columns.forEach((column) => column.style.backgroundColor = `${backgroundColor}`);
});

clearBtn.addEventListener('click', () => makeGrid(gridSize.value));


// create grid on load
window.onload = () => {
makeGrid(gridSize.value);
switchBrush('color');
}

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
