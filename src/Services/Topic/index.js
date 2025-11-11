import { get } from "../../Utils/Api"

export const getTopic = async () => {
    const response = await get("topics");
    return response;
}

export const getTopicId = async (id) => {
    const response = await get(`topics/${id}`);
    return response;
}