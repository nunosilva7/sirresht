import API_URL from "./config.js";

import { authHeader } from "./auth.service.js";


export const UserService = {
  async fetchAllUsers(user) {
    if (user !== null) {
      var params = "";
      var url = new URL(`${API_URL}/users/`);

      if (params !== "") {
        Object.keys(params).forEach(key =>
          url.searchParams.append(key, params[key])
        );
      }

      const response = await fetch(url, {
        method: "GET",
        headers: authHeader(user)
      });

      if (response.ok) {
        let data = await response.json();
        return data.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  

  async fetchUserById(user, userId) {
    if (user !== null) {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: authHeader(user)
      });


      if (response.ok) {
        let data = await response.json();
        console.log(data)
        return data;
        
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  async fetchUserByEmail(user,userEmail){
    if (user !== null) {
      const response = await fetch(`${API_URL}/users/email/${userEmail}`, {
        method: "GET",
        headers: authHeader(user)
      });
      if(response.ok){
        let data= await response.json();
        console.log(data);
        return data
      }
      else{
        return null
      }
      
    }else{
      return null
    }
  },
  async updateAvatar(user,userId,avatarReference){
    if (user !== null) {
      const response = await fetch(`${API_URL}/users/${userId}/avatar`, {
        method: "PATCH",
        headers: authHeader(user),
        body: JSON.stringify(avatarReference)
      });
      if(response.ok){
        let data= await response.json();
        console.log(data);
        return data
      }
      else{
        return null
      }
      
    }else{
      return null
    }
  }
}
  

export default UserService;