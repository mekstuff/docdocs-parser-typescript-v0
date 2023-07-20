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
import LogReport from "@mekstuff/logreport";
import { DocDocsParserTypescript } from "../index.js";
import {
  ISerializedSignature,
  ISerializedSymbol,
  SerializeSignature,
  SerializeSymbol,
} from "../utils/main-serializer.js";

export interface ISerializedClassNode {
  constructors: ISerializedSignature[];
  members: ISerializedSymbol[];
}

/**
 * A Node for classes.
 */
export class ClassNode {
  private _checker: ts.TypeChecker;
  private _symbol: ts.Symbol | undefined;

  /**
   * Serializes the classes constructors.
   */
  private GetConstructors() {
    if (!this._symbol) {
      LogReport.warn("No symbols for class node.");
      return [];
    }
    const constructorType = this._checker.getTypeOfSymbolAtLocation(
      this._symbol,
      this.Node
    );
    return constructorType.getConstructSignatures().map((signature) => {
      return SerializeSignature(signature, this._checker);
    });
  }

  /**
   * Gets the properties/members of the class node.
   */
  private GetMembers() {
    const symbol = this._checker.getTypeAtLocation(this.Node).getSymbol();
    const properties =
      (symbol &&
        this._checker.getDeclaredTypeOfSymbol(symbol).getProperties()) ||
      [];
    return properties.map((x) => {
      return SerializeSymbol(x, this._checker);
    });
  }

  /**
   * Serializes the class with all needed info.
   */
  public Serialize(): ISerializedClassNode {
    return {
      members: this.GetMembers(),
      constructors: this.GetConstructors(),
    };
  }

  constructor(
    private Node: ts.ClassDeclaration,
    private Parser: DocDocsParserTypescript
  ) {
    const typeChecker = Parser.program.getTypeChecker();
    this._checker = typeChecker;
    if (!Node.name) {
      return;
    }
    const symbol = typeChecker.getSymbolAtLocation(Node.name);
    if (!symbol) {
      LogReport.warn(`Could not get symbol for class.`);
    }
    this._symbol = symbol;
    // console.log(symbol);
    // if (symbol) {
    //   console.log("got symbol");
    // } else {
    //   console.log("no symbol");
    // }
  }
}
