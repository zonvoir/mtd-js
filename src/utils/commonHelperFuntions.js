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
