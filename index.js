const fs = require("fs");
const path = require("path");

const dijkstra = require("./dijkstra");

const FILE_PATH = path.join(__dirname, "Cities.txt");
const START = 145;
const FINISH = 146;

const main = () => {
  const fileData = fs.readFileSync(FILE_PATH).toString();
  const lines = fileData.split("\n");

  const matrix = lines.map((line) =>
    line.split(";").map((entry) => Number(entry))
  );

  //renaming column headers
  matrix[0] = matrix[0].map((header) => {
    if (header === START) {
      return "start";
    } else if (header === FINISH) {
      return "finish";
    } else {
      return header;
    }
  });
  //renaming row headers
  //starts from the first row with weight data
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] === START) {
      matrix[i][0] = "start";
    } else if (matrix[i][0] === FINISH) {
      matrix[i][0] = "finish";
    }
  }

  const headers = matrix[0].slice(1, matrix.length); // gets all row headers (node names), skipping 0
  var graph = {};
  console.log(headers);
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
  graph.finish = {};

  results = dijkstra(graph);
  console.log(`Início: ${START}
Destino: ${FINISH}
Distância total:${results.distance}
Rota: ${results.path.join(" -> ")}`);
};

main();
