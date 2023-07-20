import ts from "typescript";

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
}
/**
 * Serializes the symbol object.
 */
const SerializeSymbol = (
  symbol: ts.Symbol,
  checker: ts.TypeChecker
): ISerializedSymbol => {
  // console.log(hasFlag(symbol.flags, ts.SymbolFlags.Optional), symbol.getName());
  return {
    name: symbol.getName(),
    documentation: ts.displayPartsToString(
      symbol.getDocumentationComment(checker)
    ),
    type: TypeToString(
      checker,
      checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
    ),
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
