import { API } from "../../backend";

export const getContestants = () => {
  return fetch(`http://192.168.1.108:5000/api/all/contestants`, 
  { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const increVote=(userId,contestantid,token)=>{
    return fetch(`http://192.168.1.108:5000/api/user/${userId}/contestant/incre/${contestantid}`, 
    { method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const loadUserVotes=(token,userId)=>{
  return fetch(`http://192.168.1.108:5000/api/user/${userId}/loadvotes`,
  {method:"GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`
  }}).then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const decrement=(token,userId)=>{
  return fetch(`http://192.168.1.108:5000/api/user/${userId}/votes/decre`,
  {method:"GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`
  }})
}

// .then(response => {
//   return response.json();
// })
// .catch(err => console.log(err));