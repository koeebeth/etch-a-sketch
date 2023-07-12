const penColor = document.querySelector('input.color');
const gridSize = document.querySelector('input.grid-size');
const grid = document.querySelector('.grid-container')
let columns;

//paint one column
function paint(column){
    column.target.style.backgroundColor = `${penColor.value}`;
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


//grid function and make initial grid
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

//change grid size on slider
gridSize.addEventListener('input', function(e){ 
    makeGrid(e.currentTarget.value);
    document.querySelector('span.grid-size').textContent = e.currentTarget.value;
});


makeGrid(gridSize.value);
