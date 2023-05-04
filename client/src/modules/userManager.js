import { getToken } from "./authManager";

const baseUrl = "/api/user";

export const getSchedulesForCurrentUser = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/schedules`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};