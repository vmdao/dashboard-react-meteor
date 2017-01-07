import React from 'react';
import { Component } from 'react';
import LogoRow2 from './LogoRow2';
import CategoryDropdown from './CategoryDropdown';
import axios from 'axios';
import { siteUrl } from './Config';
class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = { isCollapse: false, logos: props.data };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickGetMore = this.handleClickGetMore.bind(this);
        this.ajaxCheckoutStripe = this.ajaxCheckoutStripe.bind(this);
        this.skip = 0;
        // this.handleClickBtnGo = this.handleClickBtnGo.bind(this);
    }

    componentDidMount() {
        // $(this.refs.workspaceLogo).detach();
        let stripeKey = Meteor.settings.public.stripe.testPublishableKey;
        this.paymentStripe = StripeCheckout.configure({
            key: stripeKey,
            image: '/favicon/favicon.ico',
            color: 'black',
            locale: 'auto',
            token: function (token) {
                let stripeToken = token.id;
                Meteor.call('chargeCard', stripeToken, (err, res) => {
                    console.log('done: ', err, res)
                });
            }
        });
        $(window).on('popstate', function () {
            this.paymentStripe.close();
        });
    }

    handleClick() {
        this.setState(prevState => ({
            isCollapse: !prevState.isCollapse
        }));
    }

    handleClickGetMore() {
        this.ajaxGetData();
    }

    ajaxGetData() {
        axios.get(siteUrl + `/item?limit=10&skip=` + this.skip).then(res => {
            var logos = res.data.data;
            var logoStore = this.state.logos;
            logos.map(logo => {
                logo.option = JSON.parse(logo.option);
                logoStore.push(logo);
            });
            this.skip += 10;
            this.setState((prevState) => ({
                logos: logoStore
            }));
        });
    }

    ajaxCheckoutStripe() {

        this.paymentStripe.open({
            name: 'titleStripe',
            description: 'To watermark 400 images',
            amount: 500
        });
    }

    render() {
        var categoryList = {
            title: 'logo-category', list: [
                {
                    name: "Business",
                    hex: "#1B66F2"
                }, {
                    name: "Technology",
                    hex: "#07BA16"
                },
                {
                    name: "Persional",
                    hex: "#1B66F2"
                }, {
                    name: "Real Easte",
                    hex: "#07BA16"
                },
                {
                    name: "Graden",
                    hex: "#1B66F2"
                }, {
                    name: "Healthy",
                    hex: "#07BA16"
                },
                {
                    name: "Food",
                    hex: "#1B66F2"
                }, {
                    name: "Hair Cut",
                    hex: "#07BA16"
                },
                {
                    name: "Sport",
                    hex: "#1B66F2"
                }, {
                    name: "Living",
                    hex: "#07BA16"
                },
                {
                    name: "Beautify",
                    hex: "#1B66F2"
                }, {
                    name: "Technology",
                    hex: "#07BA16"
                },
                {
                    name: "Marketing Home",
                    hex: "#07BA16"
                },
                {
                    name: "Education",
                    hex: "#07BA16"
                }]
        };

        var tagList = {
            title: 'logo-tag',
            list: [
                {
                    name: "Vintage",
                    hex: "#F21B1B"
                },
                {
                    name: "Young",
                    hex: "#1B66F2"
                },
                {
                    name: "Flat",
                    hex: "#07BA16"
                },
                {
                    name: "Old",
                    hex: "#07BA16"
                },
                {
                    name: "Loving",
                    hex: "#07BA16"
                },
                {
                    name: "Colax",
                    hex: "#07BA16"
                },
                {
                    name: "Summmer",
                    hex: "#07BA16"
                },
                {
                    name: "Sales",
                    hex: "#07BA16"
                },
                {
                    name: "Vairal",
                    hex: "#07BA16"
                },
                {
                    name: "Okami",
                    hex: "#07BA16"
                },
                {
                    name: "Calat",
                    hex: "#07BA16"
                },
                {
                    name: "Opapa",
                    hex: "#07BA16"
                },
                {
                    name: "Summmer",
                    hex: "#07BA16"
                },
                {
                    name: "Sales",
                    hex: "#07BA16"
                },
                {
                    name: "Vairal",
                    hex: "#07BA16"
                },
                {
                    name: "Okami",
                    hex: "#07BA16"
                },
                {
                    name: "Calat",
                    hex: "#07BA16"
                },

            ]
        };

        var typeList = {
            title: 'logo-type',
            list: [
                {
                    name: "Unique",
                    hex: "#1B66F2"
                }, {
                    name: "Technology",
                    hex: "#07BA16"
                },
                {
                    name: "Persional",
                    hex: "#1B66F2"
                }, {
                    name: "Real Easte",
                    hex: "#07BA16"
                },
                {
                    name: "Graden",
                    hex: "#1B66F2"
                }, {
                    name: "Healthy",
                    hex: "#07BA16"
                },
                {
                    name: "Food",
                    hex: "#1B66F2"
                }, {
                    name: "Hair Cut",
                    hex: "#07BA16"
                },
                {
                    name: "Sport",
                    hex: "#1B66F2"
                }, {
                    name: "Living",
                    hex: "#07BA16"
                },
                {
                    name: "Beautify",
                    hex: "#1B66F2"
                }, {
                    name: "Technology",
                    hex: "#07BA16"
                },
                {
                    name: "Marketing Home",
                    hex: "#07BA16"
                },
                {
                    name: "Education",
                    hex: "#07BA16"
                }]
        };
        let {data} = this.props
        console.log('logo', data);
        return (
            <div ref="item" id="SansSerifLogos" className="SansSerifLogos">
                <section className={'section ' + (this.state.isCollapse ? ' section__collapsed' : '')}>
                    <p className="SansSerifLogosTitle">Please choose the brief for your logo</p>
                    <div className="menu">
                        <CategoryDropdown
                            categoryList={categoryList}
                            categorySelected={categoryList.list[0]}
                            tagList={tagList}
                            tagSelected={tagList.list[0]}
                            typeList={typeList}
                            typeSelected={typeList.list}
                            />
                    </div>
                </section>
                <section ref="workspaceLogo" className="wrap-logo-hidden">
                    <div className="section section-wrap-all-logo">
                        <ul className="grid-row">
                            {data.map((value, index) => {
                                return <LogoRow2
                                    paymentStripe={this.ajaxCheckoutStripe}
                                    key={index}
                                    hash={index}
                                    data={value}
                                    events={this.props.events}
                                    searchText={this.props.searchText} />
                            })}
                        </ul>
                    </div>
                    <div className="get-more"><a onClick={this.handleClickGetMore} className="btn-get-more">More</a></div>
                </section>
            </div>
        );
    }
}


export default Logo;