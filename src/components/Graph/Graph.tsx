import { Film, Hero, Starship } from '@/types/types';
import { createNodesAndEdges } from '@/utils/createNodesAndEdges';
import React from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';


type GraphProps = {
  hero: Hero;
  films: Film[];
  starships: Starship[];
};

const Graph: React.FC<GraphProps> = ({ hero, films, starships }) => {
  const { nodes, edges } = createNodesAndEdges(hero, films, starships);

  return (
    <div className='h-screen w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        maxZoom={1.5}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Graph;