import React from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import Slider from 'rc-slider';
export default class GroupFormat extends React.Component {
    handleActionLineHeight = value => {
        this.props.action({ lineHeight: value });
    }
    handleActionLetterSpacing = value => {
        this.props.action({ letterSpacing: value });
    }
    handleActionTransparency = value => {
        this.props.action({ opacity: value });
    }
    ç(v) {
        return `${v} %`;
    }
    render() {
        return (
            <Menu style={{ fontSize: 10.75 }} compact>
                <Dropdown text='Aligns' simple className='item'>
                    <Dropdown.Menu >
                        <Dropdown.Item style={{ width: 200 }}> Line Height
                            <Slider tipTransitionName="rc-slider-tooltip-zoom-down" min={0.5} max={2} step={0.1} defaultValue={1.4} tipFormatter={this.percentFormatter} onChange={this.handleActionLineHeight} />
                        </Dropdown.Item>
                        <Dropdown.Item style={{ width: 200 }}> Kerning
                            <Slider tipTransitionName="rc-slider-tooltip-zoom-down" min={-30} max={30} step={1} defaultValue={0} onChange={this.handleActionLetterSpacing} />
                        </Dropdown.Item>
                        <Dropdown.Item style={{ width: 200 }}> Transparency
                            <Slider tipTransitionName="rc-slider-tooltip-zoom-down" min={0} max={1} step={0.01} defaultValue={1} onChange={this.handleActionTransparency} />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        )

    }
}
