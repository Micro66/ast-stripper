# AST Stripper

一个使用tree-sitter从源代码文件中剥离方法体的工具，支持多种编程语言。

## 功能特点

- 保留方法声明，移除方法体实现
- 支持多种编程语言（Java、Go、Python、PHP、C++、JavaScript、TypeScript等）
- 提供命令行工具和Node.js API

## 安装

```bash
npm install ast-stripper
```

## 使用方法

### 作为命令行工具使用

```bash
# 处理文件并输出到控制台
ast-stripper input.js

# 处理文件并保存到指定位置
ast-stripper input.js -o output.js
```

### 作为Node.js包使用

```javascript
const { stripMethodBodies } = require('ast-stripper');

// 处理单个文件
try {
  const result = stripMethodBodies('path/to/your/file.js');
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
}
```

## 支持的文件类型

- Java (.java)
- Go (.go)
- Python (.py)
- PHP (.php)
- C++ (.cpp, .cc, .cxx, .hpp, .h)
- JavaScript (.js, .jsx)
- TypeScript (.ts)
- TSX (.tsx)
- C (.c)
- C# (.cs)
- Rust (.rs)
- Kotlin (.kt, .kts)
- Ruby (.rb)

## 示例

输入文件 (input.js):
```javascript
function hello(name) {
  console.log(`Hello ${name}`);
}

class Example {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
```

输出结果:
```javascript
function hello(name) {
}

class Example {
  constructor(value) {
  }

  getValue() {
  }
}
```

## 许可证

MIT