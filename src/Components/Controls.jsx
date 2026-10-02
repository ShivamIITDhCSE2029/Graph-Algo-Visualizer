import React from 'react';
import { 
  CirclePlus, 
  Share2, 
  MousePointer, 
  Trash2, 
  Play, 
  RotateCcw, 
  FastForward, 
  Pause 
} from 'lucide-react';

export default function Controls({
  mode,
  setMode,
  selectedAlgo,
  setSelectedAlgo,
  speed,
  setSpeed,
  isVisualizing,
  onStart,
  onClear,
}) {
  return (
    <header className="controls-header">
      {/* 1. Project Title */}
      <div className="brand">
        <div className="brand-icon">G</div>
        <h2>GraphViz<span>.io</span></h2>
      </div>

      <div className="divider" />

      {/* 2. Interactive Editing Modes */}
      <div className="button-group">
        <button
          className={`mode-btn ${mode === 'node' ? 'active' : ''}`}
          onClick={() => setMode('node')}
          disabled={isVisualizing}
          title="Click on canvas to place nodes"
        >
          <CirclePlus size={18} />
          <span>Add Node</span>
        </button>

        <button
          className={`mode-btn ${mode === 'edge' ? 'active' : ''}`}
          onClick={() => setMode('edge')}
          disabled={isVisualizing}
          title="Click two nodes to connect them"
        >
          <Share2 size={18} />
          <span>Add Edge</span>
        </button>

        <button
          className={`mode-btn ${mode === 'move' ? 'active' : ''}`}
          onClick={() => setMode('move')}
          disabled={isVisualizing}
          title="Drag nodes around"
        >
          <MousePointer size={18} />
          <span>Move</span>
        </button>
      </div>

      <div className="divider" />

      {/* 3. Algorithm Selection */}
      <div className="algo-selector">
        <label htmlFor="algo-select">Algorithm:</label>
        <select
          id="algo-select"
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          disabled={isVisualizing}
        >
          <option value="bfs">Breadth-First Search (BFS)</option>
          <option value="dfs">Depth-First Search (DFS)</option>
          <option value="dijkstra">Dijkstra's Shortest Path</option>
          <option value="pathfinding">A* Pathfinding</option>
        </select>
      </div>

      <div className="divider" />

      {/* 4. Speed Controller Slider */}
      <div className="speed-control">
        <FastForward size={16} />
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isVisualizing}
        />
        <span>{speed}ms</span>
      </div>

      <div className="divider" />

      {/* 5. Execution & Clear Action Buttons */}
      <div className="action-buttons">
        <button
          className="btn-primary"
          onClick={onStart}
          disabled={isVisualizing}
        >
          <Play size={18} />
          <span>Visualize</span>
        </button>

        <button
          className="btn-danger"
          onClick={onClear}
          disabled={isVisualizing}
          title="Clear all nodes and edges"
        >
          <RotateCcw size={18} />
          <span>Clear</span>
        </button>
      </div>
    </header>
  );
}