// ****** 准备 ******
function generatGraph(n) {
  // payload plot -> [plot, number]
  let graph = {};

  for (let i = 0; i < n; i++) {
    if (!graph[i]) {
      graph[i] = {};
    }
    for (let k = 0; k < n; k++) {
      if (k !== i && Math.random() < 0.6) {
        if (!graph[k] || !graph[k][i]) {
          let rand = ((Math.random() * 100) | 0) + 1;
          if (!graph[i]) {
            graph[i] = {};
          } else if (!graph[k]) {
            graph[k] = {};
          }

          graph[i][k] = rand;
          graph[k][i] = rand;
          
        }
      }
    }
  }

  return graph;
}

// 实现
function js_find_shortest_path(graph, s) {
  var solutions = {};
  solutions[s] = [];
  solutions[s].dist = 0;

  while (true) {
    var parent = null;
    var nearest = null;
    var dist = Infinity;

    // console.log(">>>>", solutions);
    //for each existing solution
    for (var n in solutions) {
      if (!solutions[n]) {
        console.log(">>>>", solutions[n])
        continue;
      }
      var ndist = solutions[n].dist;
      var adj = graph[n];
      //for each of its adjacent nodes...
      for (var a in adj) {
        //without a solution already...
        if (solutions[a]) continue;
        //choose nearest node with lowest *total* cost
        var d = adj[a] + ndist;
        if (d < dist) {
          //reference parent
          parent = JSON.parse(JSON.stringify(solutions[n]));
          nearest = a;
          dist = d;
          console.log("update nearest", a, d)
        }
      }
    }

    //no more solutions
    if (dist === Infinity) {
      break;
    }

    //extend parent's solution path
    solutions[nearest] = parent.concat(nearest);
    //extend parent's cost
    solutions[nearest].dist = dist;
    console.log(`${s} to ${nearest} >>`, solutions[nearest], solutions[nearest].dist)
  }

  // return Object.entries(solutions).reduce((prev, [key, val]) => {
  //   prev[key] = val.dist;
  //   return prev;
  // }, {});
  return solutions;
}
//create graph
// var graph = {};

// var layout = {
//   'R': ['2'],
//   '2': ['3','4'],
//   '3': ['4','6','13'],
//   '4': ['5','8'],
//   '5': ['7','11'],
//   '6': ['13','15'],
//   '7': ['10'],
//   '8': ['11','13'],
//   '9': ['14'],
//   '10': [],
//   '11': ['12'],
//   '12': [],
//   '13': ['14'],
//   '14': [],
//   '15': []
// }

//convert uni-directional to bi-directional graph
// needs to look like: where: { a: { b: cost of a->b }
// var graph = {
//     a: {e:1, b:1, g:3},
//     b: {a:1, c:1},
//     c: {b:1, d:1},
//     d: {c:1, e:1},
//     e: {d:1, a:1},
//     f: {g:1, h:1},
//     g: {a:3, f:1},
//     h: {f:1}
// };

// for(var id in layout) {
//   if(!graph[id])
//     graph[id] = {};
//   layout[id].forEach(function(aid) {
//     graph[id][aid] = 1;
//     if(!graph[aid])
//       graph[aid] = {};
//     graph[aid][id] = 1;
//   });
// }
let graph = generatGraph(50);
console.log(graph);

//choose start node
//get all solutions
// let graph = generatGraph(1000);
let start = Date.now();
var solutions = js_find_shortest_path(graph, 0);
let end = Date.now();

// display solutions
console.log("From '"+0+"' to");
for(var s in solutions) {
  if(!solutions[s]) continue;
  console.log(" -> " + s + ": [" + solutions[s].join(", ") + "]   (dist:" + solutions[s].dist + ")");
}
// console.log({3: {0: 7, 5: 89, 8: 47, 9: 11, 6: 54, 1: 26, 7: 67, 2: 33}, 2: {0: 29, 9: 38, 3: 33, 1: 45, 8: 72, 5: 45, 4: 58, 7: 41, 6: 39}, 0: {4: 91, 8: 11, 7: 48, 9: 27, 6: 80, 5: 79, 3: 7, 2: 29}, 7: {2: 41, 6: 82, 3: 67, 0: 48, 1: 94, 4: 55, 5: 47, 8: 28}, 8: {3: 47, 1: 26, 7: 28, 5: 14, 9: 76, 4: 42, 2: 72, 6: 77, 0: 11}, 6: {9: 56, 0: 80, 3: 54, 4: 21, 1: 38, 5: 37, 7: 82, 2: 39, 8: 77}, 9: {1: 55, 2: 38, 3: 11, 0: 27, 4: 50, 8: 76, 6: 56, 5: 71}, 4: {9: 50, 8: 42, 7: 55, 0: 91, 1: 39, 2: 58, 6: 21, 5: 11}, 5: {6: 37, 8: 14, 9: 71, 4: 11, 0: 79, 3: 89, 2: 45, 1: 8, 7: 47}, 1: {4: 39, 3: 26, 7: 94, 5: 8, 9: 55, 2: 45, 6: 38, 8: 26}})
console.log('time >', end - start);

// From '10' to
//  -> 2: [7, 5, 4, 2]   (dist:4)
//  -> 3: [7, 5, 4, 3]   (dist:4)
//  -> 4: [7, 5, 4]   (dist:3)
//  -> 5: [7, 5]   (dist:2)
//  -> 6: [7, 5, 4, 3, 6]   (dist:5)
//  -> 7: [7]   (dist:1)
//  -> 8: [7, 5, 4, 8]   (dist:4)
//  -> 9: [7, 5, 4, 3, 13, 14, 9]   (dist:7)
//  -> 10: []   (dist:0)
//  -> 11: [7, 5, 11]   (dist:3)
//  -> 12: [7, 5, 11, 12]   (dist:4)
//  -> 13: [7, 5, 4, 3, 13]   (dist:5)
//  -> 14: [7, 5, 4, 3, 13, 14]   (dist:6)
//  -> 15: [7, 5, 4, 3, 6, 15]   (dist:6)
//  -> R: [7, 5, 4, 2, R]   (dist:5)
