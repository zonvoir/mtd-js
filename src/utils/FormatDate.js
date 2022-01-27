import moment from "moment";
// Jan 27, 2022
export const formatDate = (value, formatter) => {
  if (value) {
    return moment(String(value)).format(formatter);
  }
};
