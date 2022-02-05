import { API,API3 } from "../../../backend";

export const getRooms = () => {
  return fetch(`${API3}/getRooms`, 
  { method: "GET" })
    .then(response => {
        // console.log(response.json)
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getNameById=(id)=>{
   return fetch(`${API}/user/${id}/getname`, 
   { method: "GET" })
   .then(response => {
       // console.log(response.json)
     return response.json();
   })
   .catch(err => console.log(err));
}