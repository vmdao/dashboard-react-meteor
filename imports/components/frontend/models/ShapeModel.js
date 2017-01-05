import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import $ from 'jquery';
import Color from './ColorModel';
// import { siteUrl } from './Config';
class ShapeModel extends Component {
    constructor(props) {
        super(props);
        this.handleSVGLoad = this.handleSVGLoad.bind(this);

        this.boxStyleDefault = {
            width: 'auto',
            height: '50px',
            margin: '0 8px',
            fontFamily: 'Roboto',
            textTransform: 'uppercase'
        };

        this.shapeStyleDefault = {

        };

        this.textStyleDefault = {

        };
    }


    getViewBox(viewBoxString) {
        return viewBoxString.split(' ');
    }

    getAtributeShape() {
        var textItem = this.$dom.find('text');
        var textContentDefaut = textItem.attr('data-content-default');
        var textNum = +textItem.attr('data-text-num') || 0;
        var textWidth = +textItem.attr('data-text-width') || 0;
        var textMargin = +textItem.attr('data-text-margin') || 0;
        var textFix = textItem.attr('data-text-fix') ? !!(+textItem.attr('data-text-fix')) : true;
        var textFillDiff = +textItem.attr('data-text-fill-diff') || 0;
        return { textFix: textFix, textNum: textNum, textMargin: textMargin, textWidth: textWidth, textFillDiff: textFillDiff, textContentDefaut: textContentDefaut }
    }

    setTextStyle(data) {
        var $textItem = this.$dom.find('text');
        if ($textItem.length === 0) return;

        var shapeAttr = this.getAtributeShape();
        if (data.color) {
            this.textStyleDefault.fill = shapeAttr.textFillDiff ? Color.getCorrectTextColor(data.color) : data.color;
        }
        var content = (data.content === '' || data.content === false) ? shapeAttr.textContentDefaut.slice(0, shapeAttr.textNum) : data.content.slice(0, shapeAttr.textNum);
        var textWidth = $textItem.html(content).width();

        $textItem.css(this.textStyleDefault).attr('data-text-width', textWidth);
    }

    setShapeStyle(data) {
        var $shape = this.$dom;
        var shapeAttr = this.getAtributeShape();

        if (!shapeAttr.textFix && shapeAttr.textWidth) {

            var viewboxString = $shape.attr('viewBox');
            var viewBox = this.getViewBox(viewboxString);
            var shapeWidth = shapeAttr.textWidth + shapeAttr.textMargin;

            this.boxStyleDefault.width = shapeWidth + 'px';
            $shape[0].setAttribute('viewBox', '0 0 ' + (shapeWidth * 2) + ' ' + viewBox[3]);
            $shape.find('rect').attr('width', (shapeWidth * 2));
        }

        this.shapeStyleDefault.fill = data.color || this.shapeStyleDefault.fill;

        $shape.css(this.boxStyleDefault);
        $shape.find('path').css(this.shapeStyleDefault);
        $shape.find('rect').css(this.shapeStyleDefault);
        $shape.find('circle').css(this.shapeStyleDefault);
    }

    updateStyle(data) {
        this.setTextStyle(data);
        this.setShapeStyle(data);
    }

    handleSVGLoad() {
        this.$dom = $(this.refs.itemShape._reactInternalInstance._renderedComponent._hostNode).find('svg');

        this.$dom.css(this.boxStyleDefault);
        this.updateStyle({ color: false, content: false });
    }

    shouldComponentUpdate(nextProps) {
        var color = nextProps.color || '#000000';
        var searchText = nextProps.searchText || '';
        this.updateStyle({ color: color, content: searchText });
        return true;
    }

    render() {
        // var shapeUrl = siteUrl + (this.props.option.url.replace('\\', '/'));
         var shapeUrl = (this.props.option.url.replace('\\', '/'));
        return <Isvg ref="itemShape" uniquifyIDs src={shapeUrl} onLoad={this.handleSVGLoad}></Isvg>
    }

}

export default ShapeModel;