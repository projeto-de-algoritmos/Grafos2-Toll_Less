export default class GraphModel {
  constructor(node) {
    this.node = node;
    this.listAdj = new Map();
    this.links = 0;
}

  // gera os nós e as listas de adj
  generateNodes = (graph, qtd) => {
    const nodes = [];
    for (let id = 0; id <= qtd; id++) {
      graph.set(id, []);
      nodes.push({ id });
    }
  }

  // cria a aresta unidirecional com preço
  addDirectedLink = (source, node, price) => {
    this.listAdj.get(source).push({ node, price });
  }

  printGraph = (graph) => {
    const vertices = graph.keys();

    for (let i of vertices) {
      const nodes = graph.get(i);
      let conc = "";

      for (let j of nodes)
        conc += j.node + " (price-> " + j.price + ") ";

      console.log(i + " -> " + conc);
    }
  }
}
