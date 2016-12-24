import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Dropzone from 'react-dropzone';
import { SvgFiles } from '../../../api/SvgFiles';
import interact from 'interact.js';
import { ChromePicker } from 'react-color'
import $ from 'jquery';
import {
    Row,
    Col,
    Grid,
} from '@sketchpixy/rubix';
class LogoWorkspace extends Component {
    state = {
        displayColorPicker: false,
    };
    upload = (files) => {
        files.forEach(file => {
            console.log(4567, file)
            //file.owner = Meteor.userId(); //before upload also save the owner of that file
            SvgFiles.insert(file, (err, fileObj) => {
                if (err) {
                    console.log(err); //in case there is an error, log it to the console
                } else {
                    console.log(1234, fileObj);
                    this.addShape(file.preview);
                }
            });
        });
    }

    componentDidMount() {
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
                target.style.height = event.rect.height + 'px';

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.left = x + 'px';
                target.style.top = y + 'px';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

            }).on('up', event => {
                let $elemtent = $(event.target);
                this.showMenu($elemtent.data('element'));

            })
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
    addShape(url) {
        let textData = { position: 'absolute', width: 60, height: 'auto', };
        let textAdd = $('<div class="element shape"><img style="width:100%; height:100%" src="' + url + '"></div>').addClass('draggable').css(textData);
        textData.$dom = textAdd;
        textAdd.data('element', textData);
        textAdd.appendTo(this.workspace);
    }
    handleClickTextAdd = (event) => {
        let textData = { fontSize: 35, position: 'absolute', width: 40, height: 25, };
        let textAdd = $('<div class="element text">Hello</div>').addClass('draggable').css(textData);
        textData.$dom = textAdd;
        textAdd.data('element', textData);
        textAdd.appendTo(this.workspace);
    }
    handleClickWorkspaceColor = event => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };
    handleChangeComplete = color => {
        $(this.workspace).css({ backgroundColor: color.hex });
    }
    getMenuText() {
        let menuText = $('<div class="box-menu-text"></div>');
        let html = '<div style="float:left; width:152px;margin-left:37px; "><input type="text"/></div><div style="float:left;width:35px;margin-left:10px; font-size:22px; text-align:center"> <span class="icon-ikons-text-left rubix-icon"></span></div>';
        menuText.html(html);
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
            <Grid>
                <Row>
                    <Col smOffset={2} sm={10}>
                        <div ref={menu => { this.menu = menu } } style={{ width: '100%', height: 35 }}></div>
                    </Col>
                </Row>
                <Row>
                    <Col smOffset={2} sm={10}>
                        <div className="box-add" style={{ float: 'left', width: '4.5%', minWidth: 20 }}>
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
                                <span className="icon-nargela-upload rubix-icon"></span>
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
                                <span className="icon-fontello-font rubix-icon"></span>
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
                                <span className="icon-fontello-color-adjust rubix-icon"></span>
                            </div>
                            {this.state.displayColorPicker ? <div style={popover}>
                                <div style={cover} onClick={this.handleClose} />
                                <ChromePicker onChangeComplete={this.handleChangeComplete} />
                            </div> : null}
                        </div>
                        <div className="box-workspace" style={{ float: 'left', width: '95.5%' }}>
                            <div ref={(workspace) => { this.workspace = workspace } } style={{ overflow: 'hidden', backgroundColor: '#f5f5f5', width: '100%', height: 367, position: 'relative' }}>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Grid >
        )
    }
}
export default LogoWorkspace;

