import * as fs from 'fs';
import { stripMethodBodies, stripMethodBodiesFromContent, isLanguageSupported, init } from './strip-method-bodies';

export {
    stripMethodBodies,
    stripMethodBodiesFromContent,
    isLanguageSupported,
    init
};

// CLI entry point
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Usage: node dist/index.js <file> [output]');
        process.exit(1);
    }
    const filePath = args[0];
    const outputPath = args[1];
    (async () => {
        try {
            await init();
            const result = stripMethodBodies(filePath);
            if (outputPath) {
                fs.writeFileSync(outputPath, result);
                console.log(`Stripped code written to ${outputPath}`);
            } else {
                console.log(result);
            }
        } catch (error: any) {
            console.error('Error:', error.message);
            process.exit(1);
        }
    })();
} 