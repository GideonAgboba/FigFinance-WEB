import moment from "moment";
import Axios from "../../redux/axios";

export default {
  getInitials(string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  },

  truncateString(sentence, amount, tail = "...") {
    const words = sentence.split("");

    if (amount >= words.length) {
      return sentence;
    }

    const truncated = words.slice(0, amount);
    return `${truncated.join("")}${tail}`;
  },

  truncateWords(sentence, amount, tail = "...") {
    const words = sentence.split(" ");

    if (amount >= words.length) {
      return sentence;
    }

    const truncated = words.slice(0, amount);
    return `${truncated.join(" ")}${tail}`;
  },
};
