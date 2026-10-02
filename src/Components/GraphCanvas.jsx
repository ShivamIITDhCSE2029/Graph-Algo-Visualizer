import React from 'react';
import { add_node, add_edge } from '../utils/algoEngine';

export default function GraphCanvas({
  nodes,
  setNodes,
  edges,
  setEdges,
  mode,
  selectedNode,
  setSelectedNode,
  activeNodeId,
  visitedList,
  startNode,
  setStartNode,
  targetNode,
  setTargetNode,
  shortestPath = []
}) {
  const handleCanvasClick = (e) => {
    if (mode !== 'node') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNodeId = nodes.length;
    add_node(newNodeId);

    if (startNode === null) setStartNode(newNodeId);

    setNodes((prev) => [...prev, { id: newNodeId, x, y }]);
  };

  const handleNodeClick = (e, nodeId) => {
    e.stopPropagation();

    if (mode === 'edge') {
      if (selectedNode === null) {
        setSelectedNode(nodeId);
      } else if (selectedNode !== nodeId) {
        const exists = edges.some(
          (edge) =>
            (edge.from === selectedNode && edge.to === nodeId) ||
            (edge.from === nodeId && edge.to === selectedNode)
        );

        if (!exists) {
          const weightInput = prompt(`Edge weight (Node ${selectedNode} -> Node ${nodeId}):`, '1');
          const weight = parseInt(weightInput, 10) || 1;

          add_edge(selectedNode, nodeId, weight);
          setEdges((prev) => [...prev, { from: selectedNode, to: nodeId, weight }]);
        }
        setSelectedNode(null);
      }
    }
  };

  const handleNodeContextMenu = (e, nodeId) => {
    e.preventDefault();
    e.stopPropagation();

    if (startNode === nodeId) {
      setStartNode(null);
      setTargetNode(nodeId);
    } else if (targetNode === nodeId) {
      setTargetNode(null);
    } else if (startNode === null) {
      setStartNode(nodeId);
    } else {
      setTargetNode(nodeId);
    }
  };

  // Edge Path Highlight Checker
  const isEdgeInPath = (u, v) => {
    if (!shortestPath || shortestPath.length < 2) return false;
    for (let i = 0; i < shortestPath.length - 1; i++) {
      if (
        (shortestPath[i] === u && shortestPath[i + 1] === v) ||
        (shortestPath[i] === v && shortestPath[i + 1] === u)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      className="canvas-wrapper"
      onClick={handleCanvasClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg className="svg-canvas">
        {/* Draw Edges */}
        {edges.map((edge, index) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          const isHighlighted = isEdgeInPath(edge.from, edge.to);

          return (
            <g key={index}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={`edge-line ${isHighlighted ? 'path-highlight' : ''}`}
              />
              <circle
                cx={midX}
                cy={midY}
                r="12"
                fill="#1e293b"
                stroke={isHighlighted ? '#06b6d4' : '#38bdf8'}
                strokeWidth={isHighlighted ? '2' : '1'}
              />
              <text
                x={midX}
                y={midY}
                fill={isHighlighted ? '#06b6d4' : '#38bdf8'}
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Draw Nodes */}
        {nodes.map((node) => {
          const isVisiting = activeNodeId === node.id;
          const isVisited = visitedList && visitedList.includes(node.id);
          const isSelected = selectedNode === node.id;
          const isStart = startNode === node.id;
          const isTarget = targetNode === node.id;
          const isPathNode = shortestPath.includes(node.id);

          let nodeClass = 'node-circle';
          if (isPathNode) nodeClass += ' path-node';
          else if (isStart) nodeClass += ' start-node';
          else if (isTarget) nodeClass += ' target-node';
          else if (isVisiting) nodeClass += ' visiting';
          else if (isVisited) nodeClass += ' visited';
          else if (isSelected) nodeClass += ' selected';

          return (
            <g
              key={node.id}
              className="node-group"
              onClick={(e) => handleNodeClick(e, node.id)}
              onContextMenu={(e) => handleNodeContextMenu(e, node.id)}
            >
              <circle cx={node.x} cy={node.y} r="20" className={nodeClass} />
              <text x={node.x} y={node.y} className="node-text">
                {isStart ? `S (${node.id})` : isTarget ? `T (${node.id})` : node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}