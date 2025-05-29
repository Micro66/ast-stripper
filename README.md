# AST Stripper

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
npm install -g ast-stripper
```

## Usage

### Command Line

```bash
# Process a file and output to stdout
ast-stripper path/to/your/file.java

# Process a file and save to a new file
ast-stripper path/to/your/file.java -o stripped.java
```

### API Usage

```javascript
const { stripMethodBodies, isLanguageSupported } = require('ast-stripper');

// 检查文件是否支持
const isSupported = isLanguageSupported('example.java'); // 返回 true

// 处理文件
if (isSupported) {
  const strippedCode = stripMethodBodies('example.java');
  console.log(strippedCode);
}
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

After running `ast-stripper example.java`:
```java
public class Example {
    public void method1() {}
    
    private String method2() {}
}
```

## License

MIT