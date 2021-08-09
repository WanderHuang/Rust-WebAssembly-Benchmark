use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};


#[wasm_bindgen]
pub fn find_shortest_path(origin: &JsValue, s: &str) {

	let graph: HashMap<&str, HashMap<&str, i16>> = origin.into_serde().unwrap();
	
    let mut solutions: HashMap<&str, Vec<&str>> = HashMap::new();
    let mut distMap: HashMap<&str, i16> = HashMap::new();

    solutions.insert(s, Vec::new());
    distMap.insert(s, 0);

    loop {
        let mut parent;
        let mut nearest;
        let mut dist = i16::MAX;

        for n in solutions.keys() {
            if !solutions.contains_key(n) {
                continue;
            }
            let ndist = distMap.get(n).unwrap();
            let adj = graph.get(n).unwrap();
            for a in adj.keys() {
                match solutions.get(a) {
					Some(_) => continue,
					None => {
						let d = adj.get(a).unwrap() + ndist;
						if d < dist {
							parent = solutions.get(n).unwrap();
							nearest = a;
							dist = d;
						}
					}
				}

                
            }
            if dist != i16::MAX {
                break;
            }

			parent.push(nearest);
			solutions.insert(nearest, &parent);
			distMap.insert(nearest, dist);
        }
    }

	solutions

}
