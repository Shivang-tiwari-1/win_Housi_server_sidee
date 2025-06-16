const { numberRanges } = require("../Constants");

//1.form a grid
//2.get the columns-generateColumnNumbers()-numberRanges-predefined-array-rule
//3.loop through columns  and ge tht col
//4.generate random row indices
//5.using  the loop col and random row push the columns in the array

function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateColumnNumbers() {
  return numberRanges.map(([min, max]) => {
    let col = [];
    for (let i = min; i <= max; i++) {
      col.push(i);
    }
    return fisherYatesShuffle(col).slice(0, 3);
  });
}

exports.return_Grid = async (number_of_times) => {
  try {
    let array = [];
    for (let i = 0; i <= number_of_times - 1; i++) {
      const grid = Array.from({ length: 3 }, () => Array(9).fill(null));
      const columns = generateColumnNumbers();

      for (let col = 0; col < 9; col++) {
        const nums = columns[col];
        const rowsToPlace = fisherYatesShuffle([0, 1, 2]);
        rowsToPlace.forEach((row, idx) => {
          grid[row][col] = nums[idx];
        });
      }

      for (let row = 0; row < 3; row++) {
        const filled = grid[row].filter((n) => n !== null).length;
        if (filled > 5) {
          let indices = grid[row]
            .map((val, idx) => (val !== null ? idx : null))
            .filter((i) => i !== null);

          fisherYatesShuffle(indices)
            .slice(0, filled - 5)
            .forEach((i) => (grid[row][i] = null));
        } else {
          for (let col = 0; col < 9; col++) {
            if (grid[row][col] === null && columns[col].length > 0) {
              emptyCols.push(col);
            }
          }

          fisherYatesShuffle(emptyCols)
            .slice(0, need)
            .forEach((col) => {
              const backupNum = columns[col].pop();
              grid[row][col] = backupNum;
            });
        }
      }

      for (let i = 0; i < grid[0].length; i++) {
        let columeValue = [];
        for (let j = 0; j < grid.length; j++) {
          if (grid[j][i] !== null) {
            columeValue.push(grid[j][i]);
          }
        }

        columeValue.sort((a, b) => a - b);
        let idx = 0;
        for (let j = 0; j < grid.length; j++) {
          if (grid[j][i] != null) {
            grid[j][i] = columeValue[idx++];
          }
        }
      }
      array.push(grid);
    }

    return {
      success: true,
      grid: array,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};
