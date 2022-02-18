export const departmentModify = (deptsArr) => {
  let departments1 = [];
  for (var k = 0; k < deptsArr.length; k++) {
    let dept = {
      value: deptsArr[k].departmentid,
      label: deptsArr[k].name,
    };
    departments1.push(dept);
  }
  return departments1;
};
export const getDepartemntsValue = (deptsArr) => {
  let departments2 = [];
  for (var k = 0; k < deptsArr.length; k++) {
    departments2.push(deptsArr[k].departmentid);
  }
  return departments2;
};
export const selectedDepartemntsValue = (deptArr) => {
  let departments4 = deptArr.map((dept) => {
    return dept.value;
  });
  return departments4;
};
export const getDepartemntsLables = (deptsArr) => {
  let departments3 = [];
  for (var k = 0; k < deptsArr.length; k++) {
    departments3.push(deptsArr[k].name);
  }
  return departments3;
};
