import React, { Component } from 'react';
import $ from 'jquery';
class BtnGo extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        var that = $(this.refs.btnGo);
        if(this.props.available)
            that.parents().find('.SansSerifLogos').find('.wrap-logo-hidden').removeClass('wrap-logo-hidden');
    }
    render() {
        return (
            <section ref="btnGo" className="btnGo" onClick={this.handleClick}>
                    <button className={"btn btn-default " + (this.props.available ? ' btn-primary' : '')}>Get Started</button>
            </section>
        )
    }
}

export default BtnGo