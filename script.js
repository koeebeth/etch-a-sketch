penColor = document.querySelector('input.color');

//grid function and make initial grid

function makeGrid(size) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    const gridCont = document.querySelector('div.grid-container');
    if (gridCont.firstChild) {gridCont.removeChild(gridCont.firstChild)};

    for(let i = 0; i < size; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < size; j++){
            let column = document.createElement('div');
            column.classList.add('column');
            //change pen color
            column.onmouseover = function() {column.style.backgroundColor = `${penColor.value}`};
            row.appendChild(column);
        }
        grid.appendChild(row)
    }
    gridCont.appendChild(grid);
};

//change grid size on slider
const gridSize = document.querySelector('input.grid-size');
gridSize.addEventListener('input', function(e){ 
    makeGrid(e.currentTarget.value);
    document.querySelector('span.grid-size').textContent = e.currentTarget.value;
});


makeGrid(gridSize.value);
