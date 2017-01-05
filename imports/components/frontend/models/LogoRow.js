import React from 'react';
import { Component } from 'react';
import FormLogoText from './FormLogoText';
import FormLogoShape from './FormLogoShape';
import FormLogoShapeText from './FormLogoShapeText';
import Color from './ColorModel';

import $ from 'jquery';
import axios from 'axios';
import downloader from './DownloadFile';
import fontLoader from 'webfontloader';
import imgMaker from 'dom-to-image';
import { siteUrl } from './Config';
class LogoRow extends Component {
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
        this.preview = $('<div class="preview"><div class="config-bar">'
            + '<span class="font-item download" title="Buy & Download"></span>'
            + '<div class="colorpalette" id="greycliff">'
            + '<div class="colorpalette-dropdown">'
            + '<i class="colorpalette-dropdown-color cp-white colorpalette-dropdown-color__selected" data-color="#ffffff"></i>'
            + '<i class="colorpalette-dropdown-color cp-black" data-color="#000000"></i>'
            + '<i class="colorpalette-dropdown-color cp-blue" data-color="#396bf7"></i>'
            + '<i class="colorpalette-dropdown-color cp-red" data-color="#e65142"></i>'
            + '<i class="colorpalette-dropdown-color cp-orange" data-color="#EE8E76"></i>'
            + '<i class="colorpalette-dropdown-color cp-green" data-color="#9D5FFF"></i>'
            + '<i class="colorpalette-dropdown-color cp-teal" data-color="#00acc1"></i>'
            + '<i class="colorpalette-dropdown-color cp-yellow" data-color="#fac85d"></i>'
            + '<i class="colorpalette-dropdown-color cp-purple" data-color="#3d4773"></i>'
            + '</div>'
            + '</div>'
            + '</div><div class="preview-item"></div></div>');
        this.preview.on('click', '.download', this.handleClickDownload);
        this.preview.on('click', '.colorpalette', this.handleClickShowListColor);
        this.preview.on('click', '.colorpalette-dropdown-color', this.handleClickChangeColor);
        this.boxBackgroudStyle = {
            backgroundColor: '#ffffff',
            height: '160px',
        }

        fontLoader.load({
            google: {
                families: ['Righteous', 'Passion One', 'Roboto:300,400,700', 'Maitree', 'Droid Serif', 'Roboto Slab', 'Merriweather', 'Bungee Inline']
            }
        });

    }

    show(type) {
        document.addEventListener('click', this.hide);
        var $item = $(this.refs.item);
        var width = $(window).width();
        var left = $item.position().left;
        if (width < 800 || (width >= 800 && left > 100)) {
            this.preview.insertAfter($item)
        } else {
            var $itemNext = $item.next();
            $itemNext.length === 0 ? this.preview.insertAfter($item) : this.preview.insertAfter($itemNext);
        }
        this.createPreview(type);
    }

    hide(event) {
        var $target = $(event.target);
        if (!$target.hasClass('colorpalette-dropdown') && !$target.hasClass('colorpalette-dropdown-color'))
            this.preview.detach();
        this.listVisible = false;
        document.removeEventListener('click', this.hide);
    }

    handleClickDownload(event) {
        event.preventDefault();
        var html = $(this.refs.item).find('.logoBackground').html();
        axios.post(siteUrl + `/creator/logo`, {
            html: html,
        }).then(res => {
            console.log(res)
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
        var preview = this.preview;
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
            $(img).css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -120%)',
                zoom: 0.65
            })

        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    handleClickPreview(event) {
        if (this.listVisible) return;
        this.show();
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
            <li ref='item' className={'grid-row-list' + (this.state.listVisible ? ' preview-show-large ' : ' ')}>

                <span href="" target="_blank" className="font">
                    <div className="font-text cp-white" id="greycliff-textcolor">
                        <div className="logoBackground" style={this.boxBackgroudStyle}>
                            {this.renderFormLogoType()}
                        </div>
                        <div className={'details' + (this.state.listVisible ? ' preview-show' : '')}>
                            <div className="font-meta-name">
                                <span>{this.props.data.code}</span>:
                                <span className="logo-price">${this.props.data.price}</span>
                            </div>
                            <div className="font-meta-price">

                                <span className="font-item play" onClick={this.handleClickPreview} title="Show Preview Demo"></span>

                            </div>
                        </div>
                    </div>
                </span>
            </li>
        )
    }
}

export default LogoRow;