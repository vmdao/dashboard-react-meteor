import React, { Component } from 'react';
export default class BaseModel extends Component {
    'use strict'
    constructor($, type, width, height) {
        super();
        this.$ = $;
        this.type = type;
        this.width = width;
        this.height = height;
        this.scale = 0;
        this.top = 0;
        this.left = 0;
        let content = 213;
        $('<div class="element ' + this.type + '" style="border:1px solid #c5c5c5; width:' + this.width +
            'px; height:' + this.height + 'px"><div class="inner">' + content + '</div></div>')
    }

    create$Dom(content) {
        this.$dom = this.$('<div class="element ' + this.type + '" style="border:1px solid #c5c5c5; width:' + this.width +
            'px; height:' + this.height + 'px"><div class="inner">' + content + '</div></div>');
    }

    get$Dom() {
        return this.$dom;
    }

}

// export default class BaseModel {
//     'use strict'
//     constructor(type, width, height) {

//         this.type = type;
//         this.width = width;
//         this.height = height;
//     }

// }