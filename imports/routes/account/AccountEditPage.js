import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {
    Row,
    Col,
    Grid,
    Panel,
    Alert,
    PanelBody,
    PanelContainer,
} from '@sketchpixy/rubix';

import AccountEdit from '../../components/backend/account/AccountEdit';


class AccountEditPage extends Component {
    static propTypes = {
        account: React.PropTypes.object,
    };
    render() {
        let { account } = this.props;
        if (!account) return null;
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Edit Category:</h3>
                                    <AccountEdit account={account} />
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}

export default createContainer(({ params }) => {
    let { id } = params;
    let _id = id;
    Meteor.subscribe('account', _id);
    return {
        account: Meteor.users.find({ _id}).fetch()[0],
    };
}, AccountEditPage);
