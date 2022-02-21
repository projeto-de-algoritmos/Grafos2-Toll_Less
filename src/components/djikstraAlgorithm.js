import { createPriorityQueue, enqueue, dequeue } from './priorityQueue'

const djikstraAlgorithm = (graph, startNode) => {
    let prices = {};
    let prevNode = {};
    const queue = createPriorityQueue();

    prices[startNode] = 0;
    enqueue(queue, startNode, 0);

    const vertices = graph.keys();

    for (let vert of vertices) {
        prevNode[vert] = null;
        if (vert !== startNode) prices[vert] = Infinity;
    }

    while (queue.length) {
        let minNode = dequeue(queue);
        let currNode = minNode.element;

        const nodes = graph.get(currNode);

        if (!nodes.length) return "No path using this startNode";

        for (let node of nodes) {
            const sumPrice = prices[currNode] + node.price;

            if (sumPrice < prices[node.node]) {
                prices[node.node] = sumPrice;
                prevNode[node.node] = currNode;
                enqueue(queue, node.node, prices[node.node])
            }
        }

    }
    return prices;

}

export default djikstraAlgorithm;