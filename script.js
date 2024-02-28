const model = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

const gridContainer=document.getElementById('connect4-grid')

function createCell(row, col){
    const cell=document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add(`player-${model[row][col]}`);
    cell.setAttribute('data-row', row);
    cell.setAttribute('data-col', col);
    cell.addEventListener('click',()=> handleMove(col));
    return cell;
}

function renderGrid(){
    gridContainer.innerHTML='';
    for(let row=0; row<model.length; row++){
        for(let col=0; col<model[row].length; col++){
            const cell=createCell(row, col);
            gridContainer.appendChild(cell);
        }
    }
}

function handleMove(col){
    let row;
    for(let row=model.length-1; row>=0; row--){
        if (model[row][col]===0){
            model[row][col]=1;
        
        if(checkForWin(row, col)){
            alert(`Player ${model[row][col]} wins!`)
        } else {
            computerMove();
        }
        renderGrid();
        break;
    }
}



}

function computerMove(){
    let availableCols=[];
    for (let col=0; col < model[0].length; col++){
        if (model[0][col]===0){
            availableCols.push(col);
        }
    }   
if (availableCols.length > 0){
    const randomCol=availableCols[Math.floor(Math.random()*availableCols.length)];
    
    for(let row=model.length-1; row >=0; row--){
        if (model[row][randomCol]===0){
            model[row][randomCol]=2;
            if(checkForWin(row,randomCol)){
                alert(`Player ${model[row][randomCol]} Wins!`)
            }
            break;
        }
    }
}
}
    





    function checkForWin(row, col){
        if(
            //checker horizontal
            checkLine(row, col,0,1) + checkLine(row,col,0,-1)>=3||
            //checker vertical
            checkLine(row, col,1,0) >=3||
            //checker diagonalt (fra øverst ventre  til bunden til højre)
            checkLine(row,col,1,1)+checkLine(row,col,-1,-1) >=3||
            //checker diagonalt (øverste højre til bunden til venstre)
            checkLine(row,col,1,-1)+checkLine(row,col,-1,1) >=3
        ) {
            return true;
        }
        return false;
    }
    


    function checkLine(row, col, rowDirection, colDirection){
        const currentPlayer=model[row][col];
        let count=0;
        //checker den specificerede retning
        for(let i=1; i<=3;i++){
            const newRow=row+i*rowDirection;
            const newCol=col+i*colDirection;
        

        if(
            newRow>=0 &&
            newRow < model.length &&
            newCol >=0 &&
            newCol < model[row].length &&
            model[newRow][newCol]===currentPlayer
        ) {
            count++;
        } else {
          break;
        }
    }
    return count;
}

renderGrid();