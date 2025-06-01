//[
// index 0 [1,2,3,4,5,6,7,8,9]
// index 1 [1,2,3,4,5,6,7,8,9]
// index 2 [1,2,3,4,5,6,7,8,9]
// ]

exports.return_first_lane = async (array) => {
  if (Array.isArray(array)) {
    return array[0];
  }
};

exports.return_middle_lane = async (array) => {
  if (Array.isArray(array)) {
    return array[1];
  }
};

exports.return_bottom_lane = async (array) => {
  if (Array.isArray(array)) {
    return array[2];
  }
};

exports.early_check = async (data) => {
  const truth_collector = [];
  if (Array.isArray(data.mainTicket) || Array.isArray(data.array)) {
    for (let i = 0; i <= data.array.length - 1; i++) {
      let found = false;
      for (let j = 0; j <= data.mainTicket.length - 1; j++) {
        for (let k = 0; k < data.mainTicket[j].length; k++) {
          if (array[j][k] === array[i]) {
            truth_collector.push({
              element: i,
              found: true,
              index: [j, k],
            });
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (!found) {
        truth_collector.push({
          element: i,
          found: false,
          index: null,
        });
      }
    }
    return truth_collector;
  }
};

exports.pattern_processing = (data) => {
  const array = data?.array.grid;
  switch (data.pattern) {
    case "Full Housie":
      return array.flatMap((data) => data.filter((data) => data !== null));

    case "First Line":
      if (Array.isArray(array)) {
        return array[0];
      }
      break;

    case "Middle Line":
      if (Array.isArray(array)) {
        return array[1];
      }
      break;

    case "Last Line":
      if (Array.isArray(array)) {
        return array[2];
      }
      break;

    case "Twin Lines (1 & 2)":
      if (Array.isArray(array)) {
        return array[0][1];
      }
      break;
    case "Twin Lines (2 & 3)":
      if (Array.isArray(array)) {
        return array[1][2];
      }
      break;

    case "Twin Lines (3 & 1)":
      if (Array.isArray(array)) {
        return array[2][1];
      }
      break;

    case "Early Five":
      return array.flatMap((data) => data.filter((data) => data !== null));

    case "Early Ten":
      return array.flatMap((data) => data.filter((data) => data !== null));

    case "Pyramid":
      let data = [];
      if (Array.isArray(array)) {
        for (let i = 0; i <= array.length - 1; i++) {
          for (let j = 0; j <= array[i].length - 1; j++) {
            if (
              matrix[i][j] === undefined ||
              matrix[i + 1]?.[j - 1] === undefined ||
              matrix[i + 1]?.[j] === undefined ||
              matrix[i + 1]?.[j + 1] === undefined
            ) {
              console.log(
                `can not plot as one of the grid is undefined ${i},${j}`
              );
            } else {
              data.push([
                matrix[i][j],
                matrix[i + 1]?.[j - 1],
                matrix[i + 1]?.[j],
                matrix[i + 1]?.[j + 1],
              ]);
            }
          }
        }

        return data;
      }
      break;

    case "Reverse Pyramid":

      if (Array.isArray(array)) {
        for (let i = 0; i <= array.length - 1; i++) {
          for (let j = 0; j <= array[i].length - 1; j++) {
            if (
              matrix[i][j] === undefined ||
              matrix[i + 1]?.[j - 1] === undefined ||
              matrix[i + 1]?.[j] === undefined ||
              matrix[i + 1]?.[j + 1] === undefined
            ) {
              console.log(
                `can not plot as one of the grid is undefined ${i},${j}`
              );
            } else {
              data.push(
                [
                  matrix[i][j],
                  matrix[i + 1]?.[j - 1],
                  matrix[i + 1]?.[j],
                  matrix[i + 1]?.[j + 1],
                ].reverse()
              );
            }
          }
        }
        return data;
      }
      break;

    case "Corner":
      if (Array.isArray(array)) {
        return [
          array[0][0],
          array[0][array[0].length - 1],
          array[array.length - 1][0],
          array[array.length - 1][array[0].length - 1],
        ];
      }

    case "143 (I love You)":
      return array.flatMap((data) =>
        data.filter((value) => value === 1 || value === 3 || value === 4)
      );
    case "Anda-Danda":
      return ["not yet implemented "];

    case "Odd Number":
      if (Array.isArray(array)) {
        return array.flatMap((data) => data.filter((data) => data % 2 !== 0));
      }
      break;

    case "Even Number":
      if (Array.isArray(array)) {
        return array.flatMap((data) => data.filter((data) => data % 2 === 0));
      }
      break;

    case "1 from Each Line":
      return array;

    case "Smallest Five":
      return matrix
        .flatMap((row) => {
          return row.filter((data) => data !== null);
        })
        .sort((a, b) => a - b)
        .slice(0, 5);
    case "Bigger Five":
      return matrix
        .flatMap((row) => {
          return row.filter((data) => data !== null);
        })
        .sort((a, b) => b - a)
        .slice(0, 5);

    case "1 Balance in Full Housei":
      return ["not yet implemented "];

    default:
      "unknown pattern";
  }
};
