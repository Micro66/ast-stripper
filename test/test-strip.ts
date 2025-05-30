import { init, stripMethodBodies, stripMethodBodiesFromContent } from '../src/strip-method-bodies';

async function testStripMethodBodies() {
    await init();
    // Test with a simple Java code
    const javaCode = `
public class Test {
    public void method1() {
        System.out.println("Hello");
        int x = 1 + 2;
    }
    
    private String method2() {
        return "World";
    }
}`;

    try {
        // Test stripMethodBodiesFromContent
        const strippedContent = await stripMethodBodiesFromContent(javaCode, 'Test.java');
        console.log('Stripped content:');
        console.log(strippedContent);
        
        // Verify that method bodies are replaced with {}
        if (strippedContent.includes('System.out.println') || strippedContent.includes('return "World"')) {
            console.error('Test failed: Method bodies were not stripped correctly');
        } else {
            console.log('Test passed: Method bodies were stripped correctly');
        }
    } catch (error) {
        console.error('Test failed with error:', error);
    }
}

testStripMethodBodies(); 