import axios from "../api/client";

export const fetchOneElmIcon = async (icon) => {
    // console.log("model req: ", icon);
  if (!icon) {
    return null;
  }
  return axios
    .get(`icons/oneIcon`, { params: { icon: icon } })
    .then((response) => {
      if (typeof response.data === "string") {
        return [];
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
};

export const fetchAllElmIcons = async () => {
  
  return axios
    .get('icons/allIcons')
    .then((response) => {
      if (typeof response.data === "string") {
        return [];
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

