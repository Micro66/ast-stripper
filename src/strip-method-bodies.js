const Parser = require('tree-sitter');
const Java = require('tree-sitter-java');
const Go = require('tree-sitter-go');
const Python = require('tree-sitter-python');
const PHP = require('tree-sitter-php');
const Cpp = require('tree-sitter-cpp');
const JavaScript = require('tree-sitter-javascript');
const TypeScript = require('tree-sitter-typescript').typescript;
const TSX = require('tree-sitter-typescript').tsx;
const C = require('tree-sitter-c');
const CSharp = require('tree-sitter-c-sharp');
const Rust = require('tree-sitter-rust');
const Kotlin = require('tree-sitter-kotlin');
const Swift = require('tree-sitter-swift');
const Ruby = require('tree-sitter-ruby');
const fs = require('fs');
const path = require('path');

// 缓存Parser实例
const parserCache = new Map();

// 初始化Parser
function initializeParser(language) {
    if (!parserCache.has(language)) {
        const parser = new Parser();
        parser.setLanguage(language);
        parserCache.set(language, parser);
    }
    return parserCache.get(language);
}

// 根据文件扩展名选择语言和 query 文件
function getLanguageAndQuery(filePath) {
    const ext = path.extname(filePath);
    switch (ext) {
        case '.java':
            return { language: Java, queryFile: 'java.scm' };
        case '.go':
            return { language: Go, queryFile: 'go.scm' };
        case '.py':
            return { language: Python, queryFile: 'python.scm' };
        case '.php':
            return { language: PHP, queryFile: 'php.scm' };
        case '.cpp':
        case '.cc':
        case '.cxx':
        case '.hpp':
        case '.h':
            return { language: Cpp, queryFile: 'cpp.scm' };
        case '.js':
        case '.jsx':
            return { language: JavaScript, queryFile: 'javascript.scm' };
        case '.ts':
            return { language: TypeScript, queryFile: 'typescript.scm' };
        case '.tsx':
            return { language: TSX, queryFile: 'tsx.scm' };
        case '.c':
            return { language: C, queryFile: 'c.scm' };
        case '.cs':
            return { language: CSharp, queryFile: 'csharp.scm' };
        case '.rs':
            return { language: Rust, queryFile: 'rust.scm' };
        case '.kt':
        case '.kts':
            return { language: Kotlin, queryFile: 'kotlin.scm' };
        case '.rb':
            return { language: Ruby, queryFile: 'ruby.scm' };
        default:
            throw new Error(`Unsupported file extension: ${ext}`);
    }
}

function stripMethodBodies(filePath) {
    const { language, queryFile } = getLanguageAndQuery(filePath);
    const parser = initializeParser(language);
    
    // 每次都重新读取查询文件
    const queryContent = fs.readFileSync(path.join(__dirname, 'queries', queryFile), 'utf8');
    let languageQuery;
    try {
        languageQuery = new Parser.Query(language, queryContent);
    } catch (e) {
        console.error('Query parse error:', e);
        console.error('Query content was:\n', queryContent);
        throw e;
    }

    const sourceCode = fs.readFileSync(filePath, 'utf8');
    const tree = parser.parse(sourceCode);
    const matches = languageQuery.matches(tree.rootNode);

    // 收集所有 @method.body 捕获到的节点
    const bodies = [];
    for (const match of matches) {
        for (const capture of match.captures) {
            if (capture.name === 'method.body') {
                // 对于 JavaScript/TypeScript，检查父节点是否是函数/方法相关的节点
                if (language === JavaScript || language === TypeScript || language === TSX) {
                    const parent = capture.node.parent;
                    if (parent && (
                        parent.type === 'function_declaration' ||
                        parent.type === 'method_definition' ||
                        parent.type === 'arrow_function' ||
                        parent.type === 'function_expression' ||
                        (parent.type === 'variable_declarator' && (
                            parent.value?.type === 'arrow_function' ||
                            parent.value?.type === 'function_expression'
                        )) ||
                        (parent.type === 'pair' && (
                            parent.value?.type === 'arrow_function' ||
                            parent.value?.type === 'function_expression'
                        ))
                    )) {
                        bodies.push(capture.node);
                    }
                } else {
                    // 对于其他语言，直接添加
                    bodies.push(capture.node);
                }
            }
        }
    }

    // 按位置从后往前替换
    bodies.sort((a, b) => b.startIndex - a.startIndex);
    let result = sourceCode;
    for (const body of bodies) {
        result = result.slice(0, body.startIndex) + '{}' + result.slice(body.endIndex);
    }
    return result;
}

module.exports = {
    stripMethodBodies,
    getLanguageAndQuery
};

if (require.main === module) {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error('Usage: node strip-method-bodies.js <JavaFile|GoFile|PythonFile|PHPFile>');
        process.exit(1);
    }
    const strippedCode = stripMethodBodies(filePath);
    console.log(strippedCode);
}