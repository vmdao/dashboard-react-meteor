import React from 'react';
import { Component } from 'react';

import ShapeModel from './ShapeModel';


class FormLogoShapeText extends Component {
    constructor(props) {
        super(props);
        this.layoutType = this.props.option.layoutType;
        this.styleBox = {
            display: 'flex',
            alignItems: 'center'
        };

        this.styleBoxBackground = {
            backgroundColor: '#ffffff',
            height: '140px',
        }
    }
    render() {
       
        return (
            <div ref="logo" className="logo" style={this.styleBox}>
                <ShapeModel
                    color={this.props.color}
                    searchText={this.props.searchText}
                    option={this.props.option.shape}
                    />
            </div>
        )
    }
}

export default FormLogoShapeText;