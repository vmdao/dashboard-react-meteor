import React from 'react';
import { Component } from 'react';

import TextModel from './TextModel';

class FormLogoText extends Component {
    constructor(props) {
        super(props);
        this.styleBox = {
            width: '290px',
            height: '52px',
            margin: '0 auto',
        };
    }

    render() {
        return (
            <div ref="logo" className="logo" style={this.styleBox}>
                <TextModel
                    searchText={this.props.searchText}
                    option={this.props.option.text}
                    color={this.props.color}
                    />
            </div>
        )
    }
}

export default FormLogoText;