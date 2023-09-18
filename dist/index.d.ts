import ts from "typescript";
import { ModuleNode } from "./nodes/module-node.js";
import { ClassNode, ISerializedClassNode } from "./nodes/class-node.js";
export { ClassNode, ISerializedClassNode };
export declare function GetParserVersion(): Promise<string>;
export declare class DocDocsParserTypescript {
    private compilerOptions?;
    program: ts.Program;
    private files;
    private resolveFilesPath;
    constructor(initialFiles: string[], compilerOptions?: ts.CompilerOptions | undefined);
    /**
     * @param file If the file was edited/newly added, make sure to set reset `true`
     * @param reset Creates a new program with the file included if it's not.
     *
     * Wraps `parseSync` request in a promise that can run async
     */
    parse(file: string, reset?: boolean): Promise<ModuleNode>;
    /**
     * @param file If the file was edited/newly added, make sure to set reset `true`
     * @param reset Creates a new program with the file included if it's not.
     */
    parseSync(file: string, reset?: boolean): ModuleNode | undefined;
}
