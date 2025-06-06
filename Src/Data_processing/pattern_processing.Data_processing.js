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
  console.log("pattern_procesig",data)
  const array = data?.array;
  switch (data.pattern) {
    case "Full Housie":
      return array.flatMap((data) => data.filter((data) => data !== null));

    case "First Line":
      if (Array.isArray(array)) {
        return array[0].filter((data) => data !== null);
      }
      break;

    case "Middle Line":
      if (Array.isArray(array)) {
        return array[1].filter((data) => data !== null);
      }
      break;

    case "Last Line":
      if (Array.isArray(array)) {
        return array[2].filter((data) => data !== null);
      }
      break;

    case "Twin Lines (1 & 2)":
      if (Array.isArray(array)) {
        return [array[0], array[1]].map((data) =>
          data.filter((data) => data !== null)
        );
      }
      break;
    case "Twin Lines (2 & 3)":
      if (Array.isArray(array)) {
        return [array[1], array[2]].map((data) =>
          data.filter((data) => data !== null)
        );
      }
      break;

    case "Twin Lines (3 & 1)":
      if (Array.isArray(array)) {
        return [array[2], array[1]].map((data) =>
          data.filter((data) => data !== null)
        );
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
              array[i][j] === undefined ||
              array[i + 1]?.[j - 1] === undefined ||
              array[i + 1]?.[j] === undefined ||
              array[i + 1]?.[j + 1] === undefined
            ) {
              console.log(
                `can not plot as one of the grid is undefined ${i},${j}`
              );
            } else {
              data.push([
                array[i][j],
                array[i + 1]?.[j - 1],
                array[i + 1]?.[j],
                array[i + 1]?.[j + 1],
              ]);
            }
          }
        }

        return data;
      }
      break;

    case "Reverse Pyramid":
      const data_array = [];
      if (Array.isArray(array)) {
        for (let i = 0; i <= array.length - 1; i++) {
          for (let j = 0; j <= array[i].length - 1; j++) {
            if (
              array[i][j] === undefined ||
              array[i + 1]?.[j - 1] === undefined ||
              array[i + 1]?.[j] === undefined ||
              array[i + 1]?.[j + 1] === undefined
            ) {
              console.log(
                `can not plot as one of the grid is undefined ${i},${j}`
              );
            } else {
              data_array.push(
                [
                  array[i][j],
                  array[i + 1]?.[j - 1],
                  array[i + 1]?.[j],
                  array[i + 1]?.[j + 1],
                ].reverse()
              );
            }
          }
        }
        return data_array;
      }
      break;

    case "Corner":
      if (Array.isArray(array)) {
        const corner = [
          array[0]?.[0],
          array[0]?.[array[0].length - 1],
          array[array.length - 1]?.[0],
          array[array.length - 1]?.[array[0].length - 1],
        ];

        const hasNonNull = corner.every((data) => typeof data === "number");

        return hasNonNull ? corner : [];
      }

    case "143 (I love You)":
      const i_l_y = array.flatMap((data) =>
        data.filter((value) => value === 1 || value === 3 || value === 4)
      );
      return [1, 4, 3].every((data) => i_l_y.includes(data)) ? i_l_y : [];
    case "Anda-Danda":
      return [];

    case "Odd Number":
      if (Array.isArray(array)) {
        return array.flatMap((data) =>
          data.filter((data) => data % 2 !== 0 && data !== null)
        );
      }
      break;

    case "Even Number":
      if (Array.isArray(array)) {
        return array.flatMap((data) =>
          data.filter((data) => data % 2 === 0 && data !== null)
        );
      }
      break;

    case "1 from Each Line":
      return array;

    case "Smallest Five":
      return array
        .flatMap((row) => {
          return row.filter((data) => data !== null);
        })
        .sort((a, b) => a - b)
        .slice(0, 5);
    case "Bigger Five":
      return array
        .flatMap((row) => {
          return row.filter((data) => data !== null);
        })
        .sort((a, b) => b - a)
        .slice(0, 5);

    case "1 Balance in Full Housei":
      return [];

    default:
      "unknown pattern";
  }
};
