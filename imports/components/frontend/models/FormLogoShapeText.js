import React from 'react';
import { Component } from 'react';

import ShapeModel from './ShapeModel';
import TextModel from './TextModel';

class FormLogoShapeText extends Component {
    constructor(props) {
        super(props);
        this.layoutType = this.props.option.layoutType;
        this.styleBox = {
            display: 'flex',
            alignItems: 'center'
        };
    }

    componentWillMount() {
        this.setIdeaLayout();
    }

    setIdeaLayout() {
        switch (this.layoutType) {
            case '1': {
                this.styleBox.flexDirection = 'row';
                break;
            }
            case '2': {
                this.styleBox.flexDirection = 'row-reverse';
                break;
            }
            case '3': {
                this.styleBox.flexDirection = 'column';
                break;
            }
        }
    }

    render() {
        return (
            <div ref="logo" className="logo" style={this.styleBox}>
                <ShapeModel
                    searchText={this.props.searchText}
                    option={this.props.option.shape}
                    color={this.props.color}
                    />
                <TextModel
                    searchText={this.props.searchText}
                    option={this.props.option.text}
                    color={this.props.color}
                    />
            </div>
        )
    }
}

export default FormLogoShapeText;