import ts from "typescript";
import { DocDocsParserTypescript } from "../index.js";
export declare class ModuleNode {
    private Parser;
    private Classes;
    private eachSourceFile;
    constructor(sourceFile: ts.SourceFile, Parser: DocDocsParserTypescript);
}
