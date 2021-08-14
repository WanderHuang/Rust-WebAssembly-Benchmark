#[cfg(test)]
mod tests {
    use rand::Rng;
    use std::collections::HashMap;
    use test::Bencher;

    #[bench]
    fn bench_dijkstra(b: &mut Bencher) {
        let val = generate_js_value(20);
        b.iter(|| find_shortest_path_simple(&val, 10));
    }

    #[test]
    fn find_shortest_path_simple_test() {
        let val = generate_js_value(10);
        let res = find_shortest_path_simple(&val, 2);
        assert_eq!(1, 1);
    }

    fn find_shortest_path_simple(
        graph: &HashMap<i32, HashMap<i32, i32>>,
        start: i32,
    ) -> HashMap<i32, i32> {
        let mut solutions: HashMap<i32, Vec<i32>> = HashMap::new();
        let mut dist_map: HashMap<i32, i32> = HashMap::new();

        let mut row = Vec::with_capacity(10);
        solutions.insert(start, row);
        dist_map.insert(start, 0);

        let mut x = 0;

        loop {
            if x == 10 {
                break;
            } else {
                x += 1;
            }
            let mut dist = i32::MAX;
            let mut parent = i32::MAX;
            let mut nearest: i32 = 0;
            solutions.keys().for_each(|n| match graph.get(n) {
                Some(adj) => {
                    adj.iter()
                        .filter(|(x, _)| !solutions.contains_key(x))
                        .for_each(|(a, cdist)| match dist_map.get(n) {
                            Some(ndist) => {
                                let d = cdist + ndist;
                                if d < dist {
                                    parent = n.to_owned();
                                    nearest = a.to_owned();
                                    dist = d;
                                }
                            }
                            None => (),
                        });
                }
                None => (),
            });

            if dist == i32::MAX {
                break;
            }

            // get_mut 获取所有权
            if parent == i32::MAX {
                solutions.insert(nearest, vec![nearest]);
            } else if let Some(x) = solutions.get_mut(&parent) {
                x.push(nearest);
            } else {
            }

            if let Some(x) = dist_map.get_mut(&nearest) {
                *x = dist;
            }
        }
        dist_map
    }

    fn generate_js_value(n: i32) -> HashMap<i32, HashMap<i32, i32>> {
        let mut json: HashMap<i32, HashMap<i32, i32>> = HashMap::new();

        for x in 0..n {
            let mut adj: HashMap<i32, i32> = HashMap::new();
            let mut k = 0;
            loop {
                let rd: f64 = rand::thread_rng().gen();
                if k != x && rd < 0.6 {
                    if !json.contains_key(&k) || !json.get(&k).unwrap().contains_key(&x) {
                        let y: i32 = rand::thread_rng().gen();
                        adj.insert(k, y);
                    }
                }

                k = k + 1;
                if k >= n {
                    break;
                }
            }
            json.insert(x, adj.clone());
        }

        json
    }
}
