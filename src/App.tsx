import ReactFlow, {addEdge, Background, Connection, ConnectionMode, Controls, Node, useEdgesState, useNodesState} from 'reactflow';
import { zinc } from 'tailwindcss/colors'
import * as Toolbar from '@radix-ui/react-toolbar'
import 'reactflow/dist/style.css';

import { Square } from './components/nodes/Square';
import { useCallback } from 'react';
import DefaultEdge from './edges/DefaultEdges';

const NODE_TYPES = {
  square: Square,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [] satisfies Node[]

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  function addSquareNode(){
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 600,
          y: 200,
        },
        data: {}
      }
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edgeTypes={EDGE_TYPES}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} 
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background
          gap={12}
          size={2}
          color={zinc[300]}
        />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className='fixed bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
        <Toolbar.Button 
          onClick={addSquareNode}
          className='w-32 h-32 bg-green-900 mt-4 rounded transition-transform hover:-translate-y-2' 
        />
      </Toolbar.Root>
    </div>
  )
}

export default App
