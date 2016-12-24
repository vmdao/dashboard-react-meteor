import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {
  Row,
  Col,
  Grid,
  Table,
} from '@sketchpixy/rubix';

@withRouter
class Logo extends Component {
  edit = () => {
    this.props.router.push(`/logo/edit/${this.props.logo._id}`);
  }
  render() {
    let {logo} = this.props;
    if (!logo) return;
    return (
      <tr onClick={this.edit}>
        <td>{logo.name}</td>
        <td>{logo.code}</td>
        <td>{logo.keyword}</td>
        <td>{logo.active}</td>
      </tr>
    );
  }
}

class LogoList extends Component {
  static propTypes = {
    logos: React.PropTypes.array,
  };
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.table)).dataTable({
      responsive: true,
      columnDefs: [
        { targets: [-1, -3], className: 'dt-body-right' }
      ]
    });
  }
  render() {
    let {logos} = this.props;
    if (logos.length === 0) return null;
    return (
      <Grid>
        <Row>
          <Table ref={(c) => this.table = c} className='display' cellSpacing='0' width='100%'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Keyword</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {
                logos.map(logo => {
                  return <Logo logo={logo} key={logo._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

export default LogoList;
