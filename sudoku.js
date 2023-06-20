function generateSudoku() {
    const grid = [];
    for (let row = 0; row < 9; row++) {
      grid[row] = [];
      for (let col = 0; col < 9; col++) {
        grid[row][col] = 0;
      }
    }
    solveSudoku(grid);
    removeCells(grid);
    return grid;
  }
  
  function solveSudoku(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      return true;
    }
  
    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
  
        if (solveSudoku(grid)) {
          return true;
        }
  
        grid[row][col] = 0;
      }
    }
  
    return false;
  }
  
  function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }
  
  function isValid(grid, row, col, num) {
    // Check if the number is already in the same row
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) {
        return false;
      }
    }
  
    // Check if the number is already in the same column
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) {
        return false;
      }
    }
  
    // Check if the number is already in the same 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j] === num) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function removeCells(grid) {
    // Determine the number of cells to remove based on the desired difficulty level
    const difficultyLevel = 40; // Adjust this number to control the difficulty
    let cellsToRemove = 81 - difficultyLevel;
  
    // Randomly remove cells while ensuring the puzzle remains solvable
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (grid[row][col] !== 0) {
        const backup = grid[row][col];
        grid[row][col] = 0;
  
        // Check if the puzzle still has a unique solution
        const count = [0];
        solveSudoku(grid, count);
        if (count[0] !== 1) {
          grid[row][col] = backup;
        } else {
          cellsToRemove--;
        }
      }
    }
  }
  
  // Generate and print a Sudoku puzzle
  const sudoku = generateSudoku();
  for (let row = 0; row < 9; row++) {
    console.log(sudoku[row].join(" "));
  }  