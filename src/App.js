import './App.css';
import { useState } from 'react';
import GraphModel from './components/Graph';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import utils from './components/utils';

function App() {
  const [showGraph, setShowGraph] = useState(false);
  const [showBestPath, setShowBestPath] = useState(false);
  const currentGraph = new GraphModel(100);
  const [nodes, setNodes] = useState({});
  const [links, setLinks] = useState({});

  const generateNodes = (graph, qtd) => {
    const nodes = [];
    for (let i = 0; i <= qtd; i++) {
      graph.listAdj.set(i, []);
      nodes.push({ id: i });
    }
    setNodes(nodes);
  }

  const generateLinks = (graph, qtdNodes, qtdLinks) => {
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
        graph.addDirectedLink(node1, node2, price);
      }
    }
    setLinks(links);
  }

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
            <button className="graph-button" type="button" onClick={() => {setShowGraph(true); generateNodes(currentGraph, 10); generateLinks(currentGraph, 10, 30)}}>
              Gerar Grafo
            </button>
          </div>
        </div> : <div className="graph">
            <div className='action'>
              <InteractiveForceGraph
                simulationOptions={{ height: 500, width: 500 }}
              // onSelectNode={(node) => console.log(node)}
              >
                {nodes.map(node => (
                  <ForceGraphNode
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
    </>
  );
}

export default App;