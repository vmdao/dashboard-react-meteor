import React, { Component } from 'react';
import LoginForm from '../../components/frontend/auth/LoginForm';
export default class AuthenticationPage extends Component {

  render() {
    analytics.track( '[PAGE]Login', {
        title: 'Page Login'
    });
    const style = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'block',
      overflow: 'auto',
      position: 'fixed',

      background: 'linear - gradient(239deg, #02d2a5, #1f1a61, #670272, #ff5c00)',
      backgroundSize: '800% 800%',
      animation: 'AnimationName 49s ease infinite',
    }
    return (
      <div id='auth-container' style={style} className='login'>
        <div id='auth-row' style={{ margin: 'auto', display: 'block', marginTop: 50 }}>
          <div id='auth-cell'>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
