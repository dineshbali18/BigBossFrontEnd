import { API,API2 } from "../../backend";

export const getContestants = () => {
  return fetch(`${API2}/all/contestants`, 
  { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const increVote=(userId,contestantid,token)=>{
    return fetch(`${API}/user/${userId}/contestant/incre/${contestantid}`, 
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
  // console.log("user",userId);
  return fetch(`${API}/user/${userId}/loadvotes`,
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
  return fetch(`${API}/user/${userId}/votes/decre`,
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