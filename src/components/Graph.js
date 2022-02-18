export const createGraph = () => {
    return new Map()
}

// gera os nós e as listas de adj
export const generateNodes = (graph, qtd) => {
    const nodes = [];
    for (let id = 0; id <= qtd; id++) {
        graph.set(id, []);
        nodes.push({ id });
    }
}

// cria a aresta unidirecional
export const addDirectedLink = (graph, start, end) => {
    graph.get(start).push(end);
}

export const printGraph = (graph) => {
    const vertices = graph.keys();

    for (let i of vertices) {
        const nodes = graph.get(i);
        let conc = "";

        for (let j of nodes)
            conc += j + " ";

        console.log(i + " -> " + conc);
    }
}
//
// export default {
//     createGraph, generateNodes, addDirectedLink, printGraph
// }

// const graph = createGraph();
// generateNodes(graph, 10);
// addDirectedLink(graph, 1, 2);
// addDirectedLink(graph, 2, 3);
// addDirectedLink(graph, 2, 4);
// addDirectedLink(graph, 3, 4);
// 
// printGraph(graph)