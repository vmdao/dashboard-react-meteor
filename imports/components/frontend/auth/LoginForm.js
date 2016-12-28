import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {
    Row,
    Col,
    Icon,
    Grid,
    Form,
    Badge,
    Panel,
    Button,
    PanelBody,
    FormGroup,
    LoremIpsum,
    InputGroup,
    FormControl,
    ButtonGroup,
    ButtonToolbar,
    PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
export default class LoginForm extends React.Component {
    back = (e) => {
        e.preventDefault();
        let email = ReactDOM.findDOMNode(this.formEmail).value;
        let password = ReactDOM.findDOMNode(this.formPassword).value;
        analytics.track( '[BTN]Login', {
            title: 'Click Button Login'
        });
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                alert('Sign in Fails');
                this.setState({
                    error: err.reason
                });
            } else {
                alert('Sign in OK');
                window.location.href = window.location.origin;
            }
        });
    }

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    getPath = (path) => {
        var dir = this.props.location.pathname.search('rtl') !== -1 ? '' : '';
        path = window.location.origin + `${dir}/${path}`;
        return path;
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={3} smOffset={5} xs={10} xsOffset={1} collapseLeft collapseRight>
                        <PanelContainer controls={false}>
                            <Panel>
                                <PanelBody style={{ padding: 0 }}>
                                    <div className='text-center bg-darkblue fg-white'>
                                        <h3 style={{ margin: 0, padding: 25 }}>Sign in to BrandCaff</h3>
                                    </div>
                                    <div className='bg-hoverblue fg-black50 text-center' style={{ padding: 12.5 }}>
                                        <div>You need to sign in for those awesome features</div>
                                        <div style={{ marginTop: 12.5, marginBottom: 12.5 }}>
                                            <Button id='facebook-btn' lg bsStyle='darkblue' type='submit' onClick={this.back}>
                                                <Icon glyph='icon-fontello-facebook' />
                                                <span>Sign in <span className='hidden-xs'>with facebook</span></span>
                                            </Button>
                                        </div>
                                        <div>
                                            <a id='twitter-link' href='#' onClick={this.back}><Icon glyph='icon-fontello-google' /><span> or with google</span></a>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-center' style={{ padding: 12.5 }}>
                                            or use your account
                          </div>
                                        <div style={{ padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25 }}>
                                            <Form onSubmit={this.back}>
                                                <FormGroup controlId='emailaddress'>
                                                    <InputGroup bsSize='large'>
                                                        <InputGroup.Addon>
                                                            <Icon glyph='icon-fontello-mail' />
                                                        </InputGroup.Addon>
                                                        <FormControl autoFocus type='email' ref={(input) => this.formEmail = input}  className='border-focus-blue' placeholder='hey@brandcaff.com' />
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup controlId='password'>
                                                    <InputGroup bsSize='large'>
                                                        <InputGroup.Addon>
                                                            <Icon glyph='icon-fontello-key' />
                                                        </InputGroup.Addon>
                                                        <FormControl type='password' ref={(input) => this.formPassword = input}  className='border-focus-blue' placeholder='password' />
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Grid>
                                                        <Row>
                                                            <Col xs={6} collapseLeft collapseRight style={{ paddingTop: 10 }}>
                                                                <Link to={this.getPath('signup')}>Create a account</Link>
                                                            </Col>
                                                            <Col xs={6} collapseLeft collapseRight className='text-right'>
                                                                <Button outlined lg type='submit' bsStyle='blue' onClick={this.back}>Login</Button>
                                                            </Col>
                                                        </Row>
                                                    </Grid>
                                                </FormGroup>
                                            </Form>
                                        </div>
                                    </div>
                                </PanelBody>
                            </Panel>
                        </PanelContainer>
                    </Col>
                </Row >
            </Grid >
        );
    }
}
