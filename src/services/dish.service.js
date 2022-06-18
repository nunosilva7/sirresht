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

    async createDish(user, dish) {

        const response = await fetch(`${API_URL}/dishes`, {
            method: "POST",
            headers: authHeader(user),
            body: JSON.stringify(dish)
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

    async updateDish(user,dish,dishId){

        const response = await fetch(`${API_URL}/dishes/${dishId}`, {
            method: "PUT",
            headers: authHeader(user),
            body: JSON.stringify(dish)
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
    async deleteDish(user,dishId){
        const response = await fetch(`${API_URL}/dishes/${dishId}`, {
            method: "DELETE",
            headers: authHeader(user),
           
        });
        if (response.ok) {
            let data = await response.json();
           
            return data
        }
        else {
            console.log("erro")
            throw Error(response.Error)
        }

    }

}


export default DishService