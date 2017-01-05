import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react';
import { CompactPicker } from 'react-color';

export default class GroupStyle extends React.Component {
    state = {
        displayColorPicker: false,
    };
    handleClickWorkspaceColor = event => {
        event.preventDefault();
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };
    handleChangeComplete = (event) => {
        this.props.action({ color: event.hex })
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
        const fontOptions = [
            { value: 'Roboto', text: 'Roboto' },
            { value: 'Roboto Slab', text: 'Roboto Slab' },
            { value: 'Lato', text: 'Lato' },
            { value: 'Oswald', text: 'Oswald' },
        ]
        return (
            <Button.Group size={'huge'}>
                <Button icon='bold' compact data-font="bold" onClick={this.handleAction} />
                <Button icon='italic' compact data-font="italic" onClick={this.handleAction} />
                <Button icon='text height' compact data-font="uppercase" onClick={this.handleAction} />
                <Button icon='adjust' compact data-font="color" onClick={this.handleClickWorkspaceColor} />
                {this.state.displayColorPicker ?
                    <div style={popover}>
                        <div style={cover} onClick={this.handleClose} />
                        <CompactPicker onChangeComplete={this.handleChangeComplete} />
                    </div> : null}
            </Button.Group >
        )
    }
}