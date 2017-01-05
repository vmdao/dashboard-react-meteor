import React from 'react';
import { Component } from 'react';
import Chart from 'react-chartjs';

class ChartCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: false,
            data: [],
            title: 'Criteria Brand Name'
        };
        this.handleClick = this.handleClick.bind(this);

    }
     handleClick() {
        this.setState(prevState => ({
            isCollapse: !prevState.isCollapse
        }));
    }
    render() {
        var RadarChart = Chart.Radar;
        var options = {
            
        };
        var  data = {
    labels: ["Voice", "Write", "Global", "Domain", "Word", "See", "Friendly"],
    datasets: [
        {
            label: "You domain",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "rgba(255,255,255,1)",
            pointBackgroundColor: "rgba(255,255,255,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,255,255,1)",
            data: [65, 59, 50, 82, 56, 55, 40]
        },
    ]
};
        return (
            <div id="DefaultTLDs" className="DefaultTLDs">
                <section className={'section section__default section_chartcriteria' + (this.state.isCollapse ? ' section__collapsed' : '')}>
                    <div className="menu center">
                        <h3 className="menu-title">{this.state.title}</h3>
                        <div onClick={this.handleClick} className="menu-collapse"></div>
                    </div>
                     <div className="grid-row chart-logo">
                        <RadarChart type={'Radar'} data={data} options={options} />
                    </div>
                </section>
            </div >
        )
    }
}
export default ChartCriteria;