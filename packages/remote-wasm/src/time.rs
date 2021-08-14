use web_sys::console;
use std::time::{SystemTime, Duration};
pub struct Timer<'a> {
    name: &'a str,
}

impl<'a> Timer<'a> {
    pub fn new(name: &'a str) -> Timer<'a> {
        unsafe {
            console::time_with_label(name);
        }
        Timer { name }
    }
}

impl<'a> Drop for Timer<'a> {
    fn drop(&mut self) {
        unsafe {
            console::time_end_with_label(self.name);
        }
    }
}

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