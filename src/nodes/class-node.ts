import ts from "typescript";
import { Console } from "@mekstuff/logreport";
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
  inheritanceSymbol: ISerializedSymbol | undefined;
  symbol: ISerializedSymbol;
}

/**
 * A Node for classes.
 */
export class ClassNode {
  private _checker: ts.TypeChecker;
  private _symbol: ts.Symbol | undefined;

  /**
   * Gets inheritance of the class.
   */
  private GetInheritanceSymbol(): ISerializedSymbol | undefined {
    const Type = this._checker.getTypeAtLocation(this.Node);
    const BaseType = Type.getBaseTypes()?.[0];
    if (!BaseType) {
      return undefined;
    }
    const SYMBOL = BaseType.getSymbol();
    if (SYMBOL) {
      return SerializeSymbol(SYMBOL, this._checker);
    }
    return undefined;
  }

  /**
   * Serializes the classes constructors.
   */
  private GetConstructors() {
    if (!this._symbol) {
      Console.warn("No symbols for class node.");
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
    //TODO: if static member is included then it's not considered a member
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
      inheritanceSymbol: this.GetInheritanceSymbol(),
      symbol: SerializeSymbol(this._symbol!, this._checker),
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
      Console.warn(`Could not get symbol for class.`);
    }
    this._symbol = symbol;
  }
}
