import { get } from "../../Utils/Api"

export const getQuestionsIdTopic = async (id) => {
    const response = await get(`questions?topicId=${id}`);
    return response;
} 