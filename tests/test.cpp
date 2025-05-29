#include <iostream>
#include <string>
#include <vector>
#include <functional>

namespace test {

template<typename T>
class Container {
private:
    std::vector<T> data;
public:
    void add(const T& item) {
        data.push_back(item);
    }
    T get(size_t index) const {
        return data.at(index);
    }
    size_t size() const {
        return data.size();
    }
};

class Person {
private:
    std::string name;
    int age;
public:
    Person(const std::string& n, int a) : name(n), age(a) {}
    void greet() const {
        std::cout << "Hello, I am " << name << " and I am " << age << " years old." << std::endl;
    }
    int getAge() const { return age; }
    void setAge(int a) { age = a; }
};

void processItems(const std::vector<int>& items, std::function<void(int)> callback) {
    for (const auto& item : items) {
        callback(item);
    }
}

int main() {
    Container<int> numbers;
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);

    Person alice("Alice", 30);
    alice.greet();

    std::vector<int> items = {1, 2, 3, 4, 5};
    processItems(items, [](int x) {
        std::cout << "Processing: " << x << std::endl;
    });

    return 0;
}

} // namespace test 