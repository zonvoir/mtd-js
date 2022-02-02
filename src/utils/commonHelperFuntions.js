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
