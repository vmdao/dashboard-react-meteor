import React from 'react';
import { Component } from 'react';
import DomainSuggest from './DomainSuggest';
import Domain from './Domain';
import DomainSocial from './DomainSocial';
import Logo from './Logo';
import ChartCriteria from './ChartCriteria';
import axios from 'axios';
import { EventEmitter } from 'fbemitter';
import _ from 'lodash';
import { siteUrl } from './Config';

var emitter = new EventEmitter();
var DOMAINSOCIAL = {
    title: 'Social Networks', domains: [
        { name: '', nameLast: 'facebook', stocked: true, address: 'https://www.facebook.com/' },
        { name: '', nameLast: 'twitter', stocked: true, address: 'https://www.twitter.com/' },
        { name: '', nameLast: 'instagram', stocked: true, address: 'https://www.instagram.com/' },
        { name: '', nameLast: 'medium', stocked: true, address: 'https://www.medium.com/@' },
    ]
};

var LOGO = [
    {
        title: 'Hot - Trend', logos: [
            {
                name: 'Designtool', price: '59.99', code: '#00001', type: 'svgtext', category: 1,
                option: {
                    layoutType: '1',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,
                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-00.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },

            {
                name: 'Designtool', price: '99.99', code: '#00002', type: 'svgtext', category: 2,
                option: {
                    layoutType: '1',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,

                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-03.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },
            {
                name: 'Designtool', price: '69.99', code: '#00003', type: 'svg', category: 1,
                option: {
                    shape: {
                        url: '/images/logos/logo-test-01.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                    }
                }
            },
            {
                name: 'Designtool', price: '39.99', code: '#00004', type: 'text', category: 2,
                option: {
                    layoutType: '1',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,

                        content: 'Designtool'
                    },
                }
            },
            {
                name: 'Designtool', price: '59.99', code: '#00001', type: 'svgtext', category: 1,
                option: {
                    layoutType: '1',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,
                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-00.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },
            {
                name: 'Designtool', price: '59.99', code: '#00001', type: 'svgtext', category: 2,
                option: {
                    layoutType: '3',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,


                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-00.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            }, {
                name: 'Designtool', price: '59.99', code: '#00001', type: 'svgtext',
                option: {
                    layoutType: '1',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,


                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-04.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },
            {
                name: 'Designtool', price: '59.99', code: '#00001', type: 'svgtext',
                option: {
                    layoutType: '3',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,


                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-04.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },
            {
                name: 'Designtool', price: '59.99', code: '#00001', type: 'svgtext',
                option: {
                    layoutType: '1',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,


                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-02.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },
            {
                name: 'Designtool', price: '199.99', code: '#00005', type: 'svgtext',
                option: {
                    layoutType: '3',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,


                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-02.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather',
                        },
                        path: {

                        }
                    }
                }
            },
            {
                name: 'Designtool', price: '299.99', code: '#00006', type: 'svg',
                option: {
                    layoutType: '4',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,


                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-05.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },
            {
                name: 'Designtool', price: '199.99', code: '#00001', type: 'svg',
                option: {
                    layoutType: '4',
                    text: {
                        fontSize: '35px',
                        color: '#000000',
                        isItalic: 0,
                        isBold: 1,


                        content: 'Designtool'
                    },
                    shape: {
                        url: '/images/logos/logo-test-06.svg',
                        text: {
                            dataWordInText: 1,
                            fontSize: '20px',
                            fill: '#000',
                            fontFamily: 'Merriweather'
                        },
                        path: {

                        }
                    }
                }
            },

        ]
    }];

var DOMAIN = {
    title: 'Default TLDs', domains: [
        { name: '', nameLast: 'com', price: '14.99', stocked: true, },
        { name: '', nameLast: 'co', price: '29.99', stocked: true, },
        { name: '', nameLast: 'io', price: '59.99', stocked: true, },
        { name: '', nameLast: 'net', price: '16.99', stocked: true, },
        // { name: '', nameLast: 'xyz', price: '14.99', stocked: true, },
    ]
}


class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = { isCollapse: true, searchText: '', };
       
        this.handleUserInput = this.handleUserInput.bind(this);
        this.typewatch = function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback.bind(this), ms);
            };
        } ();
    }
   
    handleUserInput(searchText, suggest) {
        this.setState({ searchText: searchText, type: suggest, isCollapse:false });
    }
    shouldComponentUpdate(nextProps, nextState) {
        this.typewatch(this._ajaxGetData, 500);
        return true;
    }

    _ajaxGetData() {
        axios.get(siteUrl + `/checkdomain?query=` + this.props.searchText).then(res => {
            var domainsRes = res.data.message;

            DOMAIN.domains.map(domain => {
                var check = _.pick(domainsRes, domain.nameLast);
                var prefix = domain.prefix || '';
                emitter.emit(prefix + domain.nameLast, Object.values(check)[0]);
            });
        });

        DOMAINSOCIAL.domains.map(domain => {
            axios.get(siteUrl + `/checksocial?query=` + this.props.searchText + '&social=' + domain.nameLast).then(res => {
                var check = { stocked: res.data.message.stocked };
                emitter.emit(domain.nameLast, check);
            });
        });
    }

    render() {
        return (
            <div>
                <div className="container-fluid landing-header ">
                    <canvas className="landing-header2"></canvas>
                    <div className="header">
                        <div className="logo-header">
                        </div>
                        <p className="sub-header">The easiest way to create stunning product screenshots without using Photoshop</p>
                    </div>
                    <div className="container container-suggest">
                        <DomainSuggest
                            openSuggestBox={this.state.isCollapse}
                            type={this.props.type}
                            searchText={this.props.searchText}
                            onUserInput={this.props.onUserInput}
                            onClick = {this.handleUserInput} />
                        <div className="wrap-suggest">
                            <div className="container-mason">
                                <div className="container-mason-row">
                                    <ChartCriteria />
                                </div>
                                <div className="container-mason-row">
                                    <Domain
                                        events={emitter}
                                        data={DOMAIN}
                                        searchText={this.props.searchText} />

                                </div>
                                <div className="container-mason-row">
                                    <DomainSocial
                                        events={emitter}
                                        data={DOMAINSOCIAL}
                                        searchText={this.props.searchText} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container container-wrap-logo">
                        {LOGO.map((value, index) => {
                            return <Logo
                                key={index}
                                events={emitter}
                                data={value}
                                searchText={this.props.searchText} />
                        })}
                        <div className="clonePreview"></div>
                    </div>
                </div>
            </div>)
    }
}


export default Workspace;


