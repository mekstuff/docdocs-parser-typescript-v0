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
declare const SerializeSignature: (signature: ts.Signature, checker: ts.TypeChecker) => ISerializedSignature;
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
declare const SerializeSymbol: (symbol: ts.Symbol, checker: ts.TypeChecker) => ISerializedSymbol;
/**
 * Convets a type to string using `checker.typeToString`
 */
declare const TypeToString: (checker: ts.TypeChecker, Type: ts.Type) => string;
/***/
export declare function hasFlag(Flag: number, targetFlag: number): boolean;
export { SerializeSignature, SerializeSymbol, TypeToString };
