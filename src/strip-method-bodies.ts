import Parser = require('tree-sitter');
// @ts-ignore
import Java = require('tree-sitter-java');
// @ts-ignore
import Go = require('tree-sitter-go');
// @ts-ignore
import Python = require('tree-sitter-python');
// @ts-ignore
import PHP = require('tree-sitter-php');
// @ts-ignore
import Cpp = require('tree-sitter-cpp');
// @ts-ignore
import JavaScript = require('tree-sitter-javascript');
// @ts-ignore
import { typescript as TypeScript, tsx as TSX } from 'tree-sitter-typescript';
// @ts-ignore
import C = require('tree-sitter-c');
// @ts-ignore
import CSharp = require('tree-sitter-c-sharp');
// @ts-ignore
import Rust = require('tree-sitter-rust');
// @ts-ignore
import Kotlin = require('tree-sitter-kotlin');
// @ts-ignore
import Swift = require('tree-sitter-swift');
// @ts-ignore
import Ruby = require('tree-sitter-ruby');
import * as fs from 'fs';
import * as path from 'path';

// 缓存Parser实例
const parserCache = new Map<any, any>();

// 初始化Parser
function initializeParser(language: any): any {
    if (!parserCache.has(language)) {
        const parser = new Parser();
        parser.setLanguage(language);
        parserCache.set(language, parser);
    }
    return parserCache.get(language);
}

// 根据文件扩展名选择语言和 query 文件
export function getLanguageAndQuery(filePath: string): { language: any; queryFile: string } {
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

// 内部函数：处理代码内容的核心逻辑
function _processCodeContent(content: string, language: any, queryFile: string): string {
    const parser = initializeParser(language);
    
    // 每次都重新读取查询文件
    const queryContent = fs.readFileSync(path.resolve(__dirname, '../src/queries', queryFile), 'utf8');
    let languageQuery: any;
    try {
        languageQuery = new Parser.Query(language, queryContent);
    } catch (e) {
        console.error('Query parse error:', e);
        console.error('Query content was:\n', queryContent);
        throw e;
    }

    const tree = parser.parse(content);
    const matches = languageQuery.matches(tree.rootNode);

    // 收集所有 @method.body 捕获到的节点
    const bodies: any[] = [];
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
    let result = content;
    for (const body of bodies) {
        result = result.slice(0, body.startIndex) + '{}' + result.slice(body.endIndex);
    }
    return result;
}

export function stripMethodBodies(filePath: string): string {
    const { language, queryFile } = getLanguageAndQuery(filePath);
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    return _processCodeContent(sourceCode, language, queryFile);
}

export function stripMethodBodiesFromContent(content: string, filenName: string): string {
    const { language, queryFile } = getLanguageAndQuery(filenName);
    return _processCodeContent(content, language, queryFile);
}

export function isLanguageSupported(filePath: string): boolean {
    try {
      getLanguageAndQuery(filePath);
      return true;
    } catch (error) {
      return false;
    }
}

if (require.main === module) {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error('Usage: node strip-method-bodies.js <JavaFile|GoFile|PythonFile|PHPFile>');
        process.exit(1);
    }
    const strippedCode = stripMethodBodies(filePath);
    console.log(strippedCode);
}