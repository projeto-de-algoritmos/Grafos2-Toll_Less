const createGraph = () => {
  return new Map()
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

    for (let j of nodes) {
      conc += j.node + " (price-> " + j.price + ") ";
    }
    console.log(i + " -> " + conc);
  }
}

export default {
  printGraph,
  addDirectedLink,
  createGraph
}
