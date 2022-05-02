import { Injectable } from '@nestjs/common';
import { DijkstraCalculator } from 'dijkstra-calculator';

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
  }): { path: number[][] } {
    const boardSize = gameConfig.board.length;

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
    return { path: path };
  }
}
