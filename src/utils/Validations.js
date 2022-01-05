export const requiredVali = (val, msg) => !!val || msg;

// for email validation
export const emailVali = (val, msg) => {
  let emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || msg;
};

export const passwordVali = (val, msg) => {
  let passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return passwordPattern.test(val) || msg;
};
export const ImageVali = (val, msg) => {
  let ImagePattern = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png)$/;
  return ImagePattern.test(val) || msg;
};
