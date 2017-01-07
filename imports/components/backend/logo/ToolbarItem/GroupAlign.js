import React from 'react'
import { Button } from 'semantic-ui-react'

export default class GroupAlign extends React.Component {
    handleAction = (event) => {
        event.preventDefault();
        let styleString = event.currentTarget.getAttribute('data-font');
        this.props.action({ textAlign: styleString });
    }
    render() {
        return (
            <Button.Group size={'medium'}>
                <Button icon='align left' compact data-font="left" onClick={this.handleAction} />
                <Button icon='align center' compact data-font="center" onClick={this.handleAction} />
                <Button icon='align right' compact data-font="right" onClick={this.handleAction} />
                <Button icon='align justify' compact data-font="justify" onClick={this.handleAction} />
            </Button.Group>
        )

    }
}
