import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';

@withRouter
class ApplicationSidebar extends React.Component {
  handleChange = (e) => {
    this._nav.search(e.target.value);
  }
  getPath = (path) => {
    return path;
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <FormControl type='text' placeholder='Search...' onChange={this.handleChange} className='sidebar-search' style={{ border: 'none', background: 'none', margin: '10px 0 0 0', borderBottom: '1px solid #666', color: 'white' }} />
              <div className='sidebar-nav-container'>
                <SidebarNav style={{ marginBottom: 0 }} ref={(c) => this._nav = c}>

                  { /** Pages Section */}
                  <div className='sidebar-header'>PAGES</div>
                  <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard' href='/' />
                  <SidebarNavItem glyph='icon-feather-mail' name='App'>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-outlined-todolist' name='Category'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-outlined-todolist' name='All Categories' href='/category' />
                          <SidebarNavItem glyph='icon-outlined-todolist' name='Add New Category' href='/category/create' />
                  
                        </SidebarNav>
                      </SidebarNavItem>
                      <SidebarNavItem glyph='icon-outlined-todolist' name='Style'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-outlined-todolist' name='All Style' href='/style' />
                          <SidebarNavItem glyph='icon-outlined-todolist' name='Add New Style' href='/style/create' />
              
                        </SidebarNav>
                      </SidebarNavItem>
                      <SidebarNavItem glyph='icon-outlined-todolist' name='Logo'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-outlined-todolist' name='All Logo' href='/logo' />
                          <SidebarNavItem glyph='icon-outlined-todolist' name='Add New Logo' href='/logo/create' />
                        </SidebarNav>
                      </SidebarNavItem>
                    </SidebarNav>
                  </SidebarNavItem>
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div >
    );
  }
}

class DummySidebar extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='sidebar-header'>DUMMY SIDEBAR</div>
            <LoremIpsum query='1p' />
          </Col>
        </Row>
      </Grid>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  render() {
    return (
      <div id='sidebar'>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='/imgs/app/avatars/avatar0.png' width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{ top: 23, fontSize: 16, lineHeight: 1, position: 'relative' }}>Minh Dao Vu</div>
                <div>
                  <Progress id='demo-progress' value={30} color='#ffffff' />
                  <a href='#'>
                    <Icon id='demo-icon' bundle='fontello' glyph='lock-5' />
                  </a>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
