let grid = Array(16).fill(0);
let score = 0;

function updateGrid() {
    for (let i = 0; i < 16; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = grid[i] === 0 ? '' : grid[i];
        if(grid[i] === 0){
            cell.removeAttribute('data-value');
        } else {
            cell.setAttribute('data-value', grid[i]);
        }
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

function addRandom() {
    let empty = grid.map((v,i) => v === 0 ? i : -1).filter(i => i !== -1);
    if (empty.length === 0) return;
    let idx = empty[Math.floor(Math.random()*empty.length)];
    grid[idx] = Math.random() < 0.9 ? 2 : 4;
}

function slide(row) {
    let arr = row.filter(v => v !== 0);
    for(let i=0;i<arr.length-1;i++){
        if(arr[i] === arr[i+1]){
            arr[i] *= 2;
            score += arr[i];
            arr[i+1] = 0;
        }
    }
    arr = arr.filter(v => v!==0);
    while(arr.length<4) arr.push(0);
    return arr;
}

function move(dir) {
    let old = [...grid];
    if(dir==='ArrowLeft'){
        for(let i=0;i<16;i+=4){
            let row = slide(grid.slice(i,i+4));
            for(let j=0;j<4;j++) grid[i+j]=row[j];
        }
    }
    if(dir==='ArrowRight'){
        for(let i=0;i<16;i+=4){
            let row = slide(grid.slice(i,i+4).reverse()).reverse();
            for(let j=0;j<4;j++) grid[i+j]=row[j];
        }
    }
    if(dir==='ArrowUp'){
        for(let i=0;i<4;i++){
            let col = slide([grid[i],grid[i+4],grid[i+8],grid[i+12]]);
            for(let j=0;j<4;j++) grid[i+4*j]=col[j];
        }
    }
    if(dir==='ArrowDown'){
        for(let i=0;i<4;i++){
            let col = slide([grid[i],grid[i+4],grid[i+8],grid[i+12]].reverse()).reverse();
            for(let j=0;j<4;j++) grid[i+4*j]=col[j];
        }
    }
    if(grid.toString()!==old.toString()) addRandom();
    updateGrid();
}

document.addEventListener('keydown', e=>{
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){
        e.preventDefault();
        move(e.key);
    }
});

document.getElementById('restart').addEventListener('click', ()=>{
    grid = Array(16).fill(0);
    score = 0;
    addRandom();
    addRandom();
    updateGrid();
});

// initialize
addRandom();
addRandom();
updateGrid();
