import type ChatMessageInterface from "./ChatMessageInterface";


export default interface CurrentChatInterface{
    id: string,
    last_activity_date: Date,
    name: string,
    currency: string,
    messages: ChatMessageInterface[]
}