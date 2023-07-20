import ts from "typescript";
/**
 * Serializes the signature object
 */
const SerializeSignature = (signature, checker) => {
    return {
        parameters: signature.parameters.map((signature) => {
            return SerializeSymbol(signature, checker);
        }),
        documentation: ts.displayPartsToString(signature.getDocumentationComment(checker)),
        returnType: TypeToString(checker, signature.getReturnType()),
        _getSignature: () => {
            return signature;
        },
    };
};
/**
 * Serializes the symbol object.
 */
const SerializeSymbol = (symbol, checker) => {
    // console.log(hasFlag(symbol.flags, ts.SymbolFlags.Optional), symbol.getName());
    return {
        name: symbol.getName(),
        documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
        type: TypeToString(checker, checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)),
    };
};
/**
 * Convets a type to string using `checker.typeToString`
 */
const TypeToString = (checker, Type) => {
    return checker.typeToString(Type);
};
/***/
export function hasFlag(Flag, targetFlag) {
    return (Flag & targetFlag) === targetFlag;
}
export { SerializeSignature, SerializeSymbol, TypeToString };
//# sourceMappingURL=main-serializer.js.map