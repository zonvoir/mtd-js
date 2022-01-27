export const departmentModify = (deptsArr) => {
  let departments = [];
  for (var k = 0; k < deptsArr.length; k++) {
    let dept = {
      value: deptsArr[k].departmentid,
      label: deptsArr[k].name,
    };
    departments.push(dept);
  }
  return departments;
};
export const getDepartemntsValue = (deptsArr) => {
  let departments = [];
  for (var k = 0; k < deptsArr.length; k++) {
    departments.push(deptsArr[k].departmentid);
  }
  return departments;
};
export const getDepartemntsLables = (deptsArr) => {
  let departments = [];
  for (var k = 0; k < deptsArr.length; k++) {
    departments.push(deptsArr[k].name);
  }
  return departments;
};
