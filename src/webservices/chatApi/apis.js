import endpointUrls from "../endpointUrls";
import apiRequestHandler from "../getway";

export async function getMyChats() {
    let response = await apiRequestHandler("GET", endpointUrls.GET_MY_CHATS);
    return response
} 


export async function getMyChatMessages(chatId) {
    let response = await apiRequestHandler("GET", endpointUrls.GET_CHAT_MESSAGES+chatId);
    return response
} 