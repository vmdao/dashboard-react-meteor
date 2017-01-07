import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react';
import { CompactPicker } from 'react-color';

export default class GroupStyle extends React.Component {
    state = {
        displayColorPicker1: false,
        displayColorPicker2: false,
        displayColorPicker3: false,
    };
    handleClickWorkspaceColor1 = event => {
        event.preventDefault();
        this.setState({ displayColorPicker1: !this.state.displayColorPicker1 });
    }
    handleClickWorkspaceColor2 = event => {
        event.preventDefault();
        this.setState({ displayColorPicker2: !this.state.displayColorPicker2 });
    }
    handleClickWorkspaceColor3 = event => {
        event.preventDefault();
        this.setState({ displayColorPicker3: !this.state.displayColorPicker3 });
    }
    handleClose = () => {
        this.setState({
            displayColorPicker1: false,
            displayColorPicker2: false,
            displayColorPicker3: false,
        })
    };
    handleChangeComplete = (event) => {
        let value = {};
        if (this.state.displayColorPicker1 === true) {
            value = { color1: { fill: event.hex } };
        } else if (this.state.displayColorPicker2 === true) {
            value = { color2: { fill: event.hex } };
        } else if (this.state.displayColorPicker3 === true) {
            value = { color3: { fill: event.hex } };
        }
        this.props.action(value)
    }
    handleAction = (event) => {
        event.preventDefault();
        let styleString = event.currentTarget.getAttribute('data-font');
        let style = {};
        switch (styleString) {
            case 'uppercase': {
                style.textTransform = 'uppercase'
                break;
            }
            case 'bold': {
                style.fontWeight = '700'
                break;
            }
            case 'italic': {
                style.fontStyle = 'italic';
                break;
            }
        }
        this.props.action(style);
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
            <Button.Group size={'medium'}>

                <Button icon='adjust' compact data-font="color1" onClick={this.handleClickWorkspaceColor1} />
                {this.state.displayColorPicker1 ?
                    <div style={popover}>
                        <div style={cover} onClick={this.handleClose} />
                        <CompactPicker onChangeComplete={this.handleChangeComplete} />
                    </div> : null}
                <Button icon='adjust' compact data-font="color2" onClick={this.handleClickWorkspaceColor2} />
                {this.state.displayColorPicker2 ?
                    <div style={popover}>
                        <div style={cover} onClick={this.handleClose} />
                        <CompactPicker onChangeComplete={this.handleChangeComplete} />
                    </div> : null}
                <Button icon='adjust' compact data-font="color3" onClick={this.handleClickWorkspaceColor3} />
                {this.state.displayColorPicker3 ?
                    <div style={popover}>
                        <div style={cover} onClick={this.handleClose} />
                        <CompactPicker onChangeComplete={this.handleChangeComplete} />
                    </div> : null}
            </Button.Group >
        )
    }
}