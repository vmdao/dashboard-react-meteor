import BaseModel from './BaseModel';
export default class TextModel extends BaseModel {
    'use strict'
    constructor($, type, width, height, content) {
        super($, type, width, height);
        this.isFixedWidth = data.isFixedWidth || 0;
        this.isFixedHeight = data.isFixedHeight || 0;
        this.textAligh = data.textAligh || 'left';
        super.create$Dom(content);
    }
}
