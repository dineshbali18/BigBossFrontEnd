import { API3 } from "../../../backend";

export const getRooms = () => {
  return fetch(`${API3}/getRooms`, 
  { method: "GET" })
    .then(response => {
        // console.log(response.json)
      return response.json();
    })
    .catch(err => console.log(err));
};