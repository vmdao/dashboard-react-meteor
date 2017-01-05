import React from 'react'
import { Dropdown } from 'semantic-ui-react';

export default class GroupFontSize extends React.Component {

    handleAction = (event) => {
        event.preventDefault();
        setTimeout(() => {
            let item = this.dropdown.getSelectedItem();
            let value = { fontSize: item.value + 'px' };
            this.props.action(value);
        }, 300);
    }
    render() {
        const fontOptions = [
            { value: '30', text: '30px' },
            { value: '32', text: '32px' },
            { value: '34', text: '34px' },
            { value: '36', text: '36px' },
            { value: '38', text: '38px' },
            { value: '40', text: '40px' },
            { value: '42', text: '42px' },
            { value: '44', text: '44px' },
            { value: '46', text: '46px' },
            { value: '48', text: '48px' },
            { value: '50', text: '50px' },
        ]
        return (
            <Dropdown ref={input => this.dropdown = input} style={{ fontSize: 11.2 }} placeholder='34px' compact selection options={fontOptions} onChange={this.handleAction} />
        )
    }
}