import store from "../store/questionnaire";

const permissionFilterData = (data) => {
  const permissionArr = store.getters.memberPermissions;
  let filterdArr = permissionArr.filter((item) => {
    console.log(
      data.cat_idArr.length > 0 && data.cat_idArr != "",
      data,
      permissionArr
    );
    if (data.cat_idArr.length > 0 && data.cat_idArr != "") {
      let cates = item.categories.filter((category) => {
        console.log(
          data.cat_idArr.includes(category.id) &&
            data.dept_idArr.includes(item.departmentid),
          category
        );
        return (
          data.cat_idArr.includes(category.id) &&
          data.dept_idArr.includes(item.departmentid)
        );
      });
      console.log(cates);
      return (item.categories = cates);
    }
    return data.dept_idArr.includes(item.departmentid);
  });
  //   console.log(data, filterdArr);
  return filterdArr;
};
export default permissionFilterData;
