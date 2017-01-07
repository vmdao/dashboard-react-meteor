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
    let $workspace = $('#workspace');
    let $workspaceClone = $workspace.clone();
    let workspaceScopeHtml = this.getScopeLogo($workspaceClone);
    let workspaceColor = $workspace.attr('data-color') || '#000000';

    const data = {
      code: ReactDOM.findDOMNode(this.formCode).value,
      active: ReactDOM.findDOMNode(this.formActive).value,
      keyword: ReactDOM.findDOMNode(this.formKeyword).value,
      name: ReactDOM.findDOMNode(this.formName).value,
      category: ReactDOM.findDOMNode(this.formCategories).value,
      style: ReactDOM.findDOMNode(this.formStyles).value,
      type: ReactDOM.findDOMNode(this.formTypes).value,
      tag: ReactDOM.findDOMNode(this.formTags).value,
      logoData: $workspace[0].outerHTML,
      logoScopeData: workspaceScopeHtml,
      workspaceColor: workspaceColor,
      price: ReactDOM.findDOMNode(this.formPrice).value,
      priceOld: ReactDOM.findDOMNode(this.formPriceOld).value,
      author: ReactDOM.findDOMNode(this.formAuthor).value,
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
      Meteor.call('logoSuggestOrders.updateCount', logoSuggestOrdersData, (err, res) => {

      })
      alert('OK');
      this.setState({ errors: [] });
    });

  }
  getScopeLogo($workspace) {
    console.log($workspace);
    $workspace.appendTo('#footer');
    let element = $workspace.find('div.element');
    let positionArray = [];

    element.each((index, item) => {
      let $item = $(item);
      let positionElement = { xMin: $item.position().left, yMin: $item.position().top, xMax: ($item.position().left + $item.width()), yMax: ($item.position().top + $item.height()) }
      positionArray.push(positionElement);
    });
    if (positionArray.length === 0) return
    let xMin = _.minBy(positionArray, o => {
      return o.xMin;
    })
    let yMin = _.minBy(positionArray, o => {
      return o.yMin;
    })
    let xMax = _.maxBy(positionArray, o => {
      return o.xMax;
    })
    let yMax = _.maxBy(positionArray, o => {
      return o.yMax;
    })

    element.each((index, item) => {
      let $item = $(item);
      let size = { left: $item.position().left - xMin.xMin, top: $item.position().top - yMin.yMin }
      $item.css(size);
    });

    $workspace.css({ width: xMax.xMax - xMin.xMin, height: yMax.yMax - yMin.yMin });
    var html = $workspace[0].outerHTML;
    $workspace.remove();
    return html;
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
                    {this.props.data.categories.map(category => {
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
                    {this.props.data.styles.map(style => {
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
                    {this.props.data.types.map(type => {
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
                    {this.props.data.tags.map(tag => {
                      return (<option value={tag._id}>{tag.name}</option>)
                    })}
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={5}>
                  <FormControl type="text" placeholder="Education Small" ref={(input) => this.formName = input} />
                </Col>
                <Col sm={5}>
                  <FormControl type="text" placeholder="Nam Davis" ref={(input) => this.formAuthor = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formKeyword">
                <Col componentClass={ControlLabel} sm={2}>
                  Keyword
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Love, Cute" ref={(input) => this.formKeyword = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formKeyword">
                <Col componentClass={ControlLabel} sm={2}>
                  Price
                </Col>
                <Col sm={5}>
                  <FormControl type="text" placeholder="100" ref={(input) => this.formPrice = input} />
                </Col>
                <Col sm={5}>
                  <FormControl type="text" placeholder="120" ref={(input) => this.formPriceOld = input} />
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

