import axios from "axios";
import { makeUseAxios } from "axios-hooks";
function getCookie(cname:string) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    headers: {
      "X-Auth-Token": getCookie("token"),
    },
  }),
});

export default useAxios;
