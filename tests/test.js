// 普通函数
function normalFunction() {
    console.log("Hello");
    return 42;
}

// 箭头函数
const arrowFunction = () => {
    const x = 1;
    return x + 1;
};

// 类方法
class TestClass {
    constructor() {
        this.value = 42;
    }

    method1() {
        console.log(this.value);
    }

    static staticMethod() {
        return "static";
    }

    async asyncMethod() {
        await Promise.resolve();
        return "async";
    }

    *generatorMethod() {
        yield 1;
        yield 2;
    }
}

// 对象方法
const obj = {
    method() {
        return "object method";
    }
};

// IIFE
(function() {
    console.log("IIFE");
})();

// 带装饰器的方法
@decorator
class DecoratedClass {
    @methodDecorator
    decoratedMethod() {
        return "decorated";
    }
} 

for (let i = 0; i < 10; i++) {
    console.log(i);
}