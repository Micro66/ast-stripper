// This file is now web-tree-sitter only, loads wasm languages at runtime.
import Parser from 'web-tree-sitter';
import * as fs from 'fs';
import * as path from 'path';

const WASM_DIR = path.resolve(__dirname, '../wasm-languages');

const languageWasmMap: Record<string, { wasm: string, query: string }> = {
  '.java': { wasm: 'tree-sitter-java.wasm', query: 'java.scm' },
  '.go': { wasm: 'tree-sitter-go.wasm', query: 'go.scm' },
  '.py': { wasm: 'tree-sitter-python.wasm', query: 'python.scm' },
  '.php': { wasm: 'tree-sitter-php.wasm', query: 'php.scm' },
  '.cpp': { wasm: 'tree-sitter-cpp.wasm', query: 'cpp.scm' },
  '.cc': { wasm: 'tree-sitter-cpp.wasm', query: 'cpp.scm' },
  '.cxx': { wasm: 'tree-sitter-cpp.wasm', query: 'cpp.scm' },
  '.hpp': { wasm: 'tree-sitter-cpp.wasm', query: 'cpp.scm' },
  '.h': { wasm: 'tree-sitter-cpp.wasm', query: 'cpp.scm' },
  '.js': { wasm: 'tree-sitter-javascript.wasm', query: 'javascript.scm' },
  '.jsx': { wasm: 'tree-sitter-javascript.wasm', query: 'javascript.scm' },
  '.ts': { wasm: 'tree-sitter-typescript.wasm', query: 'typescript.scm' },
  '.tsx': { wasm: 'tree-sitter-tsx.wasm', query: 'tsx.scm' },
  '.c': { wasm: 'tree-sitter-c.wasm', query: 'c.scm' },
  '.cs': { wasm: 'tree-sitter-c-sharp.wasm', query: 'csharp.scm' },
  '.rs': { wasm: 'tree-sitter-rust.wasm', query: 'rust.scm' },
  '.kt': { wasm: 'tree-sitter-kotlin.wasm', query: 'kotlin.scm' },
  '.kts': { wasm: 'tree-sitter-kotlin.wasm', query: 'kotlin.scm' },
  '.rb': { wasm: 'tree-sitter-ruby.wasm', query: 'ruby.scm' },
  '.swift': { wasm: 'tree-sitter-swift.wasm', query: 'swift.scm' }
};

async function getLanguageAndQuery(filePath: string): Promise<{ language: any; queryFile: string }> {
  const ext = path.extname(filePath);
  const entry = languageWasmMap[ext];
  if (!entry) throw new Error(`Unsupported file extension: ${ext}`);
  const language = await Parser.Language.load(path.join(WASM_DIR, entry.wasm));
  return { language, queryFile: entry.query };
}

export async function stripMethodBodies(filePath: string): Promise<string> {
  await Parser.init();
  const { language, queryFile } = await getLanguageAndQuery(filePath);
  const parser = new Parser();
  parser.setLanguage(language);
  const sourceCode = fs.readFileSync(filePath, 'utf8');
  return _processCodeContent(sourceCode, language, queryFile, parser);
}

export async function stripMethodBodiesFromContent(content: string, fileName: string): Promise<string> {
  await Parser.init();
  const { language, queryFile } = await getLanguageAndQuery(fileName);
  const parser = new Parser();
  parser.setLanguage(language);
  return _processCodeContent(content, language, queryFile, parser);
}

async function _processCodeContent(content: string, language: any, queryFile: string, parser: any): Promise<string> {
  const tree = parser.parse(content);
  const queryContent = fs.readFileSync(path.resolve(__dirname, '../src/queries', queryFile), 'utf8');
  const query = language.query(queryContent);
  const matches = query.matches(tree.rootNode);
  const bodies: any[] = [];
  for (const match of matches) {
    for (const capture of match.captures) {
      if (capture.name === 'method.body') {
        bodies.push(capture.node);
      }
    }
  }
  bodies.sort((a, b) => b.startIndex - a.startIndex);
  let result = content;
  for (const body of bodies) {
    result = result.slice(0, body.startIndex) + '{}' + result.slice(body.endIndex);
  }
  return result;
}

export function isLanguageSupported(filePath: string): boolean {
  const ext = path.extname(filePath);
  return !!languageWasmMap[ext];
}

if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node strip-method-bodies.js <JavaFile|GoFile|PythonFile|PHPFile>');
    process.exit(1);
  }
  stripMethodBodies(filePath).then(strippedCode => {
    console.log(strippedCode);
  }).catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
}