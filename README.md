# Tree Setter

A command-line tool to strip method bodies from source code files using tree-sitter. This tool helps you focus on the structure of your code by removing implementation details.

## Supported Languages

- Java
- Go
- Python
- PHP
- C/C++
- JavaScript/JSX
- TypeScript/TSX
- C#
- Rust
- Kotlin
- Swift
- Ruby

## Installation

```bash
npm install -g tree-setter-scm
```

## Usage

```bash
# Process a file and output to stdout
tree-setter path/to/your/file.java

# Process a file and save to a new file
tree-setter path/to/your/file.java -o stripped.java
```

## Example

Input file (`example.java`):
```java
public class Example {
    public void method1() {
        System.out.println("Hello");
        int x = 1 + 1;
    }
    
    private String method2() {
        return "World";
    }
}
```

After running `tree-setter example.java`:
```java
public class Example {
    public void method1() {}
    
    private String method2() {}
}
```

## License

MIT 