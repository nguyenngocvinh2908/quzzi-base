import { get } from "../../Utils/Api"
export const getSignIn = async (email, password) => {
    const data = await get(`users?email=${email}&password=${password}`);
    return data;
}