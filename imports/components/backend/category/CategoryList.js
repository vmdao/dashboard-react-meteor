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
class Category extends Component {
  edit = () => {
    this.props.router.push(`/category/edit/${this.props.category._id}`);
  }
  render() {
    let {category} = this.props;
    return (
      <tr onClick={this.edit}>
        <td>{category.name}</td>
        <td>{category.code}</td>
        <td>{category.keyword}</td>
        <td>{category.active}</td>
      </tr>
    );
  }
}

class CategoryList extends Component {
  static propTypes = {
    categories: React.PropTypes.array,
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
    let {categories} = this.props;
    if (categories.length === 0) return null;
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
                categories.map(category => {
                  return <Category category={category} key={category._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}


export default CategoryList;
