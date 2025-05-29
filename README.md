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

# ast-stripper (web-tree-sitter version)

## 依赖
- 仅依赖 `web-tree-sitter`，无需本地编译原生模块。
- 需要各语言的 `.wasm` 文件（tree-sitter 语言包的 WebAssembly 版本）。

## 准备 wasm 语言包
1. 新建 `wasm-languages/` 目录（与 `src/strip-method-bodies.ts` 里的路径一致）。
2. 从各 tree-sitter 语言的 GitHub Release 页面下载对应的 `.wasm` 文件，例如：
   - [tree-sitter-java.wasm](https://github.com/tree-sitter/tree-sitter-java/releases)
   - [tree-sitter-go.wasm](https://github.com/tree-sitter/tree-sitter-go/releases)
   - [tree-sitter-python.wasm](https://github.com/tree-sitter/tree-sitter-python/releases)
   - 其它语言同理
3. 将下载的 `.wasm` 文件放入 `wasm-languages/` 目录。

### 自动下载 wasm 语言包
你也可以运行以下命令，自动下载所有支持的 wasm 语言包：
```bash
npm run download-wasms
```

## 用法

### 1. 安装依赖
```bash
npm install
```

### 2. 编译 TypeScript
```bash
npm run build
```

### 3. 使用 API（异步）

```js
const { stripMethodBodies, stripMethodBodiesFromContent } = require('ast-stripper');

(async () => {
  const code = `public class Test { public void method1() { System.out.println("Hello"); } }`;
  const result = await stripMethodBodiesFromContent(code, 'test.java');
  console.log(result);
})();
```

或处理文件：

```js
(async () => {
  const result = await stripMethodBodies('path/to/Test.java');
  console.log(result);
})();
```

### 4. 运行测试
```bash
node test.js
```

## 注意事项
- 所有 API 都是 async/Promise 风格，需用 `await` 或 `.then()`。
- 必须确保 `wasm-languages/` 目录下有对应的 `.wasm` 文件，否则会报错。
- 你可以根据需要扩展 `src/strip-method-bodies.ts` 里的 `languageWasmMap`，支持更多语言。