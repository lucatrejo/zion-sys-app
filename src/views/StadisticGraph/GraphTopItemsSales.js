import React, { Component } from 'react';

import Chart from '../../components/Graphs/ChartTorta';
import $ from 'jquery';
import {number} from "prop-types";

const {REACT_APP_SERVER_URL} = process.env;


class GraphTopItemsSales extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:{},
            isLoaded: false

        }
    }

    componentWillMount(){
        // this.getchartData(); // this should be this.getChartData();
        this.getChartData();
    }

    getChartData(){
        $.ajax({
            url: `http://${REACT_APP_SERVER_URL}/sales/top_items`,
            dataType: 'json',
            success: function(dataReturned){
                //logging to test if correct data is being received
                console.log('original data: ', dataReturned);
                var arrCAT = [];
                var arrTOTAL = [];
                var arrMostrar = [];
                var totalVent=0;
                for (var i = 0, len = dataReturned.top_items.length; i < len; i++) {
                    totalVent=totalVent+ new Number(dataReturned.top_items[i].count);
                }
                for (var i = 0, len = dataReturned.top_items.length; i < len; i++) {
                    arrCAT.push(dataReturned.top_items[i].name);
                    var number= (dataReturned.top_items[i].count/totalVent*100).toFixed(0)
                    arrTOTAL.push(number);
                    arrMostrar.push(dataReturned.top_items[i].name+ " "+number+ "%")
                }
                //logging to test that arrays were loaded correctly
                console.log('just name items: ', arrCAT);
                console.log('just totals: ', arrTOTAL);

                this.setState({
                    chartData: {
                        labels: arrMostrar,
                        datasets: [
                            {
                                data: arrTOTAL,
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                    }
                ]
            },
                    isLoaded: true
        });
            }.bind(this),
        });
    }

    render() {
        return (
            <div className="App">
                <h3>PROCENTAJE DE ITEMS MAS VENDIDOS</h3>

                <div className="App-header">
                </div>
                {this.state.isLoaded ? <Chart chartData={this.state.chartData} location={""} /> : <div>Loading...</div>}

            </div>
        );
    }
}


export default GraphTopItemsSales;