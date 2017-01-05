import React from 'react';
import { Component } from 'react';
import StoreName from './StoreName';
// import DomainFeatureRow from './DomainFeatureRow';
import _ from 'lodash';
import $ from 'jquery';

class DomainSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: props.openSuggestBox,
            data: [],
            title: 'Suggest brand name'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSuggestName = this.handleClickSuggestName.bind(this);
         this.handleChange = this.handleChange.bind(this);
        this.searchSuggest = false;
        console.log(props.openSuggestBox);
    }
    handleClick() {
        this.setState(prevState => ({
            isCollapse: !prevState.isCollapse
        }));
    }

    handleClickSuggestName(event) {
        this.props.onUserInput(event.currentTarget.getAttribute('value'), 'suggest');
    }

    componentWillReceiveProps(nextProps) {
        var isCollapse = nextProps.searchText === '' ? true : false;
        var suggest = nextProps.type === 'suggest' ? true : this.setState({ isCollapse: isCollapse, searchText: nextProps.searchText });
            if(isCollapse== false){
                $(this.refs.suggestTitle).css('visibility', 'visible');
            }
            else{
                $(this.refs.suggestTitle).css('visibility', 'collapse');
            }
    }

    renderItemBrandName() {
        var data = _.shuffle(StoreName.getDataGenerate(this.state.searchText || ''));
        return data.map((item, index) => {
            return <li key={index} onClick={this.handleClickSuggestName} value={item.name}> <a className="list"><b>{item.title}</b></a></li>
        })
    }
    handleChange() {
        this.props.onUserInput(
            this.refs.searchText.value
        );
    }
    render() {
        return (
            <div>
                <div id="SearchBar" className="searchbar">
                    <div className="center min-height">
                        <div id="search-bar-extension-state" className="container spread">
                            <div>
                                <img role="presentation" src="../images/search.svg"/>
                                <input id="domain-input" type="text" onChange={this.handleChange} ref="searchText" className="searchbar-input" placeholder="Start typing" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                                <p className="smalltext-input-search">Type your name here</p>
                            </div>

                            <div className="faketext"> <span id="domain-actions-extension-text"></span> </div>
                        </div>
                    </div>
                </div>
                <div id="DefaultTLDs" className="DefaultTLDs DefaultTLDs_domain_suggest">
                    <section className={'section section__default section_domain_suggest' + (this.state.isCollapse ? ' section__collapsed' : '')}>
                        <div ref="suggestTitle"  className=" suggest-div menu center">
                            <h3 className=" menu-title">{this.state.title}</h3>
                            <div onClick={this.handleClick} className="menu-collapse">
                            </div>
                        </div>
                        <ul className="grid-col">
                            {this.renderItemBrandName()}
                        </ul>
                    </section>
                </div >
            </div>
        )
    }
}
export default DomainSuggest;