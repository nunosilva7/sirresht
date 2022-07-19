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
    },
    async fetchAllReservations(user){
        const response = await fetch(`${API_URL}/reservations`,{
            method: "GET",
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
    },
    async updateReservationStatus(user,reservation,reservationId){
        const response = await fetch(`${API_URL}/reservations/${reservationId}`,{
            method: "PUT",
            headers: authHeader(user),
            body: JSON.stringify(reservation)
        });
        if(response.ok){
            let data = await response.json();
            console.log(data)
            return data

        }
        else{
            let data = await response.json();
            console.log(data)
            return data
        }
    },
    async incrementSupplements(user,reservation,reservationId){
        const response = await fetch(`${API_URL}/reservations/${reservationId}/increment/`,{
            method: "PUT",
            headers: authHeader(user),
            body: JSON.stringify(reservation)
        });
        if(response.ok){
            let data = await response.json();
            console.log(data)
            return data

        }
        else{
            let data = await response.json();
            console.log(data)
            return data
        }
    },
    async paymentByParticipant (user,payment,reservationId,participantId){
        const response = await fetch(`${API_URL}/reservations/${reservationId}/payment/${participantId}`,{
            method: "PUT",
            headers: authHeader(user),
            body: JSON.stringify(payment)
        });
        if(response.ok){
            let data = await response.json();
            console.log(data)
            return data

        }
        else{
            let data = await response.json();
            console.log(data)
            return data
        }
    }
}


export default ReservationService