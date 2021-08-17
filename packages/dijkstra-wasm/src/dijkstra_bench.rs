#[cfg(test)]
mod tests {
    use rand::Rng;
    use std::collections::HashMap;
    use test::Bencher;
    use crate::dijkstra::find_shortest_path_all_inner;
    use crate::desk::Desk;
    use std::time::{Duration, SystemTime};
    use wasm_bindgen::prelude::*;

    #[bench]
    fn bench_dijkstra(b: &mut Bencher) {
        let val = generate_js_value(20);
        b.iter(|| find_shortest_path_all_inner(&val, 5));
    }

    #[test]
    fn test_dijkstra() {
        let size = 200;
        let val = generate_js_value(size);
        let start = SystemTime::now();
        let res = find_shortest_path_all_inner(&val, 5);
        // println!("{:?}", val);
        println!("{:?}", res);
        // println!("{:?}", SystemTime::now().duration_since(start));
        assert_eq!(1, 1);
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
}
