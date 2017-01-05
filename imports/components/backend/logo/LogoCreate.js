import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LogoWorkspace from './LogoWorkspace';

import {
  Row,
  Col,
  Grid,
  Form,
  Alert,
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  ControlLabel,
} from '@sketchpixy/rubix';

export default class LogoCreate extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
  };
  state = {
    errors: []
  };
  create = (e) => {
    e.preventDefault();
    const data = {
      code: ReactDOM.findDOMNode(this.formCode).value,
      active: ReactDOM.findDOMNode(this.formActive).value,
      keyword: ReactDOM.findDOMNode(this.formKeyword).value,
      name: ReactDOM.findDOMNode(this.formName).value,
      category:  ReactDOM.findDOMNode(this.formCategories).value,
      style:  ReactDOM.findDOMNode(this.formStyles).value,
      type:  ReactDOM.findDOMNode(this.formTypes).value,
      tag: ReactDOM.findDOMNode(this.formTags).value,
    }
    Meteor.call('logos.create', data, (err, res) => {
      if (err) {
        this.setState({
          errors: [].concat(err),
        });
        return;
      }
      const logoSuggestOrdersData = {
        'category._id': data.category,
        'style._id': data.style,
        'type._id': data.type,
      }
      Meteor.call('logoSuggestOrders.updateCount', logoSuggestOrdersData, (err, res) =>{

      })
      alert('OK');
      this.setState({ errors: [] });
    });

  }

  render() {

    let errors = this.state.errors.length ?
      (
        <Alert danger dismissible>
          {this.state.errors.map(({ message }, i) => {
            return <div key={i}>{message}</div>
          })}
        </Alert>
      ) : null;
    return (
      <div>
        {errors}
        <Form horizontal onSubmit={this.create}>
          <FormGroup>
            <Col sm={11}>
              <FormGroup controlId="formCode">
                <Col componentClass={ControlLabel} sm={2}>
                  Code
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="0001" ref={(input) => this.formCode = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  Active
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" ref={(input) => this.formActive = input} >
                    <option value="1">On</option>
                    <option value="0">Off</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formCategories">
                <Col componentClass={ControlLabel} sm={2}>
                  Categories
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" ref={(input) => this.formCategories = input} >
                    {this.props.data.categories.map(category=>{
                        return (<option value={category._id}>{category.name}</option>)
                    })}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formStyles">
                <Col componentClass={ControlLabel} sm={2}>
                  Styles
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" ref={(input) => this.formStyles = input} >
                    {this.props.data.styles.map(style=>{
                        return (<option value={style._id}>{style.name}</option>)
                    })}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formTypes">
                <Col componentClass={ControlLabel} sm={2}>
                  Types
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" ref={(input) => this.formTypes = input} >
                    {this.props.data.types.map(type=>{
                        return (<option value={type._id}>{type.name}</option>)
                    })}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formTags">
                <Col componentClass={ControlLabel} sm={2}>
                  Tags
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" ref={(input) => this.formTags = input} multiple>
                    {this.props.data.tags.map(tag=>{
                        return (<option value={tag._id}>{tag.name}</option>)
                    })}
                  </FormControl>
                </Col>
              </FormGroup>
              
              <FormGroup controlId="formName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education" ref={(input) => this.formName = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formKeyword">
                <Col componentClass={ControlLabel} sm={2}>
                  Keyword
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education, school, trainning" ref={(input) => this.formKeyword = input} />
                </Col>
              </FormGroup>
              <LogoWorkspace />
              <FormGroup controlId="formSubmit">
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Create
		              </Button>
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        </Form>
      </div >
    );
  }
}

