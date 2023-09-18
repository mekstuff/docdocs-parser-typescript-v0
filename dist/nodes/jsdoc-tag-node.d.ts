import ts from "typescript";
export declare class JSDocTagNode {
    private TagInfo;
    name: string;
    /**
     * if `getValue` is null, `value` will always be "". So to get if actual value is null, call getValue
     */
    value: string;
    getName(): string;
    getValue(): string | undefined;
    constructor(TagInfo: ts.JSDocTagInfo);
}
