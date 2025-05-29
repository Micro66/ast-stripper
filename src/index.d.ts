declare module 'ast-stripper' {
    /**
     * Strips method bodies from a file
     * @param filePath Path to the source file
     * @returns The source code with method bodies stripped
     */
    export function stripMethodBodies(filePath: string): Promise<string>;

    /**
     * Strips method bodies from source code content
     * @param content The source code content
     * @param language The language of the file
     * @returns The source code with method bodies stripped
     */
    export function stripMethodBodiesFromContent(content: string, language: string): string;

    /**
     * Gets the language and query file for a given file path
     * @param filePath Path to the source file
     * @returns Object containing the language and query file
     */
    export function getLanguageAndQuery(filePath: string): { language: string; query: string };

    /**
     * Checks if a language is supported
     * @param language The language to check
     * @returns True if the language is supported, false otherwise
     */
    export function isLanguageSupported(language: string): boolean;
} 