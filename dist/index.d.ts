import ts from "typescript";
export declare class DocDocsParserTypescript {
    private compilerOptions?;
    program: ts.Program;
    private files;
    private resolveFilesPath;
    constructor(initialFiles: string[], compilerOptions?: ts.CompilerOptions | undefined);
    /**
     * @param file If the file was edited/newly added, make sure to set reset `true`
     * @param reset Creates a new program with the file included if it's not.
     */
    parse(file: string, reset?: boolean): void;
}
