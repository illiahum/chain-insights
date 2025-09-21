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
    data ?: {
        name: string
        rows: {
            label: string,
            text: string
        }[],
        button_url?: string,
    }
    options ?: ChatMessageOptionInterface[], 
    chart ?: null,
    nodes ?: ChatMessageNetworkNode[] | null
}

interface ChatMessageOptionInterface{
    id: string,
    is_choosen: boolean,
    text: string
}

interface ChatMessageNetworkNode{
    id: string,
    name: string,
    type: string, 
    relationType: "direct" | "indirect" | null,
    value: number,
    childs: ChatMessageNetworkNode[]
}