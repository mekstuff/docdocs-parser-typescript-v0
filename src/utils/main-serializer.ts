import ts from "typescript";
import { JSDocTagNode } from "../nodes/jsdoc-tag-node.js";

export interface ISerializedSignature {
  parameters: ISerializedSymbol[];
  documentation: string;
  returnType: string;
  _getSignature: () => ts.Signature;
}
/**
 * Serializes the signature object
 */
const SerializeSignature = (
  signature: ts.Signature,
  checker: ts.TypeChecker
): ISerializedSignature => {
  return {
    parameters: signature.parameters.map((signature) => {
      return SerializeSymbol(signature, checker);
    }),
    documentation: ts.displayPartsToString(
      signature.getDocumentationComment(checker)
    ),
    returnType: TypeToString(checker, signature.getReturnType()),
    _getSignature: () => {
      return signature;
    },
  };
};

export interface ISerializedSymbol {
  name: string;
  documentation: string;
  type: string;
  isMethod: boolean;
  isProperty: boolean;
  jsdoctags: JSDocTagNode[];
  getModifierFlags: () => {
    Public: boolean;
    Private: boolean;
    Abstract: boolean;
    Static: boolean;
    Optional: boolean;
    Readonly: boolean;
  };
  _getSymbol: () => ts.Symbol;
}
/**
 * Serializes the symbol object.
 */
const SerializeSymbol = (
  symbol: ts.Symbol,
  checker: ts.TypeChecker
): ISerializedSymbol => {
  const declaration = symbol.getDeclarations()![0];
  const isProperty = ts.isPropertyDeclaration(declaration);
  const isMethod = ts.isMethodDeclaration(declaration);

  const IS_PRIVATE_FLAG = hasFlag(
    ts.getCombinedModifierFlags(declaration),
    ts.ModifierFlags.Private
  );
  let IS_PUBLIC_FLAG = true;
  if (IS_PRIVATE_FLAG) {
    IS_PUBLIC_FLAG = false;
  }
  return {
    name: symbol.getName(),
    documentation: ts.displayPartsToString(
      symbol.getDocumentationComment(checker)
    ),
    type: TypeToString(
      checker,
      checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
    ),
    isProperty: isProperty,
    isMethod: isMethod,
    jsdoctags: symbol.getJsDocTags().map((x) => new JSDocTagNode(x)),
    getModifierFlags() {
      return {
        Public: IS_PUBLIC_FLAG,
        Private: IS_PRIVATE_FLAG,
        Abstract: hasFlag(
          ts.getCombinedModifierFlags(declaration),
          ts.ModifierFlags.Abstract
        ),
        Static: hasFlag(
          ts.getCombinedModifierFlags(declaration),
          ts.ModifierFlags.Static
        ),
        Optional: hasFlag(
          ts.getCombinedModifierFlags(declaration),
          ts.SymbolFlags.Optional
        ),
        Readonly: hasFlag(
          ts.getCombinedModifierFlags(declaration),
          ts.ModifierFlags.Readonly
        ),
      };
    },
    _getSymbol() {
      return symbol;
    },
  };
};

/**
 * Convets a type to string using `checker.typeToString`
 */
const TypeToString = (checker: ts.TypeChecker, Type: ts.Type) => {
  return checker.typeToString(Type);
};

/***/
export function hasFlag(Flag: number, targetFlag: number): boolean {
  return (Flag & targetFlag) === targetFlag;
}

export { SerializeSignature, SerializeSymbol, TypeToString };
