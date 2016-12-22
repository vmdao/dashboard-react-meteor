import React, { Component } from 'react';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import AllTodos from './routes/AllTodos';
import EditTodo from './routes/EditTodo';

import LogoCategoryListPage from './routes/category/LogoCategoryListPage';
import LogoCategoryAddPage from './routes/category/LogoCategoryAddPage';
import LogoCategoryEditPage from './routes/category/LogoCategoryEditPage';

class App extends Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={AllTodos} />
    <Route path='/todo/edit/:id' component={EditTodo} />
    <Route path='/category' component={LogoCategoryListPage} />
    <Route path='/category/add' component={LogoCategoryAddPage} />
    <Route path='/category/edit/:id' component={LogoCategoryEditPage} />
  </Route>
);
