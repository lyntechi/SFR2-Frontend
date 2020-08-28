import { axiosWithAuth } from "../utils/axiosWithAuth";

export function fetchApi() {
  return axiosWithAuth()
    .get("/api/recipes")
    .then((response) => {
      console.log(response);
      return response;
    });
}