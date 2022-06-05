import { Injectable } from '@nestjs/common';
import { DijkstraCalculator } from 'dijkstra-calculator';

const AstarModule = require('../node_modules/js-astar')

@Injectable()
export class AppService {
  formatStringCell(col: number, row: number): string {
    return col + ',' + row;
  }

  formatNumberCell(stringCell: string): number[] {
    return stringCell.split(',').map((str) => +str);
  }

  getPathForGameConfig(gameConfig: {
    board: number[][];
    start: number[];
    stop: number[];
    algoId: number;
  }): { path: number[][] } {
    const boardSize = gameConfig.board.length;
    if (gameConfig.algoId == 0){
      const graph = new DijkstraCalculator();
      for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        for (let colIndex = 0; colIndex < boardSize; colIndex++) {
          graph.addVertex(this.formatStringCell(colIndex, rowIndex));
        }
      }
      for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        for (let colIndex = 0; colIndex < boardSize; colIndex++) {
          const currentVertex = this.formatStringCell(colIndex, rowIndex);
          if (colIndex > 0) {
            const leftVertex = this.formatStringCell(colIndex - 1, rowIndex);
            graph.addEdge(
              currentVertex,
              leftVertex,
              gameConfig.board[rowIndex][colIndex - 1],
            );
          }
          if (rowIndex > 0) {
            const overVertex = this.formatStringCell(colIndex, rowIndex - 1);
            graph.addEdge(
              currentVertex,
              overVertex,
              gameConfig.board[rowIndex - 1][colIndex],
            );
          }
        }
      }
      const path = graph
        .calculateShortestPath(
          this.formatStringCell(gameConfig.start[0], gameConfig.start[1]),
          this.formatStringCell(gameConfig.stop[0], gameConfig.stop[1]),
        )
        .map((str) => this.formatNumberCell(str));
      console.log();
      
      return { path: path.reverse() };
    }
    else if(gameConfig.algoId == 1){
      let path = [];
      path.push(gameConfig.start);
      var graph = new AstarModule.Graph(gameConfig.board);
        var start = graph.grid[gameConfig.start[0]][gameConfig.start[1]];
        var end = graph.grid[gameConfig.stop[0]][gameConfig.stop[1]];
        var result = AstarModule.astar.search(graph, start, end);
        result.forEach(element => {
          // console.log(element["x"], element["y"]);
          path.push([element["y"], element["x"]])
        });
        console.log(path);
        
        return { path: path };
      }
    else{
      console.log("err");
      return undefined;
    }
  }
}
