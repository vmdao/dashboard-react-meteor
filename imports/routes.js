import React, { Component } from 'react';
import { IndexRoute, Route, Router } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import Home from './routes/Home';

import LoginBackendPage from './routes/auth/LoginBackendPage';
import LoginPage from './routes/auth/LoginPage';
import SiginupPage from './routes/auth/SiginupPage';

import LogoCategoryListPage from './routes/logo-category-page/LogoCategoryListPage';
import LogoCategoryCreatePage from './routes/logo-category-page/LogoCategoryCreatePage';
import LogoCategoryEditPage from './routes/logo-category-page/LogoCategoryEditPage';

import LogoStyleListPage from './routes/logo-style-page/LogoStyleListPage';
import LogoStyleCreatePage from './routes/logo-style-page/LogoStyleCreatePage';
import LogoStyleEditPage from './routes/logo-style-page/LogoStyleEditPage';

import LogoTagListPage from './routes/logo-tag-page/LogoTagListPage';
import LogoTagCreatePage from './routes/logo-tag-page/LogoTagCreatePage';
import LogoTagEditPage from './routes/logo-tag-page/LogoTagEditPage';

import LogoTypeListPage from './routes/logo-type-page/LogoTypeListPage';
import LogoTypeCreatePage from './routes/logo-type-page/LogoTypeCreatePage';
import LogoTypeEditPage from './routes/logo-type-page/LogoTypeEditPage';

import LogoSuggestOrderListPage from './routes/logo-suggestorder-page/LogoSuggestOrderListPage';
import LogoSuggestOrderCreatePage from './routes/logo-suggestorder-page/LogoSuggestOrderCreatePage';
import LogoSuggestOrderEditPage from './routes/logo-suggestorder-page/LogoSuggestOrderEditPage';

import LogoListPage from './routes/logo/LogoListPage';
import LogoCreatePage from './routes/logo/LogoCreatePage';
import LogoEditPage from './routes/logo/LogoEditPage';

import AccountListPage from './routes/account/AccountListPage';
import AccountCreatePage from './routes/account/AccountCreatePage';
import AccountEditPage from './routes/account/AccountEditPage';
import AccountOnlineListPage from './routes/account/AccountOnlineListPage';
import AnalyticListPage from './routes/analytic/AnalyticListPage';
import PaymentListPage from './routes/payment-page/PaymentListPage';
import AppPage from './routes/app/AppPage';


class AppBackend extends Component {
  loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
      var fileref = document.createElement('script')
      fileref.setAttribute("type", "text/javascript")
      fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename);
    }
    document.head.appendChild(fileref);

  }
  componentDidMount() {

    this.loadjscssfile('//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css', 'css');
    
  }

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

class AppFrontend extends Component {
  loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
      var fileref = document.createElement('script')
      fileref.setAttribute("type", "text/javascript")
      fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename);
    }
    document.head.appendChild(fileref);

  }
  componentDidMount() {
    this.loadjscssfile('/css/index.css', 'css');
    this.loadjscssfile('/css/plus.css', 'css');
    this.loadjscssfile('/css/mobile.css', 'css');
    this.loadjscssfile('https://checkout.stripe.com/checkout.js', 'js');
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


export default (
  <Router>
    <Route path='/' component={AppFrontend}>
      <IndexRoute component={AppPage} />
    </Route>
    <Route path='/login' component={LoginPage} />
    <Route path='/signup' component={SiginupPage} />
    <Route path='/backend/login' component={LoginBackendPage} />
    <Route path='/backend' component={AppBackend}>
      <IndexRoute component={Home} />
      <Route path='/backend/logo-categories' component={LogoCategoryListPage} />
      <Route path='/backend/logo-categories/create' component={LogoCategoryCreatePage} />
      <Route path='/backend/logo-categories/edit/:id' component={LogoCategoryEditPage} />

      <Route path='/backend/logo-styles' component={LogoStyleListPage} />
      <Route path='/backend/logo-styles/create' component={LogoStyleCreatePage} />
      <Route path='/backend/logo-styles/edit/:id' component={LogoStyleEditPage} />

      <Route path='/backend/logo-tags' component={LogoTagListPage} />
      <Route path='/backend/logo-tags/create' component={LogoTagCreatePage} />
      <Route path='/backend/logo-tags/edit/:id' component={LogoTagEditPage} />

      <Route path='/backend/logo-types' component={LogoTypeListPage} />
      <Route path='/backend/logo-types/create' component={LogoTypeCreatePage} />
      <Route path='/backend/logo-types/edit/:id' component={LogoTypeEditPage} />

      <Route path='/backend/logo-suggestorders' component={LogoSuggestOrderListPage} />
      <Route path='/backend/logo-suggestorders/create' component={LogoSuggestOrderCreatePage} />
      <Route path='/backend/logo-suggestorders/edit/:id' component={LogoSuggestOrderEditPage} />

      <Route path='/backend/logos' component={LogoListPage} />
      <Route path='/backend/logos/create' component={LogoCreatePage} />
      <Route path='/backend/logos/edit/:id' component={LogoEditPage} />

      <Route path='/backend/accounts' component={AccountListPage} />
      <Route path='/backend/accounts/create' component={AccountCreatePage} />
      <Route path='/backend/accounts/edit/:id' component={AccountEditPage} />
      <Route path='/backend/accounts/online' component={AccountOnlineListPage} />

      <Route path='/backend/analytics' component={AnalyticListPage} />
      <Route path='/backend/payments' component={PaymentListPage} />

    </Route>
  </Router>
);
