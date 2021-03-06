// ****** 准备 ******
export function generatGraph(n) {
  // payload plot -> [plot, number]
  let graph = {};

  for (let i = 0; i < n; i++) {
    let adj = {};

    let k = 0;
    while (k < n) {
      if (k !== i && Math.random() < 0.6) {
        if (!graph[k] || !graph[k][i]) {
          adj[k] = ((Math.random() * 100) | 0) + 1;
        }
      }
      k++;
    }

    graph[i] = adj;
  }

  return graph;
}

/** 高效对象方式 */
export class JsDijkstra {
  constructor(graph, start) {
    this.graph = JSON.parse(JSON.stringify(graph));
    this.solutions = {
      // [path, dist]
      [start]: [[], 0]
    };
    this.end = false;
  }

  tick() {
    if (this.end) {
      return this.end;
  }
    let parent = null;
    let nearest = null;
    let dist = Infinity;

    for (let n in this.solutions) {
      if (!this.solutions[n]) continue;
      let ndist = this.solutions[n][1];
      let adj = this.graph[n];
      let visited = [];
      for (let a in adj) {
        if (this.solutions[a]) {
          visited.push(a);
          continue;
        }
        var d = adj[a] + ndist;
        if (d < dist) {
          //reference parent
          parent = this.solutions[n][0];
          nearest = Number(a);
          dist = d;
        }
      }
      if (visited.length) {
        visited.forEach(key => {
          delete this.graph[n][key]
        });
      }
    }

    //no more solutions
    if (dist === Infinity) {
      this.end = true;
      return this.end
    }

    this.solutions[nearest] = [parent.concat(nearest), dist];
    return this.end;
  }

  getAll() {
    let end = this.tick();
    if (end) {
      return this.getResult();
    } else {
      return this.getAll();
    }
  }

  getResult() {
    return this.solutions;
  }
}

JsDijkstra.create = (graph, start) => new JsDijkstra(graph, start);

// 实现
export function js_find_shortest_path(graph, solutions) {
  // var solutions = {};
  // solutions[s] = [];
  // solutions[s].dist = 0;

  var parent = null;
  var nearest = null;
  var dist = Infinity;

  //for each existing solution
  for (var n in solutions) {
    if (!solutions[n]) continue;
    var ndist = solutions[n][1];
    var adj = graph[n];
    for (var a in adj) {
      // 已经产生过结果
      if (solutions[a]) continue;
      var d = adj[a] + ndist;
      if (d < dist) {
        //reference parent
        parent = solutions[n][0];
        nearest = Number(a);
        dist = d;
      }
    }
  }

  //no more solutions
  if (dist === Infinity) {
    return [true, solutions];
  }

  solutions[nearest] = [parent.concat(nearest), dist];

  return [false, solutions];

  // return Object.entries(solutions).reduce((prev, [key, val]) => {
  //   prev[key] = val.dist;
  //   return prev;
  // }, {});
}
// 实现
export function js_find_shortest_path_all(graph, s) {
  var solutions = {};
  solutions[s] = [[], 0];

  while (true) {
    var parent = null;
    var nearest = null;
    var dist = Infinity;

    //for each existing solution
    for (var n in solutions) {
      if (!solutions[n]) continue;
      var ndist = solutions[n][1];
      var adj = graph[n];
      for (var a in adj) {
        // 已经产生过结果
        if (solutions[a]) continue;
        var d = adj[a] + ndist;
        if (d < dist) {
          parent = solutions[n][0];
          nearest = Number(a);
          dist = d;
        }
      }
    }

    //no more solutions
    if (dist === Infinity) {
      break;
    }

    solutions[nearest] = [parent.concat(nearest), dist];
  }
  return solutions;
}
