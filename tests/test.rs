struct TestStruct {
    value: i32,
}

impl TestStruct {
    fn new(value: i32) -> Self {
        TestStruct { value }
    }

    fn method(&self) {
        println!("{}", self.value);
    }

    async fn async_method(&self) -> String {
        "async".to_string()
    }
}

trait TestTrait {
    fn trait_method(&self);
}

impl TestTrait for TestStruct {
    fn trait_method(&self) {
        println!("trait");
    }
}

fn generic_function<T>(param: T) -> T {
    param
}

fn main() {
    let test = TestStruct::new(42);
    test.method();
    test.trait_method();
}

mod test_module {
    pub fn module_function() {
        println!("module");
    }
} 