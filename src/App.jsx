import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/customNodes";
import { data } from "autoprefixer";
import Sidebar from "./components/Sidebar";

const nodeTypes = {
  custom: CustomNode
}
const edgeStyle = {
  strokeWidth: 9,
  stroke: '#d9d9d9',
  borderRadius: "100%",
  strokeLinecap: "round",
  zIndex: 100,
}

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: -100, y: -100 },
    data: { label: "roller" }
  },
  {
    id: '2',
    type: "custom",
    position: { x: 100, y: 100 },
    data: { label: "pinned" }
  },
  {
    id: '3',
    type: "custom",
    position: { x: -100, y: 100 },
    data: { label: "fixed" }
  },
  {
    id: '4',
    type: "custom",
    position: { x: -100, y: 200 },
    data: { label: "simple" }
  },
];





let id = 5;
const getId = () => `${id++}`;



export default function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ type: 'straight', style: edgeStyle, ...params }, eds)),
    [],
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = {x: 0, y:0}
      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );



  return (
    <div className="dndflow h-screen w-screen relative">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>


          <ReactFlow
            fitView
            className=" w-full h-screen absolute"
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls
              className="flex flex-col p-3 rounded-[10px] bg-white"
              position="top-right"
            />
            <MiniMap zoomable pannable className="h-[120px]" />
            <Background color="#dee2e6" gap={18} variant={BackgroundVariant.Dots} size={2} />


          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

