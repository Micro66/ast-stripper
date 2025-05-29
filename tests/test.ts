interface TestInterface {
    prop1: string;
    prop2: number;
}

class TestClass implements TestInterface {
    prop1: string;
    prop2: number;

    constructor(prop1: string, prop2: number) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }

    method<T>(param: T): T {
        return param;
    }

    async asyncMethod(): Promise<string> {
        await Promise.resolve();
        return "async";
    }
}

type TestType = {
    method(): void;
};

const obj: TestType = {
    method() {
        console.log("typed method");
    }
};

function genericFunction<T>(param: T): T {
    return param;
}

enum TestEnum {
    A = 1,
    B = 2
}

namespace TestNamespace {
    export function namespaceFunction() {
        return "namespace";
    }
} 