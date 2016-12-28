import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Dropzone from 'react-dropzone';
import { ImageFiles } from '../../../api/ImageFiles';
import $ from 'jquery';
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

export default class LogoTypeEdit extends Component {
  state = {
    errors: []
  };
  upload = (files) => {
    files.forEach(file => {
      ImageFiles.insert(file, (err, fileObj) => {
        if (err) {
          console.log(err); //in case there is an error, log it to the console
        } else {
          this.addShape(file.preview);
        }
      });
    });
  }

  addShape(url) {
    this.formFeatureImg = url;
    let $imageOld = $('.img-thumbnail');
    let $imageNew = $('<img src="'+ url +'"  class="img-thumbnail" ref alt="Cinque Terre" width="200" height="60" />');
    $imageOld.replaceWith($imageNew);
  }
  update = (e) => {
    e.preventDefault();
    let formActive = ReactDOM.findDOMNode(this.formActive).value;
    let formKeyword = ReactDOM.findDOMNode(this.formKeyword).value;
    let formName = ReactDOM.findDOMNode(this.formName).value;
    let formFeatureImg = this.formFeatureImg || this.props.data.featureImg;
    let { _id } = this.props.data;
     const data = { 
      active: formActive,
      keyword: formKeyword,
      name: formName,
      featureImg: formFeatureImg
    }
    Meteor.call('logoTypes.update',_id, data, (err, res) => {
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
    let data = this.props.data;
    if (!data) return;
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
                  <FormControl type="text" placeholder="0001" defaultValue={data.code} ref={(input) => this.formCode = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formFeature">
                <Col componentClass={ControlLabel} sm={2}>
                Feature
                </Col>
                <Col sm={6}>
                    <div className="box-add" style={{ float: 'left', width: '4.5%', minWidth: 40 }}>
                        <Dropzone style={{
                        width: 35,
                        height: 35,
                        borderWidth: 1,
                        borderColor: '#666',
                        borderStyle: 'dashed',
                        borderRadius: 5,
                        textAlign: 'center',
                        fontSize: 23,
                        marginBottom: 10,
                        cursor: 'pointer'
                        }} onDrop={this.upload}>
                        <span className="icon-nargela-upload rubix-icon"></span>
                        </Dropzone>
                    </div>
                    <img src={data.featureImg} className="img-thumbnail" ref alt="Feature type" width="200" height="60" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect" >
                <Col componentClass={ControlLabel} sm={2}>
                  Active
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" defaultValue={data.active} ref={(input) => this.formActive = input} >
                    <option value="1">On</option>
                    <option value="0">Off</option>
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education" defaultValue={data.name} ref={(input) => this.formName = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formKeyword">
                <Col componentClass={ControlLabel} sm={2}>
                  Keyword
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education, school, trainning" defaultValue={data.keyword} ref={(input) => this.formKeyword = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formSubmit">
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Update
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

