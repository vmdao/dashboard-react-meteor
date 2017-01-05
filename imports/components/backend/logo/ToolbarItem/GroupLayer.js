import React from 'react'
import { Button } from 'semantic-ui-react';


export default class GroupLayer extends React.Component {

    handleAction = (event) => {
        event.preventDefault();
        let value = event.currentTarget.getAttribute('data-font');
        this.props.action(value);
    }
    render() {
        return (
            <Button.Group size={'huge'}>
                <Button icon='long arrow down' compact data-font="forward" onClick={this.handleAction} />
                <Button icon='long arrow up' compact data-font="back" onClick={this.handleAction} />
            </Button.Group >
        )
    }
}