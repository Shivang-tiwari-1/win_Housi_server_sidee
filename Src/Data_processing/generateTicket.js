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
    return fisherYatesShuffle(col).slice(0, 2);
  });
}

exports.return_Grid = async () => {
  try {
    const grid = Array.from({ length: 3 }, () => Array(9).fill(null));
    const columns = generateColumnNumbers();

    for (let col = 0; col < 9; col++) {
      const nums = columns[col];
      const rowsToPlace = fisherYatesShuffle([0, 1, 2]).slice(0, nums.length);
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
      }
    }

    return {
      success: true,
      grid: grid,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};
