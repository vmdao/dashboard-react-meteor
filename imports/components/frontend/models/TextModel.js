import React, { Component } from 'react';

import _ from 'lodash';
class TextModel extends Component {
    constructor(props) {
        super(props);
        this.textStyleDefault = {
            fontFamily: 'Roboto',
            fontSize: '32px',
            fontWeight: 'Bold',
            lineHeight: 0.9,
            color: '#000000',
        };
    }



    shouldComponentUpdate(nextProps) {
        var styleNew = _.assign(this.textStyleDefault, nextProps.option);
        styleNew.color = nextProps.color || '#000000';
        this.textStyleDefault = styleNew;
        return true;
    }

    getTextContent() {
        var text = this.props.searchText !== '' ? this.props.searchText : this.props.option.content;
        return text.length > 10 ? text.slice(0, 10) : text;
    }

    render() {
        return <span className="logoText" style={this.textStyleDefault}>{this.getTextContent()}</span>
    }
}

export default TextModel;