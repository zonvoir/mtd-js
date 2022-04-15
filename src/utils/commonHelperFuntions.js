export const getIndustryModified = (industryArr) => {
  let industries1 = [];
  for (var k = 0; k < industryArr.length; k++) {
    let indus = {
      value: industryArr[k].id,
      label: industryArr[k].name,
    };
    industries1.push(indus);
  }
  return industries1;
};
export const getSeniorityModified = (seniorityArr) => {
  let seniorityLevelArr = [];
  for (var k = 0; k < seniorityArr.length; k++) {
    let level = {
      value: seniorityArr[k].id,
      label: seniorityArr[k].level,
    };
    seniorityLevelArr.push(level);
  }
  return seniorityLevelArr;
};
export const getRolesModified = (rolesArr) => {
  if (!rolesArr.length) return;
  let rolesList = rolesArr.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return rolesList;
};
export const getlabelValue = (legalFormsArr, id) => {
  if (!legalFormsArr.length) return;

  let legalForm = legalFormsArr.find((element) => element.value === id);

  return (legalForm && legalForm.label) || undefined;
};
// export const getCountryName = (countryArr, id) => {
//   if (!countryArr.length) return;

//   let country = countryArr.find((element) => element.value === id);

//   return (country && country.label) || undefined;
// };
// export const getmainIndustryName = (mainIndustryArr, id) => {
//   if (!mainIndustryArr.length) return;

//   let mainIndustry = mainIndustryArr.find((element) => element.value === id);

//   return (mainIndustry && mainIndustry.label) || undefined;
// };
// export const getSubIndustryName = (subIndustryArr, id) => {
//   if (!subIndustryArr.length) return;

//   let subIndustry = subIndustryArr.find((element) => element.value === id);

//   return (subIndustry && subIndustry.label) || undefined;
// };
// export const getDetailedIndustryName = (detailedIndstry, id) => {
//   if (!detailedIndstry.length) return;

//   let detailIndustry = detailedIndstry.find((element) => element.value === id);

//   return (detailIndustry && detailIndustry.label) || undefined;
// };
// export const getRegionName = (regionsArr, id) => {
//   if (!regionsArr.length) return;

//   let region = regionsArr.find((element) => element.value === id);

//   return (region && region.label) || undefined;
// };

export const getCategoryModified = (categoryArr) => {
  if (!categoryArr.length) return;
  let categoryArray = categoryArr.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  console.log("transformed Category ", categoryArr);
  return categoryArray;
};

//  get first letter of string
export const getFirstLetter = (str) => {
  return str.charAt(0).toUpperCase();
};
//  genrate random hex color code
export const setRandomBG = () => {
  var letters = "0123456789ABCDEF";
  // html color code starts with #
  var color = "#";

  // generating 6 times as HTML color code consist
  // of 6 letter or digits
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

export const setRandomBackground = () => {
  let backgrounds = ["#0ACA8A", "#FFC94D", "#2E3A59"];
  let background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return background;
};
// to Update the local storage Object
//single
//updateStorage("company", [{name:"ACME"}])

//multiple
//updateLocalStorage("company", [{name:"ACME"},{location:"USA"}])

export const updateLocalStorage = (keyName, newkeypairs = []) => {
  const obj = JSON.parse(localStorage.getItem(keyName));
  newkeypairs.map((n) => (obj[Object.keys(n)] = Object.values(n)[0]));
  localStorage.setItem(keyName, JSON.stringify(obj));
};

// to Update the session storage Object
export const updateSessionStorage = (keyName, newkeypairs = []) => {
  const obj = JSON.parse(sessionStorage.getItem(keyName));
  newkeypairs.map((n) => (obj[Object.keys(n)] = Object.values(n)[0]));
  sessionStorage.setItem(keyName, JSON.stringify(obj));
};

export const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );

export const phoneNumberMask = (number, seprator = ",") => {
  // number = number.split(seprator);
  // console.info(number, "vis");
  // number = number.join("");
  // console.info(number);
  // number = +number;

  var numberString = new Intl.NumberFormat()
    .formatToParts(number)
    .map(({ type, value }) => {
      console.info("visDefault", value, type);
      switch (type) {
        case "currency":
          return `<strong>${value}</strong>`;
        default:
          return value;
      }
    })
    .reduce((string, part) => {
      if (part == ",") {
        console.info("vishu", string + seprator);
        return string + seprator;
      } else {
        console.info("vish", string + part);
        return string + part;
      }
    });
  console.info("kk", numberString);
  return numberString;
};
// export default phoneNumberMask;
