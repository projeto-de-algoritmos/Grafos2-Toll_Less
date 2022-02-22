import './App.css';
import { useState } from 'react';
import graph from './components/Graph';
import djikstraAlgorithm from './components/djikstraAlgorithm';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import utils from './components/utils';

function App() {
  const [currentGraph, setCurrentGraph] = useState(graph.createGraph());
  const [showGraph, setShowGraph] = useState(false);
  const [showBestPath, setShowBestPath] = useState(false);
  const [nodes, setNodes] = useState({});
  const [links, setLinks] = useState({});
  const [firstNode, setFirstNode] = useState(0);
  const [lastNode, setLastNode] = useState(0);
  const [bestPath, setBestPath] = useState('');
  const [printGraph, setPrintGraph] = useState('');

  const generateNodes = (graph, qtd) => {
    const nodes = [];
    for (let i = 0; i <= qtd; i++) {
      graph.set(i, []);
      nodes.push({ id: i });
    }
    setNodes(nodes);
  }

  const generateLinks = (currentGraph, qtdNodes, qtdLinks) => {
    const min = 0;
    let qtd = qtdLinks;
    const links = [];


    while (qtd--) {
      const node1 = utils.randomIntFromInterval(min, qtdNodes);
      let node2 = utils.randomIntFromInterval(min, qtdNodes);
      const price = utils.randomIntFromInterval(min + 1, qtdNodes) * 2;

      if (node1 === node2) node2 = utils.randomIntFromInterval(min, qtdNodes);

      if (links.length === 0 || !utils.alreadyExists(links, node1, node2)) {
        links.push({ target: node1, source: node2 });
        graph.addDirectedLink(currentGraph, node1, node2, price);
      }
    }
    setLinks(links);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setBestPath(djikstraAlgorithm(currentGraph, firstNode, lastNode));
    setPrintGraph(graph.printGraph(currentGraph));
  };

  return (
    <>
      {!showGraph ?
        <div>
          <div className="cover">
            <h1 className="cover-title">Grafos 2 - Toll Less</h1>
            <span className="cover-text">
              Micaella Gouveia de Lima 17/0111288
            </span>
            <span className="cover-text">
              Sofia Costa Patrocínio 17/0114333
            </span>
          </div>
          <div className="action">
            <button className="graph-button" type="button" onClick={() => { setShowGraph(true); generateNodes(currentGraph, 10); generateLinks(currentGraph, 10, 30) }}>
              Gerar Grafo
            </button>
          </div>
        </div> : <div className="graph">
          <div className='action'>
            <InteractiveForceGraph
              zoomOptions={{ minScale: 10, maxScale: 15 }}
              zoom
              simulationOptions={{ height: 500, width: 500 }}
            >
              {nodes.map(node => (
                <ForceGraphNode
                  showLabel
                  key={node.id}
                  node={node}
                  fill="red"
                />
              ))}
              {links.map(r => (
                <ForceGraphLink link={{ source: r.source, target: r.target }} />
              ))}
            </InteractiveForceGraph>
          </div>
          <div className="action">
            <button className="graph-button mrg-right-10" type="button" onClick={() => setShowBestPath(true)}>
              Mostrar Caminho Mais Barato
            </button>
          </div>
        </div>
      }
      {showBestPath ?
        <div>
          <form onSubmit={onSubmit}>
            <div className="node">
              <label htmlFor="firstNode">Nó Inicial</label>
              <input type="number" className="node-input" onChange={(e) => setFirstNode(e.target.value)}>
              </input>
              <label htmlFor="lastNode">Nó Final</label>
              <input type="number" className="node-input" onChange={(e) => setLastNode(e.target.value)}>
              </input>
            </div>
            <div className="action">
              <button className="graph-button mrg-top-20" type="submit">
                Buscar
              </button>
            </div>
            {bestPath !== "" ? <div>
              <div className="action mrg-top-20">
                <span className="shortest-path">Melhor Preço: {bestPath}</span>
              </div>
              <div className="action mrg-top-20">
                <span className="shortest-path">Grafo: {printGraph}</span>
              </div>
            </div> : null}
          </form>
        </div>
        : null
      }
    </>
  );
}

export default App;