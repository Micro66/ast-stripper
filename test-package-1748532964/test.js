const { stripMethodBodiesFromContent } = require('ast-stripper');

// 测试代码
const code = `
public class Test {
    public void method1() {
        System.out.println("Hello");
    }
}
`;

try {
    const result = stripMethodBodiesFromContent(code, 'test.java');
    console.log('测试成功！');
    console.log('处理后的代码:');
    console.log(result);
} catch (error) {
    console.error('测试失败:', error);
    process.exit(1);
}
