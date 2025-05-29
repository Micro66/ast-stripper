const fs = require('fs');
const path = require('path');
const https = require('https');

const wasmList = [
  {
    name: 'tree-sitter-java.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-java@latest/tree-sitter-java.wasm'
  },
  {
    name: 'tree-sitter-go.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-go@latest/tree-sitter-go.wasm'
  },
  {
    name: 'tree-sitter-python.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-python@latest/tree-sitter-python.wasm'
  },
  {
    name: 'tree-sitter-php.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-php@latest/tree-sitter-php.wasm'
  },
  {
    name: 'tree-sitter-cpp.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-cpp@latest/tree-sitter-cpp.wasm'
  },
  {
    name: 'tree-sitter-javascript.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-javascript@latest/tree-sitter-javascript.wasm'
  },
  {
    name: 'tree-sitter-typescript.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-typescript@latest/tree-sitter-typescript.wasm'
  },
  {
    name: 'tree-sitter-tsx.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-typescript@latest/tree-sitter-tsx.wasm'
  },
  {
    name: 'tree-sitter-c.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-c@latest/tree-sitter-c.wasm'
  },
  {
    name: 'tree-sitter-c-sharp.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-c-sharp@latest/tree-sitter-c-sharp.wasm'
  },
  {
    name: 'tree-sitter-rust.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-rust@latest/tree-sitter-rust.wasm'
  },
  {
    name: 'tree-sitter-kotlin.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-kotlin@latest/tree-sitter-kotlin.wasm'
  },
  {
    name: 'tree-sitter-ruby.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-ruby@latest/tree-sitter-ruby.wasm'
  },
  {
    name: 'tree-sitter-swift.wasm',
    url: 'https://cdn.jsdelivr.net/npm/tree-sitter-swift@latest/tree-sitter-swift.wasm'
  }
];

const outDir = path.join(__dirname, '../wasm-languages');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

(async () => {
  for (const { name, url } of wasmList) {
    const dest = path.join(outDir, name);
    if (fs.existsSync(dest)) {
      console.log(`${name} already exists, skipping.`);
      continue;
    }
    console.log(`Downloading ${name}...`);
    try {
      await download(url, dest);
      console.log(`Downloaded ${name}`);
    } catch (e) {
      console.error(`Failed to download ${name}:`, e.message);
    }
  }
})();
