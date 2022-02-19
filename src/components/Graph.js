const createGraph = () => {
  return new Map()
}

// gera os nós e as listas de adj
const generateNodes = (graph, qtd) => {
  const nodes = [];
  for (let id = 0; id <= qtd; id++) {
      graph.set(id, []);
      nodes.push({ id });
  }
}

// cria a aresta unidirecional
const addDirectedLink = (graph, start, end) => {
  graph.get(start).push(end);
}

const printGraph = (graph) => {
  const vertices = graph.keys();

  for (let i of vertices) {
      const nodes = graph.get(i);
      let conc = "";

      for (let j of nodes)
          conc += j + " ";

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

      if (node1 === node2) node2 = randomIntFromInterval(min, qtdNodes);

      if (links.length === 0 || !alreadyExists(links, node1, node2)){
        links.push({ target: node1, source: node2 });
        addDirectedLink(graph, node1, node2);
      }
    }
  }

export default {
    createGraph,
    generateNodes,
    generateLinks,
    printGraph
}


// const graph = createGraph();
// const pqueue = createPriorityQueue()
// addDirectedLink(graph, 1, 2);
// addDirectedLink(graph, 2, 3);
// addDirectedLink(graph, 2, 4);
// addDirectedLink(graph, 3, 4);
// generateNodes(graph, 10)
// generateLinks(graph, 10, 10)
// printGraph(graph)