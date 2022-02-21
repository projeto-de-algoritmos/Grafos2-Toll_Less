const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const alreadyExists = (links, node1, node2) => {

  const found = links.find((link) => {
    if (link.target === node1 && link.source === node2)
      return true;
    return false;
  });

  return found ? true : false;
}

const createGraph = (qtd) => {
  return new Map()
}

generateNodes = (graph, qtd) => {
  for (let i = 0; i <= qtd; i++) {
    graph.set(i, []);
  }
}

// cria a aresta unidirecional com preço
const addDirectedLink = (graph, source, node, price) => {
  graph.get(source).push({ node, price });
}

const printGraph = (graph) => {
  const vertices = graph.keys();

  for (let i of vertices) {
    const nodes = graph.get(i);
    let conc = "";

    for (let j of nodes)
      conc += j.node + " (price-> " + j.price + ") ";

    console.log(i + " -> " + conc);
  }
}

const generateLinks = (graph, qtdNodes, qtdLinks) => {
  const min = 0;
  let qtd = qtdLinks;
  const links = [];


  while (qtd--) {
    const node1 = randomIntFromInterval(min, qtdNodes);
    let node2 = randomIntFromInterval(min, qtdNodes);
    const price = randomIntFromInterval(min + 1, qtdNodes) * 2;

    if (node1 === node2) node2 = randomIntFromInterval(min, qtdNodes);

    if (links.length === 0 || !alreadyExists(links, node1, node2)) {
      links.push({ target: node1, source: node2 });
      addDirectedLink(graph, node1, node2, price);
    }
  }
}
//
// export default {
//     createGraph, generateNodes, generateLinks, printGraph
// }

// **************************************************************************
const createPriorityQueue = () => {
  return [];
}

const enqueue = (pqueue, element, price) => {
  let exists = false;

  for (let i = 0; i < pqueue.length; i++) {
    if (pqueue[i].price > price) {
      pqueue.splice(i, 0, { element, price })
      exists = true;
      break;
    }
  }

  if (!exists) pqueue.push({ element, price })

}

const dequeue = (pqueue) => {
  if (!pqueue.length) throw "Is Empty!"

  return pqueue.shift()
}

// ***************************************************************************

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
const graph = createGraph();
const pqueue = createPriorityQueue()
// addDirectedLink(graph, 1, 2);
// addDirectedLink(graph, 2, 3);
// addDirectedLink(graph, 2, 4);
// addDirectedLink(graph, 3, 4);
generateNodes(graph, 10)
generateLinks(graph, 10, 20)

printGraph(graph)

p = djikstraAlgorithm(graph, 2);
console.log(p)