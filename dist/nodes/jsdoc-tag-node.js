import ts from "typescript";
export class JSDocTagNode {
    getName() {
        return this.TagInfo.name;
    }
    getValue() {
        return this.TagInfo.text
            ? ts.displayPartsToString(this.TagInfo.text)
            : undefined;
    }
    constructor(TagInfo) {
        this.TagInfo = TagInfo;
        this.name = this.getName();
        this.value = this.getValue() || "";
    }
}
//# sourceMappingURL=jsdoc-tag-node.js.map