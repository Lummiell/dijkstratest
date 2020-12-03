const fs = require("fs");
const path = require("path");
const Graph = require("node-dijkstra");

const FILE_PATH = path.join(__dirname, "Cities.txt");
const START = '145';
const FINISH = '146';

const main = () => {
  const fileData = fs.readFileSync(FILE_PATH).toString();
  const lines = fileData.split("\n");

  const matrix = lines.map((line) =>
    line.split(";").map((entry) => Number(entry))
  );

  const headers = matrix[0].slice(1, matrix.length); // gets all row headers (node names), skipping 0
  var graph = {};
  //building graph adjecency list
  for (let i = 0; i < headers.length; i++) {
    const currentVertex = headers[i];
    let currentVertexAdjList = {};
    //starts from the first row with weight data
    for (let j = 1; j < matrix.length; j++) {
      let targetVertexName = matrix[j][0]; //gets the row header, i.e. the target vertex
      let targetVertexWeight = matrix[j][i + 1]; //skips row headers
      if (
        currentVertex !== targetVertexName &&
        targetVertexWeight &&
        targetVertexName !== "start"
      ) {
        currentVertexAdjList[targetVertexName] = targetVertexWeight;
      }
    }
    graph[currentVertex] = currentVertexAdjList;
  }
  const route = new Graph(graph);
  const results = route.path(START, FINISH, { cost: true });
  console.log(`Início: ${START}
Destino: ${FINISH}
Distância total:${results.cost}
Rota: ${results.path.join(" -> ")}`);
  
};

main();
