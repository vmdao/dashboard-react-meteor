import React from "react";
import reactCSS from 'reactcss';
import classNames from 'classnames';
import { Button } from 'semantic-ui-react';
import { GroupColor, GroupFormat, GroupInput, GroupFontSize, GroupFontFamily, GroupDelete, GroupLayer, GroupStyle, GroupAlign, Input, Align, Style, Format, Color } from './ToolbarItem/ToolbarItem';

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    eventChangeContent = (event) => {
        let content = event.currentTarget.value;
        this.props.element.find('.inner').html(content);
    }

    eventChangeAlign = (value) => {
        this.props.element.css(value);
    }

    eventChangeStyle = (value) => {
        this.props.element.css(value);
    }

    eventChangeColorShape = (value) => {
        for (let selector in value) {
            this.props.element.find('.' + selector).attr(value[selector]);
        }
    }

    eventChangeFont = (value) => {
        this.props.element.css(value);
    }

    eventChangeContent = (value) => {
        this.props.element.find('.inner').html(value);
    }

    eventChangeLayer = (value) => {
        if (value === 'forward') {
            let nodeNext = this.props.element.next();
            this.props.element.after(nodeNext);
        } else {
            let nodePrev = this.props.element.prev();
            this.props.element.after(nodePrev);
        }
    }

    eventChangeDelete = (value) => {
        this.props.element.remove();
    }

    render() {
        let className = classNames({
            'controls': true,
            'active': false,
        });
        const styles = reactCSS({
            'default': {
                card: {
                    background: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,.15)',
                },
                group: {
                    position: 'absolute',
                    top: -44
                },
            },
        });
        let type = this.props.type;
        
        return (
            type === 'text' ? (
                <div className={className} style={styles.group} >
                    <GroupInput action={this.eventChangeContent} />
                    {'   '}
                    <GroupFontSize action={this.eventChangeFont} />
                    {'   '}
                    <GroupFontFamily action={this.eventChangeFont} />
                    {'   '}
                    <GroupFormat action={this.eventChangeFont} />
                    {'   '}
                    <GroupStyle action={this.eventChangeStyle} />
                    {'   '}
                    <GroupAlign action={this.eventChangeAlign} />
                    {'   '}
                    <GroupLayer action={this.eventChangeLayer} />
                    {'   '}
                    <GroupDelete action={this.eventChangeDelete} />

                </div >)
                : (
                    <div className={className} style={styles.group} >
                        <GroupColor action={this.eventChangeColorShape} />
                        {'   '}
                        <GroupLayer action={this.eventChangeLayer} />
                        {'   '}
                        <GroupDelete action={this.eventChangeDelete} />
                    </div >)
        )
    }
}
// <Input action={this.eventChangeContent} />
// <Align action={this.eventChangeAlign} />
// <Style action={this.eventChangeStyle} />
// <Color action={this.eventChangeColor} />