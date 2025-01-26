import { Flip, toast } from "react-toastify";

export function successMessage(massage: string) {
  toast.success(massage, {
    position: "top-left",
    autoClose: 2000,
    theme: "colored",
    transition: Flip,
  });
}

export function errorMessage(massage: string) {
  toast.error(massage, {
    position: "top-left",
    autoClose: 5000,
    theme: "dark",
    transition: Flip,
  });
}
