import { get, post } from "../../Utils/Api"

export const getAnswersByUser = async () => {
    const response = await get("answers");
    return response;
}

export const postAnswerByUser = async (data) => {
    const response = await post("answers", data);
    return response;
}