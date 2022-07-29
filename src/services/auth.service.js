import API_URL from "./config";

export function authHeader(user) {
    // if there is a logged in user with accessToken (JWT)
    if (user.accessToken ) {
      // return HTTP authorization header for Node.js Express back-end
      return {
        "Content-Type": "application/json",
        "Authorization": user.accessToken,
        
      };
    } else {
      return { "Content-Type": "application/json" }; //otherwise, return an empty object
    }
  };

  export const AuthService = {

    async login(credentials) {
      const response = await fetch(`${API_URL}/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(credentials)
        
      });
   
      let data = await response.json();
      console.log(data)
  
      if (!response.ok) {
        throw Error(data.error);
      }
  
      if (data.accessToken) {
        return data;
      } else {
        return null;
      }
    },
   
    async register(user) {
      const response = await fetch(`${API_URL}/auth/signUp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
      });
  
      let data = await response.json();
  
      if (!response.ok) {
        throw Error(data.message);
      }
    },

    async changePassword(user,userCredentials) {
      const response = await fetch(`${API_URL}/auth/updatePassword`, {
        method: "POST",
        headers: authHeader(user),
        body: JSON.stringify(userCredentials)
    });
    if (response.ok) {
        let data = await response.json();
        console.log(data)
        return data
    }
    else {
        console.log("erro")
        throw Error(response.Error)
    }
    
    }
  };
  export default AuthService;