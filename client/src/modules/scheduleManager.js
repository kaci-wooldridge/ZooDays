import { getToken } from "./authManager";

const baseUrl = "/api/schedule";


export const addSchedule = (schedule) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(schedule),
        });
    })
};