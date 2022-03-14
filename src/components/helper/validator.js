import { toast } from "react-toastify";
import helper from "./index";

const RE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  subscribe(formData) {
    if (!formData?.email || formData?.email == "") {
      toast.error("please provide email addresss");
      return false;
    }

    if (!RE.test(String(formData?.email).toLowerCase())) {
      toast.error("please provide a valid email addresss");
      return false;
    }

    return true;
  },

  contact(formData) {
    if (!formData?.name || formData?.name == "") {
      toast.error("please provide fullname");
      return false;
    }

    if (!formData?.email || formData?.email == "") {
      toast.error("please provide email addresss");
      return false;
    }

    if (!RE.test(String(formData?.email).toLowerCase())) {
      toast.error("please provide a valid email addresss");
      return false;
    }

    if (!formData?.subject || formData?.subject == "") {
      toast.error("please provide subject number");
      return false;
    }

    if (!formData?.message || formData?.message == "") {
      toast.error("please provide message");
      return false;
    }

    return true;
  },

  register(formData) {
    if (!formData?.name || formData?.name == "") {
      toast.error("please provide both firstname and lastname");
      return false;
    }

    if (!formData?.email || formData?.email == "") {
      toast.error("please provide email addresss");
      return false;
    }

    if (!RE.test(String(formData?.email).toLowerCase())) {
      toast.error("please provide a valid email addresss");
      return false;
    }

    if (!formData?.phone || formData?.phone == "") {
      toast.error("please provide phone number");
      return false;
    }

    if (!formData?.password || formData?.password == "") {
      toast.error("please provide password");
      return false;
    }

    if (!formData?.passwordConfirm || formData?.passwordConfirm == "") {
      toast.error("please confirm password");
      return false;
    }

    if (formData?.password !== formData?.passwordConfirm) {
      toast.error("password confirmation failed");
      return false;
    }

    return true;
  },

  login(formData) {
    if (!formData?.email || formData?.email == "") {
      toast.error("please provide email addresss");
      return false;
    }

    if (!RE.test(String(formData?.email).toLowerCase())) {
      toast.error("please provide a valid email addresss");
      return false;
    }

    if (!formData?.password || formData?.password == "") {
      toast.error("please provide password");
      return false;
    }

    return true;
  },
};
