import { get } from "../../Utils/Api"

export const getAnswersByUserId = async (id) => {
    const response = await get(`answers?userId=${id}`);
    return response;
}

export const getAnswers = async (id) => {
    const response = await get(`answers?id=${id}`);
    return response;
}