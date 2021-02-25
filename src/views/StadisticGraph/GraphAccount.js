import React, { Component } from 'react';

import Chart from '../../components/Graphs/ChartTorta';
import $ from 'jquery';

const {REACT_APP_SERVER_URL} = process.env;


class GraphAccount extends Component {
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
            url: `http://${REACT_APP_SERVER_URL}/customers/up_to_date`,
            dataType: 'json',
            success: function(up_to_date){

                $.ajax({
                    url: `http://${REACT_APP_SERVER_URL}/customers/debtors`,
                    dataType: 'json',
                    success: function(debtors){
                        $.ajax({
                            url: `http://${REACT_APP_SERVER_URL}/customers/morosos`,
                            dataType: 'json',
                            success: function(morosos){
                                var arrTOTAL = [];
                                var arrMostrar = [];
                                var totalUpToDate=up_to_date.result.length;

                                var totalDentors=debtors.result.length;
                                var totalMorosos=morosos.result.length;
                                var total=0;


                                total=totalUpToDate+totalDentors+totalMorosos;

                                console.log(
                                    "asdasda"+ totalMorosos)
                                    arrTOTAL.push((totalUpToDate/total*100).toFixed(0));
                                arrMostrar.push("Cuentas al dia:"+ ":  "+(totalUpToDate/total*100).toFixed(0)+ "%")

                                arrTOTAL.push((totalDentors/total*100).toFixed(0));
                                arrMostrar.push("Cuentas en deuda:"+ ":  "+(totalDentors/total*100).toFixed(0)+ "%")

                                arrTOTAL.push((totalMorosos/total*100).toFixed(0));
                                arrMostrar.push("Cuentas en mora:"+ ":  "+(totalMorosos/total*100).toFixed(0)+ "%")





                                this.setState({
                                    chartData: {
                                        labels: arrMostrar,
                                        datasets: [
                                            {
                                                data: arrTOTAL,
                                                backgroundColor: [
                                                    'rgb(87, 137, 0)',
                                                    'rgb(242, 242, 70)',
                                                    'rgb(227, 0, 0)',
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                    'rgba(255, 206, 86, 0.2)',
                                                    'rgba(75, 192, 192, 0.2)',
                                                    'rgba(153, 102, 255, 0.2)',
                                                    'rgba(255, 159, 64, 0.2)'
                                                ],
                                                borderColor: [
                                                    'rgb(87, 137, 0)',
                                                    'rgb(242, 242, 70)',
                                                    'rgb(227, 0, 0)',
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
            }.bind(this),
        });
            }.bind(this),
        });
    }

    render() {
        return (
            <div className="App">
                <h3>REPORTE DEL ESTADO DE CUENTAS</h3>

                <div className="App-header">
                </div>
                {this.state.isLoaded ? <Chart chartData={this.state.chartData} location={""} /> : <div>Loading...</div>}

            </div>
        );
    }
}


export default GraphAccount;