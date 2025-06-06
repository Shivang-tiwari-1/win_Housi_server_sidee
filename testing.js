// // // const rows = 3;
// // // const cols = 9;
// const matrixx = [
//   [null, null, null, 30, null, 55, 61, null, 81],
//   [5, 19, 22, null, null, null, 64, 73, null],
//   [4, 17, 26, null, null, 58, null, null, 83],
// ];
// console.log(
//   matrixx.every((data) => typeof data === "number") ?matrixx  : ["mooo"]
// );
// let plot = [1, 2, 3, 4];
// console.log(
//   "99999",
//   matrixx.flatMap((data) =>
//     data.filter((value) => value === 1 || value === 3 || value === 4)
//   )
// );
// // for (let i = 0; i <= matrix.length - 1; i++) {
// //   for (let j = 0; j <= matrix[i].length - 1; j++) {
// //     if (
// //       matrix[i + 1]?.[j - 1] === undefined ||
// //       matrix[i + 1]?.[j] === undefined ||
// //       matrix[i + 1]?.[j + 1] === undefined
// //     ) {
// //       console.log(`can not plot as one of the grid is undefined ${i},${j}`);
// //     } else {
// //       matrix[i][j] = plot[j];
// //       matrix[i + 1][j - 1] = plot[j + 1];
// //       matrix[i + 1][j] = plot[j + 2];
// //       matrix[i + 1][j + 1] = plot[j + 3];
// //     }
// //   }
// // }
// // let data = [];

// // for (let i = 0; i <= matrix.length - 1; i++) {
// //   for (let j = 0; j <= matrix[i].length - 1; j++) {
// //     if (
// //       matrix[i][j] === undefined ||
// //       matrix[i + 1]?.[j - 1] === undefined ||
// //       matrix[i + 1]?.[j] === undefined ||
// //       matrix[i + 1]?.[j + 1] === undefined
// //     ) {
// //       console.log(`can not plot as one of the grid is undefined ${i},${j}`);
// //     } else {
// //       data.push([
// //         matrix[i][j],
// //         matrix[i + 1]?.[j - 1],
// //         matrix[i + 1]?.[j],
// //         matrix[i + 1]?.[j + 1],
// //       ]);
// //     }
// //   }
// // }

// // console.log(data);
// // for (let i = 0; i <= matrix.length - 1; i++) {
// //   for (let j = 0; j <= matrix[i].length - 1; j++) {
// //     let last_pointer = matrix[i][matrix[i].length - 1];
// //     let Middle_pointer = matrix[i][Math.floor((matrix[i].length - 1) / 2)];
// //     let first_pointer = matrix[i][0];

// //     console.log(first_pointer, Middle_pointer, last_pointer);
// //   }
// // }
// // let rowMaxes = matrix.flatMap((row, index, array) => {
// //   return row.filter((data) => data !== null);
// // });
// // // console.log(rowMaxes.sort());
// // let data = [];
// // let push = true;
// // for (let i = 0; i <= rowMaxes.length - 1; i++) {
// //   for (let j = 0; j <= rowMaxes.length - 1; j++) {
// //     if (rowMaxes[i] > rowMaxes[j]) {
// //       if (data.length === 0) {
// //         data.push(rowMaxes[j]);
// //       }else{
// //         if(rowMaxes[i])
// //       }
// //     }
// //   }
// // }
// // console.log("Row maxes:", data);

// // const array = [7, 55, 2, 5];
// // let truth_collector = [];
// // const row = matrix[0].length - 1;
// // const col = matrix.length - 1;
// // {
// //   // for (let i = 0; i < array.length; i++) {
// //   //   let found = false;
// //   //   for (let j = 0; j < matrix.length; j++) {
// //   //     for (let k = 0; k < matrix[j].length; k++) {
// //   //       if (matrix[j][k] === array[i]) {
// //   //         truth_collector.push({
// //   //           element: i,
// //   //           found: true,
// //   //           index: [j, k],
// //   //         });
// //   //         found = true;
// //   //         break;
// //   //       }
// //   //     }
// //   //     if (found) break;
// //   //   }
// //   //   if (!found) {
// //   //     truth_collector.push({
// //   //       element: i,
// //   //       found: false,
// //   //       index: null,
// //   //     });
// //   //   }
// //   // }
// // }

// // for (let i = 0; i <= array.length - 1; i++) {
// //   for (let j = 0; j <= matrix.length - 1; j++) {
// //     for (let k = 0; k <= matrix[j].length - 1; k++) {
// //       if (array[i] === matrix[j][k]) {
// //         if (k - 1 >= 0 && matrix[j + 1] && matrix[j + 1][k - 1] !== undefined) {
// //           console.log(matrix[j + 1][k - 1]);
// //         } else {
// //           console.log(`Invalid jump from [${j}][${k}] → [${j + 1}][${k - 1}]`);
// //         }
// //       }
// //     }
// //   }
// // }
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
let ultimate_array = [];
for (let i = 0; i <= 2-1; i++) {
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

  ultimate_array.push(grid);
}


console.log(ultimate_array)