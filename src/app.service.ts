import { Injectable } from '@nestjs/common';
import dijkstra, {
  findPath,
  findPathWithCost,
} from '../node_modules/modern-dijkstra';

@Injectable()
export class AppService {
  getHello(): string {
    const graph = {
      a: { b: 1, d: 1 },
      b: { a: 1, c: 1, e: 1 },
      c: { b: 1, f: 1 },
      d: { a: 1, e: 1, g: 1 },
      e: { b: 1, d: 1, f: 1, h: 1 },
      f: { c: 1, e: 1, i: 1 },
      g: { d: 1, h: 1 },
      h: { e: 1, g: 1, i: 1 },
      i: { f: 1, h: 1 },
    };
    const path = findPath(graph, 'a', 'i');
    return path;
  }
}
