use web_sys::console;
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