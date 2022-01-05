export const staffData = () => {
  let user = localStorage.getItem("bWFpbCI6Inpvb");
  user = JSON.parse(user);
  if (user === null || user === undefined || user.auth_token === "") {
    staffData = user;
  }
  return staffData;
};
