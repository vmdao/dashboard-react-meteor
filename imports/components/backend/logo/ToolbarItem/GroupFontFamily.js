import React from 'react'
import { Dropdown } from 'semantic-ui-react';
export default class GroupFontFamily extends React.Component {

    handleAction = (event) => {
        event.preventDefault();
        setTimeout(() => {
            let item = this.dropdown.getSelectedItem();
            let value = { fontFamily: item.value };
            this.props.action(value);
        }, 300);
    }
    render() {
        const fontOptions = [
            { value: 'Roboto', text: 'Roboto' },
            { value: 'Roboto Slab', text: 'Roboto Slab' },
            { value: 'Lato', text: 'Lato' },
            { value: 'Oswald', text: 'Oswald' },
        ]
        return (
            <Dropdown ref={input => this.dropdown = input} style={{ fontSize: 11.2 }} placeholder='Roboto' selection options={fontOptions} onChange={this.handleAction} />
        )
    }
}