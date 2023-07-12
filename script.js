function makeGrid(size) {
    const gridCont = document.querySelector('div.grid');

    for(let i = 0; i < size; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < size; j++){
            let column = document.createElement('div');
            column.classList.add('column');
            row.appendChild(column);
        }
        gridCont.appendChild(row)
    }
}

makeGrid(8);