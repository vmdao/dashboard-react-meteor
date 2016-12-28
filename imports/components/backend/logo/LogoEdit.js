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

export default class LogoEdit extends Component {
  state = {
    errors: []
  };
  update = (e) => {
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
    let { _id } = this.props.data.logo;
    Meteor.call('logos.update', _id, data, (err, res) => {
      if (err) {
        this.setState({
          errors: [].concat(err),
        });
        return;
      }
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
    let {data} = this.props;
    if (!data) return;
    let {logo} = data;
    if (!logo) return <div></div>;
    return (
      <div>
        {errors}
        <Form horizontal onSubmit={this.update}>
          <FormGroup>
            <Col sm={10}>
              <FormGroup controlId="formCode">
                <Col componentClass={ControlLabel} sm={2}>
                  Code
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="0001"  defaultValue={data.logo.code} ref={(input) => this.formCode = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  Active
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select"  defaultValue={data.logo.active}  ref={(input) => this.formActive = input} >
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
                  <FormControl componentClass="select" placeholder="select"  defaultValue={data.category} ref={(input) => this.formCategories = input} >
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
                  <FormControl componentClass="select" placeholder="select" defaultValue={data.style} ref={(input) => this.formStyles = input} >
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
                  <FormControl componentClass="select" placeholder="select" defaultValue={data.type} ref={(input) => this.formTypes = input} >
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
                  <FormControl componentClass="select" placeholder="select" defaultValue={data.tag} ref={(input) => this.formTags = input} >
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
                  <FormControl type="text" placeholder="Education" defaultValue={data.logo.name} ref={(input) => this.formName = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formKeyword">
                <Col componentClass={ControlLabel} sm={2}>
                  Keyword
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education, school, trainning" defaultValue={data.logo.keyword} ref={(input) => this.formKeyword = input} />
                </Col>
              </FormGroup>
              <FormGroup>
                <LogoWorkspace />
              </FormGroup>
              <FormGroup controlId="formSubmit">
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    UPDATE
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

