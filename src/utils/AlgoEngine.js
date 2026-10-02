// Global graph state
export let Node = [];
export let matrix = [];
export let parent = []; 

export function add_node(n) {
  Node.push(n);
  const newSize = Node.length;
  matrix = Array.from({ length: newSize }, (_, r) =>
    Array.from({ length: newSize }, (_, c) => (matrix[r] && matrix[r][c] !== undefined ? matrix[r][c] : 0))
  );
}

export function add_edge(head, tail, weight = 1) {
  const w = parseInt(weight, 10) || 1;
  const h = parseInt(head, 10);
  const t = parseInt(tail, 10);

  if (matrix[h] && matrix[t]) {
    matrix[h][t] = w;
    matrix[t][h] = w;
  }
}

export function clear_graph_data() {
  Node.length = 0;
  matrix = [];
  parent = [];
}

export function runBFS(start, destination = null) {
  const max = Node.length - 1;
  if (max < 0) return [];

  const q = [];
  const visited = new Array(1000).fill(0);
  parent = new Array(Node.length).fill(-1);

  const display = [];
  const steps = [];

  q.push(start);
  visited[start] = 1;

  steps.push({
    current: start,
    visited: [...display],
    structure: [...q],
    path: [],
    log: `q.push(${start}); visited[${start}] = 1;`,
  });

  while (q.length > 0) {
    const x = q[0];
    display.push(x);
    q.shift();

    steps.push({
      current: x,
      visited: [...display],
      structure: [...q],
      path: destination !== null ? getShortestPath(x) : [],
      log: `x = q.front() [${x}]; display.push_back(${x}); q.pop();`,
    });

    if (destination !== null && x === destination) {
      steps.push({
        current: x,
        visited: [...display],
        structure: [...q],
        path: getShortestPath(destination),
        log: ` BFS Done :Target Node ${destination} Reached!`,
      });
      break;
    }

    for (let i = 0; i <= max; i++) {
      if (!visited[i] && matrix[x] && matrix[x][i] > 0) {
        q.push(i);
        visited[i] = 1;
        parent[i] = x;

        steps.push({
          current: i,
          visited: [...display],
          structure: [...q],
          path: destination !== null ? getShortestPath(i) : [],
          log: `matrix[${x}][${i}] exists -> q.push(${i}); visited[${i}] = 1;`,
        });
      }
    }
  }

  return steps;
}


// Helper: Min node picker
function min(dist, visited) {
  let Min = Math.floor(Number.MAX_SAFE_INTEGER / 2);
  let node = -1;
  for (let i = 0; i < dist.length; i++) {
    if (!visited[i] && dist[i] < Min) {
      Min = dist[i];
      node = i;
    }
  }
  return node;
}

// Shortest Path reconstructor helper function
export function getShortestPath(destination) {
  const path = [];
  let curr = destination;

  while (curr !== -1 && curr !== undefined) {
    path.push(curr);
    curr = parent[curr];
  }

  return path.reverse(); 
}

export function runDijkstra(source, destination = null) {
  const n = Node.length;
  if (n === 0) return [];

  const visited = new Array(n).fill(0);
  const dist = new Array(n).fill(Math.floor(Number.MAX_SAFE_INTEGER / 2));
  

  parent = new Array(n).fill(-1);

  dist[source] = 0;
  parent[source] = -1; 

  let count = 0;
  const steps = [];
  const displayVisited = [];

  steps.push({
    current: source,
    visited: [...displayVisited],
    structure: dist.map((d, idx) => `Node ${idx}: ${d >= Math.floor(Number.MAX_SAFE_INTEGER / 4) ? '∞' : d}`),
    path: [],
    log: `Initialized dist[] & parent[]. Set dist[${source}] = 0, parent[${source}] = -1.`,
  });

  while (count !== n) {
    const node = min(dist, visited);

    if (node === -1) break;

    visited[node] = 1;
    displayVisited.push(node);
    count++;

    steps.push({
      current: node,
      visited: [...displayVisited],
      structure: dist.map((d, idx) => `Node ${idx}: ${d >= Math.floor(Number.MAX_SAFE_INTEGER / 4) ? '∞' : d}`),
      path: destination !== null ? getShortestPath(node) : [],
      log: `node = min(dist, visited) [${node}]; visited[${node}] = 1; count++ (${count});`,
    });

    for (let i = 0; i < n; i++) {

      if (matrix[node] && matrix[node][i] > 0) {
        const weight = matrix[node][i];
        if (dist[node] + weight < dist[i]) {
          dist[i] = dist[node] + weight;
          parent[i] = node; 

          steps.push({
            current: i,
            visited: [...displayVisited],
            structure: dist.map((d, idx) => `Node ${idx}: ${d >= Math.floor(Number.MAX_SAFE_INTEGER / 4) ? '∞' : d}`),
            path: destination !== null ? getShortestPath(i) : [],
            log: `Relaxation: matrix[${node}][${i}] = ${weight} -> dist[${i}] = ${dist[i]}, parent[${i}] = ${node}`,
          });
        }
      }
    }
  }

  const finalPath = destination !== null ? getShortestPath(destination) : [];

  steps.push({
    current: null,
    visited: [...displayVisited],
    structure: dist.map((d, idx) => `Node ${idx}: ${d >= Math.floor(Number.MAX_SAFE_INTEGER / 4) ? '∞' : d}`),
    path: finalPath,
    log: `Dijkstra Completed! Final Shortest Path: ${finalPath.join(' -> ')}`,
  });

  return steps;
}


export function runDFS(start, destination = null) {
  const max = Node.length - 1;
  if (max < 0) return [];

  const Stack = [];
  const visited = new Array(1001).fill(0);

  const display = [];
  const steps = [];

  Stack.push(start);
  visited[start] = 1;

  steps.push({
    current: start,
    visited: [...display],
    structure: [...Stack],
    log: `Stack.push(${start}); visited[${start}] = 1;`,
  });

  while (Stack.length > 0) {
    const x = Stack[Stack.length - 1];
    display.push(x);

    steps.push({
      current: x,
      visited: [...display],
      structure: [...Stack],
      log: `x = Stack.top() [${x}];`,
    });

    if (destination !== null && x === destination) {
      steps.push({
        current: x,
        visited: [...display],
        structure: [...Stack],
        log: `Target Node ${destination} Found!`,
      });
      break;
    }

    for (let i = 0; i <= max; i++) {
      if ( matrix[x][i] > 0 && visited[i] === 0 ) {
        Stack.push(i);
        visited[i] = 1;

        steps.push({
          current: i,
          visited: [...display],
          structure: [...Stack],
          log: `matrix[${x}][${i}] exists -> Stack.push(${i}); visited[${i}] = 1;`,
        });
      }
    }

    Stack.pop();
  }

  return steps;
}


