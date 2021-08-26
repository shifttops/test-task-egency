import * as axios from "axios";

const toServer = axios.create({
    baseURL: 'https://www.nbrb.by/api/exrates/rates?periodicity=0',
})

export const currencyAPI = {
    async getCurrencies (){
        return (await toServer.get())
    }
}