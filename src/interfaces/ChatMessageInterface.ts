export default interface ChatMessageInterface{
    id: string,
    type: "text" | "options" | "table" | "chart" | "network_graph" | "infocard",
    text: string,
    author: "user" | "bot",
    table ?: {
        name: string
        head: String[]
        row: Array<Array<String>>
    },
    options ?: ChatMessageOptionInterface[], 
    chart ?: null,
}

interface ChatMessageOptionInterface{
    id: string,
    is_choosen: boolean,
    text: string
}