import React, { Component } from 'react';

import Chart from '../../components/Graphs/ChartTorta';
import $ from 'jquery';

const {REACT_APP_SERVER_URL} = process.env;


class GraphTop5ItemsSales extends Component {
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
                for (var i = 0, len = dataReturned.top_items.length; i < len; i++) {
                    arrCAT.push(dataReturned.top_items[i].name);
                    arrTOTAL.push(dataReturned.top_items[i].count);
                }
                //logging to test that arrays were loaded correctly
                console.log('just name items: ', arrCAT);
                console.log('just totals: ', arrTOTAL);

                this.setState({
                    chartData: {
                        labels: arrCAT,
                        datasets: [
                            {
                                label: '# of Transactions',
                                data: arrTOTAL,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',  //red
                                    'rgba(54, 162, 235, 0.6)',  //blue
                                    'rgba(255, 206, 86, 0.6)',  //yellow
                                    'rgba(75, 192, 192, 0.6)',  //green
                                    'rgba(153, 102, 255, 0.6)', //purple
                                    'rgba(255, 159, 64, 0.6)',  //orange
                                    'rgba(90, 96, 104, 0.6)'    //grey
                                ]
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
                <div className="App-header">
                </div>
                {this.state.isLoaded ? <Chart chartData={this.state.chartData} location={""} /> : <div>Loading...</div>}

            </div>
        );
    }
}


export default GraphTop5ItemsSales;