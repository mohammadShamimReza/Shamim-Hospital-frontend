import Cookies from "js-cookie";

export const storeTokenInCookie = (jwt: string) => {
  if (jwt) {
    Cookies.set("jwt", jwt, { sameSite: "None", secure: false });
    // Check if token was stored in cookies, and if not, use localStorage as a fallback
    if (!Cookies.get("jwt")) {
      localStorage.setItem("jwt", jwt);
    }
  }
};

export const getTokenFromCookie = () => {
  // Check cookies first, then fallback to localStorage
  return Cookies.get("jwt") || localStorage.getItem("jwt");
};

export const removeToken = () => {
  Cookies.remove("jwt");
  localStorage.removeItem("jwt");
};
