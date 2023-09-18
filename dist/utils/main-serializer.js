import ts from "typescript";
import { JSDocTagNode } from "../nodes/jsdoc-tag-node.js";
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
    const declaration = symbol.getDeclarations()[0];
    const isProperty = ts.isPropertyDeclaration(declaration);
    const isMethod = ts.isMethodDeclaration(declaration);
    const IS_PRIVATE_FLAG = hasFlag(ts.getCombinedModifierFlags(declaration), ts.ModifierFlags.Private);
    let IS_PUBLIC_FLAG = true;
    if (IS_PRIVATE_FLAG) {
        IS_PUBLIC_FLAG = false;
    }
    return {
        name: symbol.getName(),
        documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
        type: TypeToString(checker, checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)),
        isProperty: isProperty,
        isMethod: isMethod,
        jsdoctags: symbol.getJsDocTags().map((x) => new JSDocTagNode(x)),
        getModifierFlags() {
            return {
                Public: IS_PUBLIC_FLAG,
                Private: IS_PRIVATE_FLAG,
                Abstract: hasFlag(ts.getCombinedModifierFlags(declaration), ts.ModifierFlags.Abstract),
                Static: hasFlag(ts.getCombinedModifierFlags(declaration), ts.ModifierFlags.Static),
                Optional: hasFlag(ts.getCombinedModifierFlags(declaration), ts.SymbolFlags.Optional),
                Readonly: hasFlag(ts.getCombinedModifierFlags(declaration), ts.ModifierFlags.Readonly),
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
const TypeToString = (checker, Type) => {
    return checker.typeToString(Type);
};
/***/
export function hasFlag(Flag, targetFlag) {
    return (Flag & targetFlag) === targetFlag;
}
export { SerializeSignature, SerializeSymbol, TypeToString };
//# sourceMappingURL=main-serializer.js.map