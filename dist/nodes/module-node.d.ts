import ts from "typescript";
import { DocDocsParserTypescript } from "../index.js";
import { ISerializedClassNode } from "./class-node.js";
export declare class ModuleNode {
    private Parser;
    Classes: ISerializedClassNode[];
    constructor(sourceFile: ts.SourceFile, Parser: DocDocsParserTypescript);
}
