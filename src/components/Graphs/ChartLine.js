import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class ChartBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    static defaultProps = {
        displayTitle:false,
        displayLegend: false,
        legendPosition:'right',
        location:'City'
    }

    render(){
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:this.props.location,
                            fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />

            </div>
        )
    }
}

export default ChartBar;