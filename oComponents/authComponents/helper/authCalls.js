const API='http://192.168.1.108:5000/api/'

export const signup = user => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

export const signin=user=>{
    console.log(user)
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
};

  //otp calls
  export const getotp = email => {
    //   console.log("email",email)
    return fetch(`${API}/user/generateotp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email)
    })
      .then(response => {
        //   console.log(response);
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const sendotp=email=>{
      return fetch(`${API}/user/sendotp`,{
          method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(email)
    })
    .then(response => {
        // return response.json();
      })
      .catch(err => console.log(err));
  }

  export const verifyotp=otpdata=>{
    //   console.log("kkkkkkkkkkooookkkkkkkk")
    return fetch(`${API}/user/verifyotp`,{
        method:"POST",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify(otpdata)
  })
  .then(response => {
      return response.text();
    })
    .catch(err => console.log(err));
}
