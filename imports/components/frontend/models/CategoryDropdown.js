import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import BtnGo from './BtnGo';
import _ from 'lodash';
class CategoryDropdown extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                props: props,
                _type: [],
                _tag: [],
                categorySelected: '',
                tagSelected: '',
                typeSelected: '',
                availableBtnGo: false
            };

        this.tagShow = this.tagShow.bind(this);
        this.tagHide = this.tagHide.bind(this);
        this.tagSelect = this.tagSelect.bind(this);

        this.categoryShow = this.categoryShow.bind(this);
        this.categoryHide = this.categoryHide.bind(this);
        this.categorySelect = this.categorySelect.bind(this);

        this.typeShow = this.typeShow.bind(this);
        this.typeHide = this.typeHide.bind(this);
        this.typeSelect = this.typeSelect.bind(this);
        this.availableButtonGo = this.availableButtonGo.bind(this);
        this.countSelect = 0;
        this.selectCategory = false;
    }

    availableButtonGo() {
        
        if (this.state._type.length >= 1 && this.state._tag.length >=1)
            return true;
        return false;
    }
    tagSelect(item, event) {
        var $item = $(event.currentTarget);
        if (!_.some(this.state._tag, item))
            this.state._tag.push(item);
        if (this.availableButtonGo())
            this.countSelect++;
        
        if (this.countSelect == 3) {
            this.setState({ availableBtnGo: true });
        }
        $item.find('.dropdown-item').addClass('tag-item-active');
    }

    tagShow() {
        this.setState({ tagListVisible: true });
        document.addEventListener('click', this.tagHide);
    }

    tagHide() {
        this.setState({ tagListVisible: false });
        var thisTagDropdown = $(this.refs.tagDropdown);
        thisTagDropdown.addClass('type-clicked');
        $(this.refs.showTagSelected).removeClass('invisible');
        document.removeEventListener('click', this.tagHide);
    }

    categorySelect(item, event) {
        var $item = $(event.currentTarget);
        this.setState({ categorySelected: item });
        if (!this.state.categorySelected && this.selectCategory===false)
        {
            this.setState({ categorySelected: item });
            this.countSelect = this.countSelect+1;
            this.selectCategory = true;
        }
        if (this.countSelect == 3) {
            this.setState({ availableBtnGo: true });
        }

    }

    categoryShow() {
        this.setState({ categoryListVisible: true });
        document.addEventListener('click', this.categoryHide);
    }

    categoryHide() {
        this.setState({ categoryListVisible: false });
        var thisCategoryDropdown = $(this.refs.categoryDropdown);
        thisCategoryDropdown.addClass('category-clicked');
        $(this.refs.showCategorySelected).removeClass('invisible');

        document.removeEventListener('click', this.categoryHide);
    }

    typeSelect(item, event) {
        var $item = $(event.currentTarget);
        if (!_.some(this.state._type, item))
            this.state._type.push(item);
        if (this.availableButtonGo())
            this.countSelect++;
        if (this.countSelect == 3) {
            this.setState({ availableBtnGo: true });
        }

        $item.find('.dropdown-item').addClass('type-item-active');
    }

    typeShow() {
        this.setState({ typeListVisible: true });
        document.addEventListener('click', this.typeHide);
    }

    typeHide() {
        this.setState({ typeListVisible: false });
        var thisTypeDropdown = $(this.refs.typeDropdown);
        thisTypeDropdown.addClass('type-clicked');
        $(this.refs.showTypeSelected).removeClass('invisible');

        document.removeEventListener('click', this.typeHide);
    }

    renderCategoryListItems() {
        var items = [];
        for (var i = 0; i < this.props.categoryList.list.length; i++) {
            var item = this.props.categoryList.list[i];
            items.push(
                <div key={i} onClick={this.categorySelect.bind(this, item)}>
                    <span className="dropdown-item">{item.name}</span>
                </div>);
        }
        return items;
    }

    renderTagListItems() {
        var items = [];
        for (var i = 0; i < this.props.tagList.list.length; i++) {
            var item = this.props.tagList.list[i];
            items.push(
                <div key={i} onClick={this.tagSelect.bind(this, item)}>
                    <span className="dropdown-item">{item.name}</span>
                </div>);
        }
        return items;
    }
    renderTypeListItems() {
        var items = [];
        for (var i = 0; i < this.props.typeList.list.length; i++) {
            var item = this.props.typeList.list[i];
            items.push(
                <div key={i} onClick={this.typeSelect.bind(this, item)}>
                    <span className="dropdown-item">{item.name}</span>
                </div>);
        }
        return items;
    }


    render() {

        return (
            <div ref="dropdown" className={"dropdown-container"}>
                <div ref="categoryDropdown" className={"dropdown-display " + this.props.categoryList.title + (this.state.props.categoryListVisible ? " category-clicked" : "")}
                    onClick={this.categoryShow}>
                    <span data-number="0" className="" onChange="">Category </span>
                    <i className="menu-down"></i>
                </div>
                <div ref="tagDropdown" className={"dropdown-display " + this.props.tagList.title + (this.state.props.tagListVisible ? " tag-clicked" : "")}
                    onClick={this.tagShow}>
                    <span data-number="1" className="">Style</span>
                    <i className="menu-down"></i>
                </div>
                <div ref="typeDropdown" className={"dropdown-display " + this.props.typeList.title + (this.state.props.typeListVisible ? " type-clicked" : "")} onClick={this.typeShow}>
                    <span data-number="2" className="">Type</span>
                    <i className="menu-down"></i>
                </div>

                <div className={"dropdown-list " + this.props.categoryList.title + (this.state.categoryListVisible ? " show" : "")}>
                    <div>
                        {this.renderCategoryListItems()}
                    </div>
                </div>
                <div className={"dropdown-list " + this.props.tagList.title + (this.state.tagListVisible ? " show" : "")}>
                    <div>
                        {this.renderTagListItems()}
                    </div>
                </div>
                <div className={"dropdown-list " + this.props.typeList.title + (this.state.typeListVisible ? " show" : "")}>
                    <div>
                        {this.renderTypeListItems()}
                    </div>
                </div>
                <div className="show-dropdown-selected ">
                    <div ref="showCategorySelected" className="show-category-selected invisible">
                        <span>{this.state.categorySelected.name}</span>
                    </div>
                    <div ref="showTagSelected" className="show-tag-selected invisible">
                        {this.state._tag.map(function (item, index) {
                            return (
                                <span key={index}>{item.name}</span>
                            )
                        })}
                    </div>
                    <div ref="showTypeSelected" className="show-type-selected invisible">
                        {this.state._type.map(function (item, index) {
                            return (
                                <span key={index}>{item.name}</span>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <BtnGo available={this.state.availableBtnGo} />
                </div>
            </div>
        );
    }
}

export default CategoryDropdown;
