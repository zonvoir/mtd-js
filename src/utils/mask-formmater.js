// var numberString = new Intl.NumberFormat()
//   .formatToParts(154879623514.25469987)
//   .map(({ type, value }) => {
//     switch (type) {
//       case "currency":
//         return `<strong>${value}</strong>`;
//       default:
//         return value;
//     }
//   })
//   .reduce((string, part) => {
//     console.log(string, part);
//     return string + part;
//   });
// console.log(numberString)

const maskFormatter = (number, seprator = ",") => {
  var numberStringArr = new Intl.NumberFormat()
    .formatToParts(number)
    .map(({ type, value }) => {
      switch (type) {
        case "currency":
          return `<strong>${value}</strong>`;
        default:
          console.info("visDefault", value, type);
          return value;
      }
    });
  console.log(numberStringArr, "arr");
  var numberString = numberStringArr.reduce((string, part) => {
    if (part == ",") {
      console.info("vishu", string + seprator);
      return string + seprator;
    } else {
      console.info("vish", string + part + "");
      return string + part;
    }
  });
  return numberString;
};

export const maskRemover = (number, seprator = ",") => {
  number = number.split(seprator);
  number = number.join("");
  console.log(number);
  return number;
};
export default maskFormatter;
