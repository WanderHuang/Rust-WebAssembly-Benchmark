use std::collections::HashMap;
use rand::Rng;
use test::Bencher;

pub struct  Desk {
	graph: HashMap<i32, HashMap<i32, i32>>,
	solutions: HashMap<i32, Vec<i32>>,
	shortests: HashMap<i32, i32>,
	end: bool,
}

impl Desk {
	pub fn new(origin: &mut HashMap<i32, HashMap<i32, i32>>, start: i32) -> Desk {
		let mut graph: HashMap<i32, HashMap<i32, i32>> = origin.to_owned();
		let mut solutions = HashMap::new();
		let mut shortests = HashMap::new();
		solutions.insert(start, Vec::new());
		shortests.insert(start, 0);
		

		Desk {
			graph,
			solutions,
			shortests,
			end: false
		}
	}

	pub fn get_all(&mut self) -> HashMap<i32, Vec<i32>> {
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
		for (x, xdist) in self.shortests.iter() {
			if let Some(adj) = self.graph.get_mut(x) {
				let mut visited = Vec::new();
				for (y, weight) in adj.iter() {
					if self.solutions.contains_key(y) {
						visited.push(*y);
						continue;
					}
					let d = weight + xdist;
					if d < dist {
						dist = d;
						parent = *x;
						nearest = *y;
					}
				}
				adj.retain(|&k, _| {
					!visited.contains(&k)
				});
			}
		}
		
	
	
		// 找不到更小值了 所有节点都已经访问
		if dist == i32::MAX {
			self.end = true;
			return self.end;
		}
	
		let mut vc = self.solutions.get(&parent).unwrap().to_owned();
		vc.push(nearest);
		self.solutions.insert(nearest, vc);
		self.shortests.insert(nearest, dist);
	
		return self.end;
	}

	pub fn get_result(
		&mut self,
	) -> HashMap<i32, Vec<i32>> {
	
		self.solutions.to_owned()
		
	}
}


#[bench]
fn bench_dijkstra_desk(b: &mut Bencher) {
		let mut val = generate_js_value(20);
		
		b.iter(|| {
			let mut desk = Desk::new(&mut val, 5);
				desk.get_all();
		});
}

fn generate_js_value(n: i32) -> HashMap<i32, HashMap<i32, i32>> {
	let mut json: HashMap<i32, HashMap<i32, i32>> = HashMap::new();

	for x in 0..n {
			if !json.contains_key(&x) {
					json.insert(x, HashMap::new());
			}
			for k in 0..n {
					let rd: f64 = rand::thread_rng().gen();
					if k != x && rd < 0.6 {
							if !json.contains_key(&k) || !json.get(&k).unwrap().contains_key(&x) {
									let y: i32 = rand::thread_rng().gen_range(0..100);
									
									if !json.contains_key(&x) {
											json.insert(x, HashMap::new());
									}
									if !json.contains_key(&k) {
											json.insert(k, HashMap::new());
									}

									if let Some(map) = json.get_mut(&x) {
											map.insert(k, y);
									}
									if let Some(map) = json.get_mut(&k) {
											map.insert(x, y);
									}
							}
					}
			}
	}

	json
}