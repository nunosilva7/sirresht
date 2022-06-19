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
            console.log(reservation)
            let data = await response.json();
            console.log(data)
            return data
        }
        else {
            console.log("erro")
            throw Error(response.Error)
        }
    },
    async fetchNextReservation(user) {
        const response = await fetch(`${API_URL}/reservations/nextReservation/${user.userId}`, {
            method: "GET",
            headers: authHeader(user),
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
    async fetchReservationById(user,reservationId) {
        const response = await fetch(`${API_URL}/reservations/${reservationId}`,{
            method:"GET",
            headers: authHeader(user),
        });
        if(response.ok){
            let data = await response.json();
           
            return data
        }
        else{
            console.log("erro")
            throw Error(response.Error)
        }
    },


    async fetchUserReservations(user) {
        const response = await fetch(`${API_URL}/reservations/userReservations/${user.userId}`,{
            method:"GET",
            headers: authHeader(user),
        });
        if(response.ok){
            let data = await response.json();
            console.log(data)
            return data
        }
        else{
            console.log("erro")
            throw Error(response.Error)
        }
    }
}


export default ReservationService