import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  BackgroundVariant,
  applyNodeChanges, 
  applyEdgeChanges,
  addEdge
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/customNodes";
import { data } from "autoprefixer";

const nodeTypes = {
  custom: CustomNode
}
const edgeStyle = {
  strokeWidth: 9,
  stroke: '#d9d9d9',
  borderRadius: "100%"
}

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {label: "roller"}
  },
  {
    id: '2',
    type: "custom",
    position: { x: 100, y: 100 },
    data: {label: "pinned"}
  },
  {
    id: '3',
    type: "custom",
    position: { x: -100, y: 100 },
    data: {label: "fixed"}
  },
  {
    id: '4',
    type: "custom",
    position: { x: -100, y: 200 },
    data: {label: "simple"}
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'straight' },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState([])
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({type: 'straight', style: edgeStyle, ...params}, eds)),
    [],
  );



  return (
    <ReactFlow
      fitView
      className=" w-screen h-screen absolute"
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}

    >
      <Controls
        className="flex flex-col p-3 rounded-[10px] bg-white"
      />
      <MiniMap zoomable pannable className="h-[120px]" />
      <Background color="#dee2e6" gap={18} variant={BackgroundVariant.Dots} size={2} />


    </ReactFlow>
  );
};

