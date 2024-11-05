import Cookies from "js-cookie";

export const storeTokenInCookie = (jwt: string) => {
  if (jwt) {
    console.log(jwt, 'this is jwt from set'  );
    Cookies.set("jwt", jwt);
    // Check if token was stored in cookies, and if not, use localStorage as a fallback
    if (!Cookies.get("jwt")) {
      localStorage.setItem("jwt", jwt);
    }
  }
};

export const getTokenFromCookie = () => {
  // Check cookies first, then fallback to localStorage
  return Cookies.get("jwt") ;
};

export const removeToken = () => {
  Cookies.remove("jwt");
  localStorage.removeItem("jwt");
};
