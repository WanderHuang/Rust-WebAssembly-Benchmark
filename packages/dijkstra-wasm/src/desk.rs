use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct  Desk {
	graph: HashMap<i32, HashMap<i32, i32>>,
	solutions: HashMap<i32, (Vec<i32>, i32)>,
	end: bool,
}

#[wasm_bindgen]
impl Desk {
	pub fn new(origin: &JsValue, start: i32) -> Desk {
		let mut graph: HashMap<i32, HashMap<i32, i32>> = origin.into_serde().unwrap();
		let mut solutions = HashMap::new();
		solutions.insert(start, (Vec::new(), 0));
		Desk {
			graph,
			solutions,
			end: false,
		}
	}

	pub fn get_all(&mut self) -> JsValue {
		let res = self.tick();
		if res {
			self.get_result()
		} else {
			self.get_all()
		}
	}
	

	pub fn tick(&mut self) -> bool {
		if self.end {
			return self.end;
		}

		let mut dist = i32::MAX;
		let mut parent = i32::MAX;
		let mut nearest = 0;
		
		// 已访问元素 `start`开始
		for (x, (_, xdist)) in self.solutions.iter() {
			let adj = self.graph.get(x).unwrap();
			for (y, weight) in adj.iter() {
				if self.solutions.contains_key(y) {
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
			self.end = true;
			return self.end;
		}
	
		let (mut vc, _) = self.solutions.get(&parent).unwrap().to_owned();
		vc.push(nearest);
		self.solutions.insert(nearest, (vc, dist));
	
		return self.end;
	}

	pub fn get_result(
		&mut self,
	) -> JsValue {
	
		JsValue::from_serde(&self.solutions).unwrap()
		
	}
}