use std::collections::HashMap;

// use log::{error, info, warn};
use wasm_bindgen::prelude::*;
// use wasm_bindgen_console_logger::DEFAULT_LOGGER;

use crate::time::NativeTimer;
use crate::time::Timer;

#[wasm_bindgen]
pub fn find_shortest_path_simple(origin: &JsValue, size: usize, start: i32) -> JsValue {
    let graph_map: HashMap<i32, HashMap<i32, i32>> = origin.into_serde().unwrap();

    JsValue::from_serde(&find_shortest_path_simple_inner(&graph_map, size, start)).unwrap()
}

pub fn find_shortest_path_simple_inner(
    graph: &HashMap<i32, HashMap<i32, i32>>,
    size: usize,
    start: i32,
) -> HashMap<i32, (Vec<i32>, i32)> {

    let mut solutions: HashMap<i32, (Vec<i32>, i32)> = HashMap::new();

    solutions.insert(start, (Vec::new(), 0));

    loop {
        
        let mut dist = i32::MAX;
        let mut parent = i32::MAX;
        let mut nearest = 0;
        
        // 已访问元素 `start`开始
        for (x, (_, xdist)) in solutions.iter() {
            let adj = graph.get(x).unwrap();
            for (y, weight) in adj.iter() {
                if solutions.contains_key(y) {
                    continue;
                }
                
                let d = weight + xdist;
                if d < dist {
                    dist = d;
                    parent = *x;
                    nearest = *y;
                }
            }
        }
        


        // 找不到更小值了 所有节点都已经访问
        if dist == i32::MAX {
            break;
        }

        let (mut vc, _) = solutions.get(&parent).unwrap().to_owned();
        vc.push(nearest);
        solutions.insert(nearest, (vc, dist));
    }

    solutions
}

#[wasm_bindgen]
pub fn find_shortest_path(origin: &JsValue, start: i32) -> JsValue {
    // log::set_logger(&DEFAULT_LOGGER).unwrap();
    // log::set_max_level(log::LevelFilter::Info);
    // let _timer = Timer::new("find_path");

    let graph: HashMap<String, HashMap<String, i32>> = origin.into_serde().unwrap();
    let mut solutions: HashMap<String, Vec<i32>> = HashMap::new();
    let mut dist_map: HashMap<String, i32> = HashMap::new();

    solutions.insert(start.to_string(), Vec::new());
    dist_map.insert(start.to_string(), 0);

    loop {
        // let _timer = Timer::new("loop once");
        let mut dist = i32::MAX;
        let mut parent = Vec::new();
        let mut nearest: i32 = 0;
        for n in solutions.keys() {
            let ndist = dist_map[n];
            let adj = &graph[n];
            for a in adj.keys() {
                if solutions.contains_key(a) {
                    continue;
                }

                let d = adj[a] + ndist;
                if d < dist {
                    parent = solutions[n].clone();
                    nearest = a.parse::<i32>().unwrap();
                    dist = d;
                }
            }
        }
        if dist == i32::MAX {
            break;
        }

        parent.push(nearest);
        solutions.insert(nearest.to_string(), parent.clone());
        dist_map.insert(nearest.to_string(), dist);
    }

    JsValue::from_serde(&dist_map).unwrap()
}
