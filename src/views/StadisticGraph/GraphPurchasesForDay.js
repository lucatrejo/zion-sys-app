import React, { Component } from 'react';

import Chart from '../../components/Graphs/ChartLine';
import $ from 'jquery';

const {REACT_APP_SERVER_URL} = process.env;


class GraphTop5ArtVent extends Component {
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
            url: `http://${REACT_APP_SERVER_URL}/purchases/purchases_month`,
            dataType: 'json',
            success: function(dataReturned){
                //logging to test if correct data is being received
                console.log('original data: ', dataReturned);
                var arrCAT = [];
                var arrTOTAL = [];

                let result = Object.values(dataReturned.purchases.reduce((c, {date}) => {
                    c[date] = c[date] || {date: date,count: 0};
                    c[date].count++;
                    return c;
                }, {}))
                result= result.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()))

                console.log(result);

                for (var i = 0, len = result.length; i < len; i++) {
                    arrCAT.push(result[i].date);
                    arrTOTAL.push(result[i].count);
                }
                //logging to test that arrays were loaded correctly
                console.log('just name items: ', arrCAT);
                console.log('just totals: ', arrTOTAL);

                this.setState({
                    chartData: {
                        labels: arrCAT,
                        datasets: [
                            {
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


export default GraphTop5ArtVent;