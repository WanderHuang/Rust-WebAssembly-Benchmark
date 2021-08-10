use std::collections::HashMap;

use js_sys::Date;
use log::{error, info, warn};
use wasm_bindgen::prelude::*;
use wasm_bindgen_console_logger::DEFAULT_LOGGER;

#[wasm_bindgen]
pub fn find_shortest_path(origin: &JsValue, start: i32) -> JsValue {
    log::set_logger(&DEFAULT_LOGGER).unwrap();
    log::set_max_level(log::LevelFilter::Info);

    let graph: HashMap<String, HashMap<String, i32>> = origin.into_serde().unwrap();
    let mut solutions: HashMap<String, Vec<i32>> = HashMap::new();
    let mut dist_map: HashMap<String, i32> = HashMap::new();

    solutions.insert(start.to_string(), Vec::new());
    dist_map.insert(start.to_string(), 0);

    let t0 = Date::now();

    loop {
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

    info!("inner call {}", Date::now() - t0);

    JsValue::from_serde(&dist_map).unwrap()
}
