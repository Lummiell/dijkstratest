const findLowestWeightNode = (weights, processed) => {
  const knownNodes = Object.keys(weights);

  const lowestWeightNode = knownNodes.reduce((lowest, node) => {
    if (lowest === null && !processed.includes(node)) {
      lowest = node;
    }
    if (weights[node] < weights[lowest] && !processed.includes(node)) {
      lowest = node;
    }
    return lowest;
  }, null);

  return lowestWeightNode;
};

const dijkstra = (graph) => {
  const weights = Object.assign({ finish: Infinity }, graph.start);
  const parents = { finish: null };
  for (let child in graph.start) {
    parents[child] = "start";
  }
  const processed = [];
  let node = findLowestWeightNode(weights, processed);
  while (node) {
    
    let weight = weights[node];
    let children = graph[node];
    for (let n in children) {
      let newWeight = weight + children[n];
      if (!weights[n] || weights[n] > newWeight) {
        weights[n] = newWeight;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = findLowestWeightNode(weights, processed);
  }
  let optimalPath = ["finish"];
  let parent = parents.finish;
  while (parent) {
    
    optimalPath.unshift(parent);
    parent = parents[parent];
  }
  const results = {
    distance: weights.finish,
    path: optimalPath,
  };
  return results;
};

module.exports = dijkstra;
