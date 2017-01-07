import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import interact from 'interact.js';
import { ChromePicker } from 'react-color';
import $ from 'jquery';
import TextModel from './TextModel';
import Toolbar from './Toolbar';
import _ from 'lodash'
import {
    Row,
    Col,
    Grid,
    FormGroup,
} from '@sketchpixy/rubix';
export default class LogoWorkspace extends Component {
    state = {
        displayColorPicker: false,
        element: null,
        type: 'text',
    };

    upload = (files) => {
        files.forEach(file => {
            this.addShape(file.preview);
        });
        // let text = new TextModel($, 'text', 100, 100, 'hellooo');
        // console.log(123, text.get$Dom())
    }

    componentDidMount() {

        if (this.props.logoData) {
            let workspaceOld = $('#workspace');
            let workspaceNew = $(this.props.logoData);
            workspaceOld.replaceWith(workspaceNew);
        }
        this.workspace = $('#workspace')[0];

        const fontLoader = require('webfontloader');
        fontLoader.load({
            google: {
                families: ['Roboto', 'Roboto Slab', 'Lato', 'Oswald']
            }
        });

        interact('.draggable')
            .draggable({
                onmove: this.dragMoveListener,
            }).resizable({
                preserveAspectRatio: true,
                edges: { left: true, right: true, bottom: true, top: true }
            }).on('resizemove', event => {
                let target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                // update the element's style

                target.style.width = event.rect.width + 'px';
                if (this.state.type === 'shape') {
                    target.style.height = event.rect.height + 'px';
                    this.state.element.find('svg').css({ width: '100%', height: '100%' })
                }
                //target.style.height = event.rect.height + 'px';

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.left = x + 'px';
                target.style.top = y + 'px';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                console.log(1234, this.setLimitWidthBox(target));
            }).on('click', event => {
                let $element = $(event.currentTarget);
                let type = $element.hasClass('text') ? 'text' : 'shape';
                console.log(type)
                $element.addClass('selected');
                this.setState({
                    type: type,
                    element: $element
                });
                document.addEventListener('click', this.eventClickUnselected.bind(this));
            });
    }
    eventClickUnselected(event) {
        let $elementTarget = $(event.target);
        let $parent = $elementTarget.parent();
        if (!$elementTarget.hasClass('selected') && !$parent.hasClass('selected')) {
            $('.element.selected').removeClass('selected');
        }
        if (!$elementTarget.hasClass('element') && !$parent.hasClass('element')) {
            // this.setState({
            //     type: '',
            //     element: null
            // });
        }
        document.removeEventListener('click', this.eventClickUnselected);// ?? not remove event 
    }

