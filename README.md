# GraphViz.io — Interactive Graph Algorithm Visualizer

Live Demo: https://graph-algo-visualizer-admz.vercel.app

An interactive, web-based graph algorithm visualizer designed to demonstrate core pathfinding and traversal algorithms (BFS, DFS, Dijkstra) with real-time state visualization, step-by-step execution logs, and customizable graph topology.

---

## Key Features

- **Interactive Canvas Editor:**
  - **Add Nodes & Edges:** Seamlessly create weighted/unweighted graph layouts.
  - **Drag & Reposition:** Custom node placement for complex graph structures.
  - **Start & Target Node Selectors:** Clearly defined source (S) and target (T) identifiers.

- **Algorithms Supported:**
  - **Breadth-First Search (BFS):** Unweighted shortest path traversal using queue operations.
  - **Depth-First Search (DFS):** Complete graph exploration using stack recursion logic.
  - **Dijkstra's Algorithm:** Weighted shortest path pathfinding with real-time edge relaxation logging.

- **Real-Time Visuals & Execution Console:**
  - **Neon Path Highlighting:** Dynamic visual indication for active nodes, visited sets, and final shortest paths.
  - **Live State Tracking:** Step-by-step tracking of active Queue/Stack contents and Visited Node Sets.
  - **Detailed Logs:** Step-by-step edge relaxation formulas and distance updates.
  - **Speed & Control:** Adjustable execution delay (ms) with play/pause/step functionality.

---

## Tech Stack

- **Frontend Framework:** React.js (Bootstrapped with Vite)
- **Styling:** CSS3 / Custom Modular CSS (Dark Theme with Neon Accents)
- **State Management:** React Hooks (useState, useEffect, useRef)
- **Deployment:** Vercel CI/CD Pipeline

---

## Getting Started Locally

Follow these steps to run the project locally on your machine:

### Prerequisites

Ensure you have Node.js (v16+ recommended) and npm installed.

### Installation

1. Clone the Repository:
   ```bash
   git clone [https://github.com/ShivamIITDhCSE2029/graph-algo-visualizer.git](https://github.com/ShivamIITDhCSE2029/graph-algo-visualizer.git)
   cd graph-algo-visualizer