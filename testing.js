// // const rows = 3;
// // const cols = 9;
// const matrix = [
//   [7, 1, 2, 8, 5, 6, 4, 6, 10],
//   [8, 3, 10, 9, 10, 2, 1, 8, 9],
//   [8, 4, 10, 2, 4, 7, 7, 6, 4],
// ];

// const array = [7, 55, 2, 5];
// let truth_collector = [];
// const row = matrix[0].length - 1;
// const col = matrix.length - 1;
// {
//   // for (let i = 0; i < array.length; i++) {
//   //   let found = false;
//   //   for (let j = 0; j < matrix.length; j++) {
//   //     for (let k = 0; k < matrix[j].length; k++) {
//   //       if (matrix[j][k] === array[i]) {
//   //         truth_collector.push({
//   //           element: i,
//   //           found: true,
//   //           index: [j, k],
//   //         });
//   //         found = true;
//   //         break;
//   //       }
//   //     }
//   //     if (found) break;
//   //   }
//   //   if (!found) {
//   //     truth_collector.push({
//   //       element: i,
//   //       found: false,
//   //       index: null,
//   //     });
//   //   }
//   // }
// }

// for (let i = 0; i <= array.length - 1; i++) {
//   for (let j = 0; j <= matrix.length - 1; j++) {
//     for (let k = 0; k <= matrix[j].length - 1; k++) {
//       if (array[i] === matrix[j][k]) {
//         if (k - 1 >= 0 && matrix[j + 1] && matrix[j + 1][k - 1] !== undefined) {
//           console.log(matrix[j + 1][k - 1]);
//         } else {
//           console.log(`Invalid jump from [${j}][${k}] → [${j + 1}][${k - 1}]`);
//         }
//       }
//     }
//   }
// }
const numberRanges = [
  [1, 9],
  [10, 19],
  [20, 29],
  [30, 39],
  [40, 49],
  [50, 59],
  [60, 69],
  [70, 79],
  [80, 90],
];

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

    for (let i = min; i <= max; i++) col.push(i);

    return fisherYatesShuffle(col).slice(0, 2);
  });
}

const grid = Array.from({ length: 3 }, () => Array(9).fill(null));

const columns = generateColumnNumbers();

for (let col = 0; col < 9; col++) {
  const nums = columns[col];
  const rowsToPlace = fisherYatesShuffle([0, 1, 2]).slice(0, 2);
  rowsToPlace.forEach((row, idx) => {
    grid[row][col] = nums[idx];
  });
}
  for (let row = 0; row < 3; row++) {
    const filled = grid[row].filter(n => n !== null).length;
    console.log("outer",grid[row],filled)

    if (filled > 5) {
      let indices = grid[row].map((val, idx) => val !== null ? idx : null).filter(i => i !== null);

      console.log(indices)
      fisherYatesShuffle(indices).slice(0, filled - 5).forEach(i => grid[row][i] = null);
    } 
  }

