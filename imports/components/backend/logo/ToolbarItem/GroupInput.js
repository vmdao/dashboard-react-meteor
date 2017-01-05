import React from 'react'
import { Input } from 'semantic-ui-react';

export default class GroupFont extends React.Component {

    handleAction = (event) => {
        event.preventDefault();
        let value = event.target.value
        this.props.action(value);
    }
    render() {

        return (
            <Input style={{fontSize:11.2}} focus placeholder='Content' onChange={this.handleAction} />
        )
    }
}