import router from "../router/index";
import { useToast } from "vue-toastification";
const toastOptions = {
  position: "bottom-left",
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const toast = useToast();

const errorhandler = (res) => {
  if (typeof res === "string") {
    console.log("error message", res);
    toast.error(res, toastOptions);
  } else {
    if ("error" in res.data) {
      Object.keys(res.data.error).map(function (key) {
        toast.error(res.data.error[key], toastOptions);
      });
    } else {
      toast.error(res.data.message, toastOptions);
    }
    if (
      res.data.message == "Authentication token expired" ||
      res.data.message == "Authentication Token Mismatch"
    ) {
      localStorage.removeItem("bWFpbCI6Inpvb");
      localStorage.removeItem("selected_company");
      localStorage.removeItem("language");
      localStorage.removeItem("selected_year");
      router.push({ name: "signup-signin" });
    }
  }
};
export default errorhandler;
export const successhandler = (res) => {
  if (typeof res === "string") {
    toast.success(res, toastOptions);
  } else {
    toast.success(res.data.message, toastOptions);
  }
};
