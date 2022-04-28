import API_URL from "./config";

//import { authHeader } from "./auth.service.js";

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
        else{
            console.log("erro")
            return null
        }
    }

}

export default MenuService