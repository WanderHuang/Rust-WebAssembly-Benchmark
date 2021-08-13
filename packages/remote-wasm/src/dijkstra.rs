use std::collections::HashMap;

// use log::{error, info, warn};
use wasm_bindgen::prelude::*;
// use wasm_bindgen_console_logger::DEFAULT_LOGGER;

use crate::time::Timer;

#[wasm_bindgen]
pub fn find_shortest_path_simple(origin: &JsValue, start: i32) -> JsValue {
    let graph: HashMap<i32, HashMap<i32, i32>> = origin.into_serde().unwrap();
    let mut solutions: HashMap<i32, Vec<i32>> = HashMap::new();
    let mut dist_map: HashMap<i32, i32> = HashMap::new();

    solutions.insert(start, Vec::new());
    dist_map.insert(start, 0);

    loop {
        let mut dist = i32::MAX;
        let mut parent = Vec::new();
        let mut nearest: i32 = 0;
        for (n, vc) in solutions.iter() {
            let ndist = dist_map[n];
            let adj = &graph[n];
            for (a, vc2) in adj.iter() {
                if solutions.contains_key(a) {
                    continue;
                }

                let d = vc2 + ndist;
                if d < dist {
                    parent = vc.to_vec();
                    nearest = *a;
                    dist = d;
                }
            }
        }
        if dist == i32::MAX {
            break;
        }

        parent.push(nearest);
        solutions.insert(nearest, parent.clone());
        dist_map.insert(nearest, dist);
    }
    
    JsValue::from_serde(&dist_map).unwrap()
}


#[wasm_bindgen]
pub fn find_shortest_path(origin: &JsValue, start: i32) -> JsValue {
    // log::set_logger(&DEFAULT_LOGGER).unwrap();
    // log::set_max_level(log::LevelFilter::Info);
    let _timer = Timer::new("find_path");

    let graph: HashMap<String, HashMap<String, i32>> = origin.into_serde().unwrap();
    let mut solutions: HashMap<String, Vec<i32>> = HashMap::new();
    let mut dist_map: HashMap<String, i32> = HashMap::new();

    solutions.insert(start.to_string(), Vec::new());
    dist_map.insert(start.to_string(), 0);

    loop {
        let _timer = Timer::new("loop once");
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
