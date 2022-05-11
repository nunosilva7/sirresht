import API_URL from "./config";
import { authHeader } from "./auth.service.js";

export const ReservationService = {
    async createReservation(user, reservation) {

        const response = await fetch(`${API_URL}/reservations`, {
            method: "POST",
            headers: authHeader(user),
            body: JSON.stringify(reservation)
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


export default ReservationService