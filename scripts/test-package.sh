#!/bin/bash

# 确保脚本在错误时退出
set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 创建临时测试目录
TEST_DIR="test-package-$(date +%s)"
echo -e "${GREEN}创建测试目录: ${TEST_DIR}${NC}"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# 初始化新的 npm 项目
echo -e "${GREEN}初始化测试项目...${NC}"
npm init -y

# 安装当前包
echo -e "${GREEN}安装当前包...${NC}"
npm install ../

# 创建测试文件
echo -e "${GREEN}创建测试文件...${NC}"
cat > test.ts << 'EOF'
import { init, stripMethodBodiesFromContent } from 'ast-stripper';

(async () => {
  // 测试代码
  const code = `
public class Test {
    public void method1() {
        System.out.println("Hello");
    }
}
`;

  try {
    await init();
    const result = await stripMethodBodiesFromContent(code, 'test.java');
    console.log('测试成功！');
    console.log('处理后的代码:');
    console.log(result);
  } catch (error) {
    console.error('测试失败:', error);
    process.exit(1);
  }
})();
EOF

# 运行测试
echo -e "${GREEN}运行测试...${NC}"
npx ts-node test.ts

# 清理
echo -e "${GREEN}测试完成，清理临时文件...${NC}"
cd ..
rm -rf "$TEST_DIR"

echo -e "${GREEN}测试打包完成！${NC}" 