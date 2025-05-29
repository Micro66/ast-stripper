#include <iostream>
#include <vector>

namespace ns {
class Demo {
public:
    Demo() { std::cout << "ctor"; }
    ~Demo() { std::cout << "dtor"; }
    void foo(int x) {
        std::cout << x;
    }
    static int bar(double y) {
        return (int)y;
    }
};

void ns_func() {
    Demo d;
    d.foo(42);
}
}

template<typename T>
T add(T a, T b) {
    return a + b;
}

int global_func(int a) {
    auto lambda = [](int x) { return x * x; };
    return lambda(a);
}

void Demo::foo(int x) {
    std::cout << "out-of-class: " << x;
} 