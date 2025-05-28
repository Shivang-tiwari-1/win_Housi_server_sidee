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
          if (matrix[j][k] === array[i]) {
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
      return array.filter((data) => data !== null);

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
      return ["not yet implemented "];

    case "Twin Lines (2 & 3)":
      return ["not yet implemented "];

    case "Twin Lines (3 & 1)":
      return ["not yet implemented "];

    case "Early Five":
      return ["not yet implemented "];

    case "Early Ten":
      return ["not yet implemented "];

    case "Pyramid":
      return ["not yet implemented "];

    case "Reverse Pyramid":
      return ["not yet implemented "];

    case "Corner":
      return ["not yet implemented "];

    case "143 (I love You)":
      return ["not yet implemented "];

    case "Anda-Danda":
      return ["not yet implemented "];

    case "Odd Number":
      return ["not yet implemented "];

    case "Even Number":
      return ["not yet implemented "];

    case "1 from Each Line":
      return ["not yet implemented "];

    case "Smallest Five":
      return ["not yet implemented "];

    case "Bigger Five":
      return ["not yet implemented "];

    case "1 Balance in Full Housei":
      return ["not yet implemented "];

    default:
      "unknown pattern";
  }
};
