import React from 'react';
import { Component } from 'react';
import FormLogoText from './FormLogoText';
import FormLogoShape from './FormLogoShape';
import FormLogoShapeText from './FormLogoShapeText';
import Color from './ColorModel';
import { Meteor } from 'meteor/meteor'

import $ from 'jquery';
import axios from 'axios';
import _ from 'lodash';
import downloader from './DownloadFile';
// import fontLoader from 'webfontloader';
import imgMaker from 'dom-to-image';
import { siteUrl } from './Config';
class LogoRow2 extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.listVisible = false;
        this.handleClickDownload = this.handleClickDownload.bind(this);
        this.handleClickPreview = this.handleClickPreview.bind(this);
        this.handleClickChangeColor = this.handleClickChangeColor.bind(this);
        this.handleClickShowListColor = this.handleClickShowListColor.bind(this);
        this.handleClickHideListColor = this.handleClickHideListColor.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
        this.handleClickBuy = this.handleClickBuy.bind(this);
        this.preview = $('<div class="preview">'
            + '<div class="preview-item01"></div>'
            + '<div class="preview-template">'
            + '<div class="preview-item preview-item02"></div>'
            + '<div class="preview-item preview-item03"></div>'
            + '<div class="preview-item preview-item04"></div>'
            + '</div>'
            + '</div>');


        this.boxBackgroudStyle = {
            // backgroundColor: 'red',
            minHeight: '270px',
        }
        this._tempStyle = {
            cursor: 'point'
        }


    }

    componentDidMount() {
        const fontLoader = require('webfontloader');
        fontLoader.load({
            google: {
                families: ['Righteous', 'Passion One', 'Roboto:300,400,700', 'Maitree', 'Droid Serif', 'Roboto Slab', 'Merriweather', 'Bungee Inline']
            }
        });
        $('.logoBackground').each(function () {
            var t = shuffleColor();
            $(this).css('background', t);
        });
    }
    show(type) {
        document.addEventListener('click', this.hide);
        this.listVisible = true;
        var $item = $(this.refs.item);
        this.preview.insertAfter($item)
        this.createPreview(type);
        $item.find('.new-price').addClass('hover-price');
        $item.addClass('active-hover-item');
    }

    hide(event) {
        var $target = $(event.target);
        if (!$target.hasClass('colorpalette-dropdown') && !$target.hasClass('colorpalette-dropdown-color'))
            this.preview.detach();
        this.listVisible = false;
        var $item = $(this.refs.item);
        $item.find('.new-price').removeClass('hover-price');
        $item.removeClass('active-hover-item');
        document.removeEventListener('click', this.hide);

    }

    handleClickDownload(event) {
        event.preventDefault();
        var thisItem = $(this.refs.item).find('.meta-data').addClass('active-hover-item');
        var html = $(this.refs.item).find('.logoBackground').html();
        axios.post(siteUrl + `/creator/logo`, {
            html: html,
        }).then(res => {
            downloader('http://labs-dev01.ddns.net' + res.data.status.filename, 'filename.pdf')
        });
    }

    handleClickShowListColor() {
        var $item = $(this.refs.item);
        $item.find('.colorpalette').addClass('colorpalette__toggle');
        document.addEventListener('click', this.handleClickHideListColor);
    }

    handleClickHideListColor() {
        var $item = $(this.refs.item);
        $item.find('.colorpalette').removeClass('colorpalette__toggle');
        document.removeEventListener('click', this.handleClickHideListColor);
    }

    createPreview(type) {
        var $item = $(this.refs.item);
        $item.find('.new-price').addClass('hover-price');
        var preview = this.preview.find('.preview-item01'),
            preview02 = this.preview.find('.preview-item02'),
            preview03 = this.preview.find('.preview-item03'),
            preview04 = this.preview.find('.preview-item04');
        var logo = $item.find('.logo');
        var logoClone = logo.clone();

        logoClone.appendTo('.clonePreview');
        logoClone.css({
            position: 'static',
            transform: 'none',
            margin: 0
        });

        $('html, body').animate({
            scrollTop: $item.offset().top - 65
        }, 1000);

        imgMaker.toPng(logoClone[0]).then(function (dataUrl) {
            logoClone.remove();
            var img = new Image();
            img.src = dataUrl;
            preview.find('img').remove();

            $(img).appendTo(preview);
            var imgClone = $(img).clone();
            $(img).clone().appendTo(preview02);
            $(img).clone().appendTo(preview03);
            $(img).clone().appendTo(preview04);
            $('.preview').find('img').css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -100%)',
                zoom: 0.5
            })

        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    handleClickPreview(event) {
        if (this.listVisible) {
            return;
        };

        this.show();
    }

    handleClickBuy(event) {
        this.props.paymentStripe();
    }

    renderFormLogoType() {
        var type = this.props.data.type;

        if (type === 'text') {
            return <FormLogoText
                color={this.state ? this.state.color : '#000000'}
                option={this.props.data.option}
                searchText={this.props.searchText}
                />;
        } else if (type === 'svgtext') {
            return <FormLogoShapeText
                color={this.state ? this.state.color : '#000000'}
                option={this.props.data.option}
                searchText={this.props.searchText}
                />;
        } else {
            return <FormLogoShape
                color={this.state ? this.state.color : '#000000'}
                option={this.props.data.option}
                searchText={this.props.searchText}
                />;
        }
    }

    handleOnMouseEnter() {
        var thisItem = $(this.refs.item);
        thisItem.find('.grid-row-list').addClass('.active-hover-item');
        thisItem.find('.new-price').addClass('hover-price');
    }
    handleOnMouseLeave() {
        var thisItem = $(this.refs.item);
        thisItem.find('.grid-row-list').removeClass('.active-hover-item');
        if (!this.listVisible)
            thisItem.find('.new-price').removeClass('hover-price');
    }
    handleClickChangeColor(event) {
        var $itemColor = $(event.currentTarget);
        var color = $itemColor.attr('data-color');
        this.boxBackgroudStyle.backgroundColor = Color.getCorrectTextColor(color);
        this.setState({ color: color },
            () => {
                //this.hide();
                this.show();
            });
    }

    render() {
        return (
            <li ref='item' className={'grid-row-list' + (this.state.listVisible ? ' active-hover-item ' : ' ')} onMouseOver={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} onClick={this.handleClickPreview}>
                <div className={"meta-data" + (this.state.listVisible ? ' ' : ' ')}>
                    <div className={'details' + (this.state.listVisible ? ' preview-show' : '')}>

                        <div className="font-meta-name">
                            <span className="code-logo">Code: <span className="code-logo-child">{this.props.data.code}</span></span><br />
                            <span className="author">By: BrandCaff.com</span><br />
                            <span className="old-price">Price: was <span className="old-price-child">$79</span></span><br />
                            <span className="new-price" onClick={this.handleClickBuy}><span className="new-price-child">${this.props.data.price}&nbsp;&nbsp; | &nbsp;&nbsp; Buy now</span></span><br />

                        </div>
                        <div className="preview2">
                            <span className="font-item play" onClick={this.handleClickPreview} title="Show Preview Demo"></span><div onClick={this.handleClickShowListColor} className="colorpalette" id="greycliff">
                                <div className="colorpalette-dropdown">
                                    <i onClick={this.handleClickChangeColor} className="colorpalette-dropdown-color cp-white colorpalette-dropdown-color__selected" data-color="#ffffff"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalettedropdown-color cp-black" data-color="#000000"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalettdropdown-color cp-blue" data-color="#396bf7"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalete-dropdown-color cp-red" data-color="#e65142"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalette-dropdown-color cp-orange" data-color="#EE8E76"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalette-dropdown-color cp-green" data-color="#9D5FFF"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalette-dropdown-color cp-teal" data-color="#00acc1"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalette-dropdown-color cp-yellow" data-color="#fac85d"></i>
                                    <i onClick={this.handleClickChangeColor} className="colorpalette-dropdown-color cp-purple" data-color="#3d4773"></i>
                                </div>
                            </div>
                            <span className="font-item download" onClick={this.handleClickDownload} title="Buy & Download"></span>

                        </div>
                    </div>
                </div>
                <span href="" target="_blank" className="font">
                    <div className="font-text cp-white" id="greycliff-textcolor">
                        <div className="logoBackground" style={this.boxBackgroudStyle}>
                            {this.renderFormLogoType()}
                        </div>
                    </div>
                </span>
            </li>
        )
    }
}

function addClassActiveHoverItem(item) {
    item.addClass('active-hover-item');
}
function removeClassActiveHoverItem(item) {
    item.removeClass('active-hover-item');
}
function shuffleColor() {
    var arr = ['#d9d9c2', 'white', '#7115dd', '#7316b2', '#ddce6e', '#9d7dff', '#52570d', '#b9d2ef', '#5c7cbe', '#2a2e41'];
    var i = Math.floor((Math.random() * 10) + 1);
    var t = arr[i];
    return t;
}
export default LogoRow2;