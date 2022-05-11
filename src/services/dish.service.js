import API_URL from "./config";
import { authHeader } from "./auth.service.js";

export const DishService = {
    async fetchAllDishes(user) {

        const response = await fetch(`${API_URL}/dishes`, {
            method: "GET",
            headers: authHeader(user)
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
    },

    async fetchDishById(user, dishId) {
        /*
        if (user !== null) {
            const response = await fetch(`${API_URL}/dishes/${dishId}`, {
                method: "GET",
                headers: authHeader(user)
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
        else {
            return null
        }*/
        
        const response = await fetch(`${API_URL}/dishes/${dishId}`, {
                method: "GET",
                headers: authHeader(user)
            });
            if (response.ok) {
                let data = await response.json();
                return data
            }
            else {
                console.log("erro")
                throw Error(response.Error)
            }
        

    },

}


export default DishService