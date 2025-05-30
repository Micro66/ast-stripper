const fs = require('fs');
const path = require('path');
const { stripMethodBodies, stripMethodBodiesFromContent, init } = require('./dist');

// Create test directory if it doesn't exist
const testDir = path.join(__dirname, 'test-files');
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
}

// Test cases
const testCases = [
    {
        name: 'Java test',
        input: `public class Test {
    public void method1() {
        System.out.println("Hello");
        int x = 1 + 1;
    }
    
    private String method2() {
        return "World";
    }
}`,
        expected: `public class Test {
    public void method1() {}
    
    private String method2() {}
}`,
        file: 'test.java'
    },
    {
        name: 'JavaScript test',
        input: `function test() {
    console.log("Hello");
    return 42;
}

const arrow = () => {
    return "World";
}`,
        expected: `function test() {}

const arrow = () => {}`,
        file: 'test.js'
    }
];

async function runTests() {
    await init();
    let passed = 0;
    let failed = 0;

    for (const test of testCases) {
        console.log(`\nRunning test: ${test.name}`);
        // Write test file
        const filePath = path.join(testDir, test.file);
        fs.writeFileSync(filePath, test.input);
        try {
            const result = await stripMethodBodies(filePath);
            const normalizedResult = result.replace(/\s+/g, ' ').trim();
            const normalizedExpected = test.expected.replace(/\s+/g, ' ').trim();
            if (normalizedResult === normalizedExpected) {
                console.log('✅ Test passed');
                passed++;
            } else {
                console.log('❌ Test failed');
                console.log('Expected:', normalizedExpected);
                console.log('Got:', normalizedResult);
                failed++;
            }
        } catch (error) {
            console.log('❌ Test failed with error:', error.message);
            failed++;
        }
        // Clean up test file
        fs.unlinkSync(filePath);
    }
    // Clean up test directory
    fs.rmdirSync(testDir);
    // Print summary
    console.log('\nTest Summary:');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${testCases.length}`);
    process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => { console.error(e); process.exit(1); }); 