    dragMoveListener(event) {
        let target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.left = x + 'px';
        target.style.top = y + 'px';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    showMenu(element) {
        this.menuText ? this.menuText.detach() : 0;
        this.menuText = this.getMenuText();
        this.menuText.appendTo(this.menu)
    }

    loadSvg(target, url) {
        let that = this;
        // If SVG is supported
        if (typeof SVGRect != "undefined") {
            // Request the SVG file
            var ajax = new XMLHttpRequest();
            ajax.open('GET', url, true);
            ajax.send();
            // Append the SVG to the target
            ajax.onload = function (e) {
                target.html(ajax.responseText);
                return that.formatSvg(target);
            }
        } else {
            // Fallback to png
            target.innerHTML = "<img src='" + url + ".png' />";
        }
    }

    formatSvg(target) {
        let svg = target.find('svg');
        if (!svg) return;
        let nodes = svg.find('*');
        let colors = [];
        let width = svg.width();
        let height = svg.height();
        target.css({ width: width, height: height });
        nodes.each((index, item) => {
            if (item.nodeName !== 'svg' && item.nodeName !== 'text' && item.nodeName !== 'g') {
                let colorFill = $(item).attr('fill') || "#000000";
                colors.push(colorFill);
            }
        });
        this.setSvgClassFillColor(svg, colors);
        return colors;
    }

    setSvgClassFillColor(svg, colors) {
        colors.forEach((color, index) => {
            index++;
            svg.find('[fill="' + color + '"]').addClass('color' + index);
            if (color === '#000000' || color === 'black') {
                svg.find(':not([g])').find(':not([fill])').addClass('color' + index);
            }
        })
    }


    addShape2(url) {
        let textData = { position: 'absolute', width: 60, height: 'auto', };
        let textAdd = $('<div class="element shape"><img style="width:100%; height:100%" src="' + url + '"></div>').addClass('draggable').css(textData);
        textData.$dom = textAdd;
        textAdd.data('element', textData);
        textAdd.appendTo(this.workspace);
    }

    getScopeLogo() {
        let element = $(this.workspace).find('div.element');
        let positionArray = [];

        element.each((index, item) => {
            let $item = $(item);
            let positionElement = { xMin: $item.position().left, yMin: $item.position().top, xMax: ($item.position().left + $item.width()), yMax: ($item.position().top + $item.height()) }
            positionArray.push(positionElement);
        });
        if (positionArray.length === 0) return
        let xMin = _.minBy(positionArray, o => {
            return o.xMin;
        })
        let yMin = _.minBy(positionArray, o => {
            return o.yMin;
        })
        let xMax = _.maxBy(positionArray, o => {
            return o.xMax;
        })
        let yMax = _.maxBy(positionArray, o => {
            return o.yMax;
        })
        return {
            xMax: xMax.xMax, yMax: yMax.yMax, xMin: xMin.xMin, yMin: yMin.yMin
        }
    }
    // addShape(url) {
    //     let textData = { position: 'absolute', width: 60, height: 'auto', };
    //     let textAdd = $('<div class="element shape"></div>').addClass('draggable').css(textData);
    //     textData.$dom = textAdd;
    //     textAdd.data('element', textData);
    //     textAdd.appendTo(this.workspace);
    //     this.loadSvg(textAdd, url);
    // }
    addShape(url) {
        let textData = { style: { position: 'absolute', width: 60, height: 'auto' } };
        let textAdd = $('<div class="element shape"></div>').addClass('draggable').css(textData.style);
        textAdd.appendTo(this.workspace);
        let colors = this.loadSvg(textAdd, url);
        textData.$dom = textAdd;
        textData.colors = colors;
        textAdd.data('element', textData);
    }

    handleClickTextAdd = (event) => {
        let textData = { fontSize: 35, position: 'absolute', };
        let textAdd = $('<div class="element text"><div class="inner" contenteditable="true">Hello</div></div>').addClass('draggable').css(textData);
        textData.$dom = textAdd;
        textAdd.data('element', textData);
        textAdd.appendTo(this.workspace);
        let size = this.setSizeBox(textAdd);
        textAdd.css({ width: 92, height: 69, lineHeight: 1.4 });
        this.setState({
            type: 'text',
            element: textAdd
        })
    }

    setSizeBox = function ($dom) {
        let width = $dom.children('.inner').width() + 20;
        let height = $dom.children('.inner').height();
        return { width: width, height: height }
    }

    setLimitWidthBox(elementSelect) {
        let $elementSelect = $(elementSelect);
        let inner = $elementSelect.children('.inner');
        let minWidth = inner.width();
        inner.css('display', 'inline');
        if (minWidth < inner.width()) {
            $elementSelect.width(inner.width());
            $elementSelect.height(inner.height());
        }
        inner.css('display', '');
        inner.width($elementSelect.width());
        $elementSelect.height(inner.height());
        return { width: inner.width(), height: inner.height() }
    }

    handleClickWorkspaceColor = event => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChangeComplete = color => {
        $(this.workspace).css({ backgroundColor: color.hex }).attr('data-color', color.hex);
    }
    getMenuText() {
        let menuText = $('<div class="box-menu-text"></div>');
        let html = '<div class="controls-item-group"><div class="controls-item"> </div></div>';
        let htmlInput = '<div class="controls-item-group"><div class="controls-item" style="float:left;width:152px;margin-left:37px;"><input type="text" /></div></div>'
        let htmlAlignGroup = '<div class="controls-item-group" style="font-size: 22px">'
            + '<div class="controls-item" style="float:left; margin-left:10px; "><span class="icon-ikons-text-left"></span></div>'
            + '<div class="controls-item" style="float:left; margin-left:10px; "><span class="icon-ikons-text-center"></span></div>'
            + '<div class="controls-item" style="float:left; margin-left:10px; "><span class="icon-ikons-text-right"></span></div>'
            + '<div class="controls-item" style="float:left; margin-left:10px; "><span class="icon-ikons-text-justify"></span></div>'
            + '</div>';

        let htmlStyle = '<div class="controls-item-group" style="font-size: 22px">'
            + '<div class="controls-item" style="float:left; margin-left:10px; ><span class="icon-fontello-bold"></span></div>'
            + '<div class="controls-item" style="float:left; margin-left:10px;><span class="icon-fontello-italic"></span></div>'
            + '</div>';

        let htmlUppercase = '<div class="controls-item-group" style="font-size: 22px">'
            + '<div class="controls-item" style="float:left; margin-left:10px;"><span class="icon-fontello-fontsize-1"></span></div>'
            + '</div>';

        let htmlType = '<div class="controls-item-group">'
            + '<div class="controls-item" style="float:left; margin-left:10px;"><input type="range" id="myRange" value="90"></div>'
            + '<div class="controls-item" style="float:left; margin-left:10px;"><input type="range" id="myRange" value="90"></div>'
            + '</div>';

        let htmlFull = htmlInput + htmlUppercase + htmlAlignGroup + htmlStyle + htmlType;
        menuText.html(htmlFull);
        return menuText;
    }

    render() {

        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <FormGroup style={{ marginTop: 60 }}>
                <Col sm={2} style={{ paddingRight: 0 }}>
                    <div className="box-add" style={{ float: 'right', width: '4.5%', minWidth: 35 }}>
                        <Dropzone style={{
                            width: 35,
                            height: 35,
                            borderWidth: 1,
                            borderColor: '#666',
                            borderStyle: 'dashed',
                            borderRadius: 5,
                            textAlign: 'center',
                            fontSize: 23,
                            marginBottom: 10,
                            cursor: 'pointer'
                        }} onDrop={this.upload}>
                            <span className="icon-nargela-upload rubix-icon" style={{ lineHeight: 1.7 }}></span>
                        </Dropzone>
                        <div onClick={this.handleClickTextAdd} style={{
                            width: 35,
                            height: 35,
                            borderWidth: 1,
                            borderColor: '#666',
                            borderStyle: 'dashed',
                            borderRadius: 5,
                            textAlign: 'center',
                            fontSize: 21,
                            cursor: 'pointer',
                            marginBottom: 10,
                        }}>
                            <span className="icon-fontello-font rubix-icon" style={{ lineHeight: 1.55 }}></span>
                        </div>
                        <div onClick={this.handleClickWorkspaceColor} style={{
                            width: 35,
                            height: 35,
                            borderWidth: 1,
                            borderColor: '#666',
                            borderStyle: 'dashed',
                            borderRadius: 5,
                            textAlign: 'center',
                            fontSize: 21,
                            cursor: 'pointer'
                        }}>
                            <span className="icon-fontello-color-adjust rubix-icon" style={{ lineHeight: 1.55 }}></span>
                        </div>
                        {this.state.displayColorPicker ?
                            <div style={popover}>
                                <div style={cover} onClick={this.handleClose} />
                                <ChromePicker onChangeComplete={this.handleChangeComplete} />
                            </div> : null}
                    </div>
                </Col>
                <Col sm={10} style={{ paddingLeft: 49 }}>
                    <Row>
                        <div ref={menu => { this.menu = menu } } style={{ width: '100%' }}></div>
                    </Row>
                    <Row>
                        <div className="box-workspace">
                            {this.state.element ?
                                <Toolbar element={this.state.element} type={this.state.type} />
                                : null}
                            <div id='workspace' style={{ overflow: 'hidden', backgroundColor: '#f5f5f5', width: '100%', height: 367, position: 'relative' }}>
                            </div>
                        </div>

                    </Row>
                </Col>

            </FormGroup >
        )
    }
}

