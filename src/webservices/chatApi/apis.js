import endpointUrls from "../endpointUrls";
import apiRequestHandler from "../getway";

export async function getMyChats() {
    let response = await apiRequestHandler("GET", endpointUrls.GET_MY_CHATS);
    return response
}


export async function getMyChatMessages(chatId) {
    let response = await apiRequestHandler("GET", endpointUrls.GET_CHAT_MESSAGES + chatId);
    return response;
}

export async function getChatAccess(id) {
    let response = await apiRequestHandler("post", endpointUrls.GET_CHAT_ACCESS, { receiverId: id });
    return response
} 


export async function sendMessageApi(data) {
    let response = await apiRequestHandler("post", endpointUrls.SEND_MESSAGE, data);
    return response
} 