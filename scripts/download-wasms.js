const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 从 strip-method-bodies.ts 中提取所需的 wasm 文件
const requiredWasms = new Set([
  'tree-sitter-java.wasm',
  'tree-sitter-go.wasm',
  'tree-sitter-python.wasm',
  'tree-sitter-php.wasm',
  'tree-sitter-cpp.wasm',
  'tree-sitter-javascript.wasm',
  'tree-sitter-typescript.wasm',
  'tree-sitter-tsx.wasm',
  'tree-sitter-c.wasm',
  'tree-sitter-c_sharp.wasm',
  'tree-sitter-rust.wasm',
  'tree-sitter-kotlin.wasm',
  'tree-sitter-ruby.wasm',
  'tree-sitter-swift.wasm'
]);

const outDir = path.join(__dirname, '../wasm-languages');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// 检查文件是否有效
function isValidWasmFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    // wasm 文件通常不会小于 10KB
    if (stats.size < 10 * 1024) {
      console.log(`${path.basename(filePath)} is too small (${stats.size} bytes), will re-download`);
      return false;
    }
    return true;
  } catch (e) {
    console.log(`${path.basename(filePath)} not found or error: ${e.message}`);
    return false;
  }
}

(async () => {
  try {
    // 安装 tree-sitter-wasms 包
    console.log('Installing tree-sitter-wasms package...');
    execSync('npm install tree-sitter-wasms@latest', { stdio: 'inherit' });

    // 从 node_modules 复制文件
    const sourceDir = path.join(__dirname, '../node_modules/tree-sitter-wasms/out');
    const missingFiles = [];
    const invalidFiles = [];
    
    for (const wasmFile of requiredWasms) {
      const sourcePath = path.join(sourceDir, wasmFile);
      const destPath = path.join(outDir, wasmFile);
      
      if (!fs.existsSync(sourcePath)) {
        missingFiles.push(wasmFile);
        continue;
      }

      if (fs.existsSync(destPath) && isValidWasmFile(destPath)) {
        console.log(`${wasmFile} exists and is valid, skipping.`);
        continue;
      }

      console.log(`Copying ${wasmFile}...`);
      try {
        fs.copyFileSync(sourcePath, destPath);
        if (isValidWasmFile(destPath)) {
          console.log(`Copied ${wasmFile} successfully`);
        } else {
          console.error(`Copied ${wasmFile} but file is invalid`);
          fs.unlinkSync(destPath);
          invalidFiles.push(wasmFile);
        }
      } catch (e) {
        console.error(`Failed to copy ${wasmFile}:`, e.message);
        invalidFiles.push(wasmFile);
      }
    }

    // 清理安装的包
    console.log('Cleaning up...');
    execSync('npm uninstall tree-sitter-wasms', { stdio: 'inherit' });

    // 检查是否有缺失或无效的文件
    if (missingFiles.length > 0 || invalidFiles.length > 0) {
      console.error('\nError: Some required wasm files are missing or invalid:');
      if (missingFiles.length > 0) {
        console.error('\nMissing files:');
        missingFiles.forEach(file => console.error(`- ${file}`));
      }
      if (invalidFiles.length > 0) {
        console.error('\nInvalid files:');
        invalidFiles.forEach(file => console.error(`- ${file}`));
      }
      process.exit(1);
    }
    
    console.log('\nAll required wasm files are present and valid!');
    
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
