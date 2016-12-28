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
class LogoStyle extends Component {
  edit = () => {
    this.props.router.push(`/backend/logo-styles/edit/${this.props.style._id}`);
  }
  render() {
    let {style} = this.props;
    if (!style) return;
    return (
      <tr onClick={this.edit}>
        <td>{style.name}</td>
        <td>{style.code}</td>
        <td>{style.keyword}</td>
        <td>{style.active}</td>
      </tr>
    );
  }
}

export default  class LogoStyleList extends Component {
  static propTypes = {
    styles: React.PropTypes.array,
  };
  componentDidMount() {
    // $(ReactDOM.findDOMNode(this.table)).dataTable({
    //   responsive: true,
    //   columnDefs: [
    //     { targets: [-1, -3], className: 'dt-body-right' }
    //   ]
    // });
  }
  render() {
    let {styles} = this.props;
    if (styles.length === 0) return null;
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
                styles.map(style => {
                  return <LogoStyle style={style} key={style._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

