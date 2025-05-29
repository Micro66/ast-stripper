package test

import (
    "fmt"
    "time"
)

type Greeter interface {
    Greet(name string) string
}

type Person struct {
    Name string
    Age  int
}

func (p *Person) Greet(name string) string {
    defer fmt.Println("Greet called")
    msg := func() string {
        return fmt.Sprintf("Hello, %s! I am %s.", name, p.Name)
    }
    return msg()
}

func (p *Person) AgeNextYear() int {
    return p.Age + 1
}

func NewPerson(name string, age int) *Person {
    return &Person{Name: name, Age: age}
}

func main() {
    p := NewPerson("Alice", 30)
    go func() {
        fmt.Println("Running in goroutine")
    }()
    fmt.Println(p.Greet("Bob"))
    fmt.Println("Next year age:", p.AgeNextYear())
    time.AfterFunc(time.Second, func() {
        fmt.Println("Timer expired")
    })
} 