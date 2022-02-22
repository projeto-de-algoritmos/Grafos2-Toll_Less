const createGraph = () => {
  return new Map()
}

// cria a aresta unidirecional com preço
const addDirectedLink = (graph, source, node, price) => {
  graph.get(source).push({ node, price });
}

const printGraph = (graph) => {
  const vertices = graph.keys();
  let finalGraph = "";

  for (let i of vertices) {
    const nodes = graph.get(i);
    let conc = "";

    for (let j of nodes) {
      conc += j.node + " (Preço-> " + j.price + ")";
    }
    finalGraph += "Vértice " + i + " -> Vizinhos: " + conc + "\n";
  }
  return finalGraph;
}

export default {
  printGraph,
  addDirectedLink,
  createGraph
}
