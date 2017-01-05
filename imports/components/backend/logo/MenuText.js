export default class MenuText {
    'use strict'
    constructor($, data) {
        this.$ = $
        this.type = 'text';
        this.fontSize = data.fontSize || 10;
        this.fontFamily = data.fontSize || 'Roboto';
        this.color = data.color || '#000000';
        this.lineHeight = data.lineHeight || 1.4;
        this.letterSpacing = data.letterSpacing || 0;
        this.content = data.content || 'hello';
        this.width = data.width || 0;
        this.height = data.height || 0;
        this.isFixedWidth = data.isFixedWidth || 0;
        this.isFixedHeight = data.isFixedHeight || 0;
        this.textAligh = data.textAligh || 'left';
        this.isBold = data.isBold || 0;
        this.isItalic = data.isItalic || 0;
        this.isUppercase = data.isUppercase || 0;
        this.transparency = 1;
        this.delete;
    }

    create$dom() {

    }

    getInput() {
        return this.$('<div class="controls " id="controls-input"><input type="text" value="Empty"/></div>')
    }

    getAlign() {
        return this.$('<div class="controls " id="controls-input"><input type="text" value="Empty"/></div>');
    }

}