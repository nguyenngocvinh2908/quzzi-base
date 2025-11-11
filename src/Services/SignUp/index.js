import { get } from "../../Utils/Api"

export const checkApi = async (key, value) => {
    const result = await get(`users?${key}=${value}`);
    return result;
}