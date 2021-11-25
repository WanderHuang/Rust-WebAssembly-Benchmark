use wasmer::{Store, Module, Instance, Value, imports};
use std::fs;
use std::error::Error;

/// 使用wasmer测试wasm技术在中后台的应用
/// 
/// 1. wasmer引入
/// 2. 使用wat文件（可以由任意wasm文件逆向得到）
fn main() -> Result<(), Box<dyn Error>> {
    // 字符串格式
    let module_wat = fs::read_to_string("./add.wat")?;

    // 内存空间
    let store = Store::default();
    // 生成模块
    let module = Module::new(&store, &module_wat)?;
    // 空引用
    let import_object = imports! {};
    // 生成实例
    let instance = Instance::new(&module, &import_object)?;

    let add = instance.exports.get_function("add_one")?;
    let year = add.call(&[Value::I32(2000), Value::I32(21)])?;
    let month = add.call(&[Value::I32(10), Value::I32(1)])?;
    let day = add.call(&[Value::I32(20), Value::I32(5)])?;
    assert_eq!(year[0], Value::I32(2021));
    assert_eq!(month[0], Value::I32(11));
    assert_eq!(day[0], Value::I32(25));

    println!(">_> {}/{}/{}", &year[0].i32().unwrap(), &month[0].i32().unwrap(), &day[0].i32().unwrap());

    Ok(())
}