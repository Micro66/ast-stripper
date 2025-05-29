declare module 'ast-stripper' {
    /**
     * Strips method bodies from a file
     * @param filePath Path to the source file
     * @returns The source code with method bodies stripped
     */
    export function stripMethodBodies(filePath: string): string;

    /**
     * Strips method bodies from source code content
     * @param content The source code content
     * @param fileName The name of the file (used to determine the language)
     * @returns The source code with method bodies stripped
     */
    export function stripMethodBodiesFromContent(content: string, fileName: string): string;

    /**
     * Gets the language and query file for a given file path
     * @param filePath Path to the source file
     * @returns Object containing the language and query file
     */
    export function getLanguageAndQuery(filePath: string): {
        language: any;
        queryFile: string;
    };
} 