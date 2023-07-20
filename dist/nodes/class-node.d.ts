/**
 * Working on class node
 * Helpful links:
 * https://github.com/jordimarimon/ts-ast-parser/blob/main/packages/core/src/parse-from-files.ts
 * https://github.com/jordimarimon/ts-ast-parser/blob/main/packages/core/src/nodes/class-node.ts
 * https://github.com/jordimarimon/ts-ast-parser/blob/main/packages/core/src/utils/member.ts#L101
 * github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 * stackoverflow.com/questions/58885433/typescript-compiler-how-to-get-an-exported-symbol-by-name
 * github.com/microsoft/TypeScript/wiki/Architectural-Overview
 * https://stackoverflow.com/questions/58886590/typescript-compiler-how-to-navigate-to-the-definition-of-a-symbol
 */
import ts from "typescript";
import { DocDocsParserTypescript } from "../index.js";
import { ISerializedSignature, ISerializedSymbol } from "../utils/main-serializer.js";
export interface ISerializedClassNode {
    constructors: ISerializedSignature[];
    members: ISerializedSymbol[];
}
/**
 * A Node for classes.
 */
export declare class ClassNode {
    private Node;
    private Parser;
    private _checker;
    private _symbol;
    /**
     * Serializes the classes constructors.
     */
    private GetConstructors;
    /**
     * Gets the properties/members of the class node.
     */
    private GetMembers;
    /**
     * Serializes the class with all needed info.
     */
    Serialize(): ISerializedClassNode;
    constructor(Node: ts.ClassDeclaration, Parser: DocDocsParserTypescript);
}
