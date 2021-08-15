use std::time::{SystemTime, Duration};

pub struct NativeTimer<'a> {
    name: &'a str,
    time: SystemTime,
}

impl<'a> NativeTimer<'a> {
    pub fn new(name: &'a str) -> NativeTimer<'a> {
        NativeTimer { name, time: SystemTime::now() }
    }
}

impl<'a> Drop for NativeTimer<'a> {
    fn drop(&mut self) {
        println!("{}: {:?}", self.name, SystemTime::now().duration_since(self.time))
    }
}