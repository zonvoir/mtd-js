const errorhandler = (res, $th) => {
  if ("error" in res.data) {
    Object.keys(res.data.error).map(function (key) {
      $th.$toast.error(res.data.error[key], {
        position: "bottom-left",
        duration: 3712,
      });
    });
  } else {
    $th.$toast.error(res.data.message, {
      position: "bottom-left",
      duration: 3712,
    });
  }
};
export default errorhandler;
