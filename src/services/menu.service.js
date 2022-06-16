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
    }

}


export default MenuService