import { createPriorityQueue, enqueue, dequeue } from './priorityQueue'

const djikstraAlgorithm = (graph, startNode, endNode) => {
    let prices = {};
    let prevNode = {};
    const queue = createPriorityQueue();

    prices[startNode] = 0;
    enqueue(queue, startNode, 0);

    const vertices = graph.keys();

    for (let vert of vertices) {
        if (vert !== startNode) prices[vert] = Infinity;
        prevNode[vert] = null;
    }

    while (queue.length) {
        let minNode = dequeue(queue);
        let currNode = Number(minNode.element);

        const nodes = graph.get(currNode);

        if (!nodes.length) return "Sem caminho utilizando esse nó inicial";

        for (let node of nodes) {
            const sumPrice = prices[currNode] + node.price;

            if (sumPrice < prices[node.node]) {
                prevNode[node.node] = currNode;
                prices[node.node] = sumPrice;
                enqueue(queue, node.node, prices[node.node])
            }
        }

    }
    if (prices[endNode] === Infinity) return "Não é possível formar cmainho até o nó final"
    else {
        return prices[endNode]
    }

}

export default djikstraAlgorithm;