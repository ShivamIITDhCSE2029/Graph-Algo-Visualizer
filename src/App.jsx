import React, { useState } from 'react';
import Controls from './components/Controls';
import GraphCanvas from './components/GraphCanvas';
import ConsolePanel from './components/ConsolePanel';
import { runBFS,runDFS, runDijkstra, clear_graph_data } from './utils/AlgoEngine.js';
import './App.css';

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [mode, setMode] = useState('node');
  const [selectedAlgo, setSelectedAlgo] = useState('bfs');
  const [selectedNode, setSelectedNode] = useState(null);
  const [speed, setSpeed] = useState(500);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const [startNode, setStartNode] = useState(0);
  const [targetNode, setTargetNode] = useState(null);

  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState('');
  const [structureState, setStructureState] = useState([]);
  const [visitedList, setVisitedList] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);

  const handleStartVisualization = () => {
    if (nodes.length === 0) {
      alert('Pehle Canvas par Nodes bana le bhai!');
      return;
    }

    const start = startNode !== null ? startNode : 0;
    const dest = targetNode !== null ? targetNode : null;

    setIsVisualizing(true);
    setLogs([]);
    setVisitedList([]);

    // Explicit Algo Selection Call
    let steps = [];
    if (selectedAlgo === 'dijkstra' || selectedAlgo === 'pathfinding') {
      steps = runDijkstra(start, dest);
    } 
    else if(selectedAlgo === 'dfs')
        steps = runDFS(start,dest) ;
    
    else {
      steps = runBFS(start, dest);
    }


if (!steps || steps.length === 0) {
      setIsVisualizing(false);
      return;
    }


let index = 0;
    const interval = setInterval(() => {
      if (index >= steps.length) {
        clearInterval(interval);
        setIsVisualizing(false);
        setCurrentStep('FINISHED');
        setActiveNodeId(null);

        // Pathfinding Mode me animation khatam hone par path highlight karo
        const lastStep = steps[steps.length - 1];
        if (selectedAlgo === 'pathfinding' && lastStep && lastStep.path) {
          setShortestPath(lastStep.path);
        }
        return;
      }

      const step = steps[index];
      setActiveNodeId(step.current);
      setVisitedList(step.visited || []);
      setStructureState(step.structure || []);
      setLogs((prev) => [...prev, step.log]);
      setCurrentStep(`STEP ${index + 1}/${steps.length}`);

      index++;
    }, speed);
  };

  const handleClearGraph = () => {
    clear_graph_data();
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setStartNode(null);
    setTargetNode(null);
    setIsVisualizing(false);
    setLogs([]);
    setCurrentStep('');
    setStructureState([]);
    setVisitedList([]);
    setActiveNodeId(null);
  };

  return (
    <div className="app-container">
      <Controls
        mode={mode}
        setMode={setMode}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        speed={speed}
        setSpeed={setSpeed}
        isVisualizing={isVisualizing}
        onStart={handleStartVisualization}
        onClear={handleClearGraph}
      />

      <GraphCanvas
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        setEdges={setEdges}
        mode={mode}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        activeNodeId={activeNodeId}
        visitedList={visitedList}
        startNode={startNode}
        setStartNode={setStartNode}
        targetNode={targetNode}
        setTargetNode={setTargetNode}
      />

      <ConsolePanel
        logs={logs}
        currentStep={currentStep}
        structureState={structureState}
        visitedList={visitedList}
      />
    </div>
  );
}