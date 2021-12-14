import { API } from "../../backend";

export const getContestants = () => {
  return fetch(`http://192.168.1.108:5000/api/all/contestants`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const increVote=(id)=>{
    // console.log("id1"+id)
    return fetch(`http://192.168.1.108:5000/api/contestant/incre/${id}`, { method: "PUT" })
}
