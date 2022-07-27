import API_URL from "./config";

import { authHeader } from "./auth.service.js";

export const MenuService = {
    async fetchNextMenu() {
        const response = await fetch(`${API_URL}/menus/nextMenu`, {
            method: "GET"
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
    async fetchAllMenus() {
        const response = await fetch(`${API_URL}/menus`, {
            method: "GET"
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
    async fetchMenuById(user, id) {
        const response = await fetch(`${API_URL}/menus/${id}`, {
            method: "GET",
            headers: authHeader(user),
        })
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

    async createMenu(user, menu) {
        const response = await fetch(`${API_URL}/menus`, {
            method: "POST",
            headers: authHeader(user),
            body: JSON.stringify(menu)
        })
        if (response.ok) {
            let data = await response.json();
            console.log(data)
            return data
        }
        else {
            console.log(response)
            throw Error(response)
        }
    },

    async updateMenu(user,menu,menuId){

        const response = await fetch(`${API_URL}/menus/${menuId}`, {
            method: "PUT",
            headers: authHeader(user),
            body: JSON.stringify(menu)
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
    async decrementMenuOpenReservations(user,reservations,menuId){

        const response = await fetch(`${API_URL}/menus/${menuId}/reservations`, {
            method: "PUT",
            headers: authHeader(user),
            body: JSON.stringify(reservations)
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
    async decrementMenuDishQuantity(user,dishQuantity,menuId,dishId){

        const response = await fetch(`${API_URL}/menus/menuDish/${menuId}/dish/${dishId}`, {
            method: "PUT",
            headers: authHeader(user),
            body: JSON.stringify(dishQuantity)
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

}


export default MenuService