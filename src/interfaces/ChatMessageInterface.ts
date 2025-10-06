export default interface ChatMessageInterface{
    id: string,
    type: "text" | "options" | "table" | "chart" | "network_graph" | "infocard" | "unlogged_user",
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
    chart ?: ChatMessageChartDataInterface,
    legendNodes ?: CurrentChatNetworkLegendInterface,
    nodes ?: ChatMessageNetworkNode[] | null
}

interface CurrentChatNetworkLegendInterface{
    sizes: {
        name: string,
        value: string
    }[],
    edges: {
        name: string,
        value: string
    }[],
}

interface ChatMessageOptionInterface{
    id: string,
    is_choosen: boolean,
    text: string
}

interface ChatMessageChartDataInterface{
    legend: string[],
    data: ChatMessageChartInterface[][],
}

interface ChatMessageChartInterface{
    name: string,
    value: number | string,
}

interface ChatMessageNetworkNode{
    objects: {
        id: string,
        type: string, 
        value: number,
        data: {
            name: string,
            value: string,
        }[]
    }[],
    links: {
        source: string,
        target: string,
        value: number,
        relationType: "direct" | "indirect" | null,
    }[],
}