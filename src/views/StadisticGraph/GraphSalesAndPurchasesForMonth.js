import React, {Component} from 'react';

import Chart from '../../components/Graphs/ChartArea';
import $ from 'jquery/dist/jquery';

const {REACT_APP_SERVER_URL} = process.env;


class GraphTop5ArtVent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            chartData: {},
            isLoaded: false,

        }

    }


    componentWillMount() {
        // this.getchartData(); // this should be this.getChartData();
        this.getChartData();
    }

    getChartData() {
        $.ajax({
            url: `http://${REACT_APP_SERVER_URL}/purchases/purchases_months`,
            dataType: 'json',
            success: function (dataReturned) {

                console.log('original data: ', dataReturned);
                var arrCAT = [];
                var arrTOTAL = [];

                let result = Object.values(dataReturned.purchases.reduce((c, {date}) => {
                    c[date] = c[date] || {date: date, count: 0};
                    c[date].count++;
                    return c;
                }, {}))
                result = result.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()))
                $.ajax({
                    url: `http://${REACT_APP_SERVER_URL}/sales/count_sales`,
                    dataType: 'json',
                    success: function (dataReturned) {
                        //logging to test if correct data is being received
                        console.log('original data: ', dataReturned);
                        var arrCAT =  [
                            'Enero',
                            'Febrero',
                            'Marzo',
                            'Abril',
                            'Mayo',
                            'Junio',
                            'Julio',
                            'Agosto',
                            'Septiembre',
                            'Octubre',
                            'Noviembre',
                            'Diciembre',

                        ];
                        var arrTOTAL = [];
                        var arrTOTALSortedSales = [];

                        let sortedSales = dataReturned.getCountSales.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()))
//aca empieza ventas
                        let sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                                return ("01" == month);});
                    for (var i = 0, len = sorted.length; i < len; i++) {
                        arrTOTALSortedSales[0]= arrTOTALSortedSales[0]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[0])+Number(sorted[i].count);
                }


                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("02" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[1]= arrTOTALSortedSales[1]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[1])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("03" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[2]= arrTOTALSortedSales[2]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[2])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("04" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[3]= arrTOTALSortedSales[3]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[3])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("05" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[4]= arrTOTALSortedSales[4]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[4])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("06" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[5]= arrTOTALSortedSales[5]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[5])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("07" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[6]=  arrTOTALSortedSales[6]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[6])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("08" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[7]=arrTOTALSortedSales[7]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[7])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("09" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[8]= arrTOTALSortedSales[8]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[8])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("10" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[9]= arrTOTALSortedSales[9]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[9])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("11" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[10]= arrTOTALSortedSales[10]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[10])+Number(sorted[i].count);
                        }

                         sorted = sortedSales.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("12" === month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTALSortedSales[11]= arrTOTALSortedSales[11]==null?Number(sorted[i].count):Number(arrTOTALSortedSales[11])+Number(sorted[i].count);
                        }
//aca empieza compras
                         sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("01" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[0]= arrTOTAL[0]==null?Number(sorted[i].count):Number(arrTOTAL[0])+Number(sorted[i].count);
                        }


                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("02" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[1]= arrTOTAL[1]==null?Number(sorted[i].count):Number(arrTOTAL[1])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("03" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[2]= arrTOTAL[2]==null?Number(sorted[i].count):Number(arrTOTAL[2])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("04" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[3]= arrTOTAL[3]==null?Number(sorted[i].count):Number(arrTOTAL[3])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("05" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[4]= arrTOTAL[4]==null?Number(sorted[i].count):Number(arrTOTAL[4])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("06" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[5]= arrTOTAL[5]==null?Number(sorted[i].count):Number(arrTOTAL[5])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("07" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[6]=  arrTOTAL[6]==null?Number(sorted[i].count):Number(arrTOTAL[6])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("08" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[7]=arrTOTAL[7]==null?Number(sorted[i].count):Number(arrTOTAL[7])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("09" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[8]= arrTOTAL[8]==null?Number(sorted[i].count):Number(arrTOTAL[8])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("10" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[9]= arrTOTAL[9]==null?Number(sorted[i].count):Number(arrTOTAL[9])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("11" == month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[10]= arrTOTAL[10]==null?Number(sorted[i].count):Number(arrTOTAL[10])+Number(sorted[i].count);
                        }

                        sorted = result.filter(e => {
                            var month = e.date.split('/')[1]; // Or, var month = e.date.split('-')[1];
                            return ("12" === month);});
                        for (var i = 0, len = sorted.length; i < len; i++) {
                            arrTOTAL[11]= arrTOTAL[11]==null?Number(sorted[i].count):Number(arrTOTAL[11])+Number(sorted[i].count);
                        }



                        //logging to test that arrays were loaded correctly
                        console.log('just name items: ', arrCAT);
                        console.log('just totals: ', arrTOTAL);
                        console.log('just totals Sales: ', arrTOTALSortedSales);

                        this.setState({
                            chartData: {
                                labels: arrCAT,
                                datasets: [{
                                    label: 'Cantidad de Compras por mes', // Name the series
                                    data: arrTOTAL,
                                    fill: true,
                                    borderColor: 'rgb(4,38,109)', // Add custom color border (Line)
                                    backgroundColor: 'rgb(3,40,95)', // Add custom color background (Points and Fill)
                                    borderWidth: 1 // Specify bar border width
                                },
                                    {
                                        label: 'Cantidad de Ventas por mes', // Name the series
                                        data: arrTOTALSortedSales, // Specify the data values array
                                        fill: true,
                                        borderColor: '#4CAF50', // Add custom color border (Line)
                                        backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
                                        borderWidth: 1 // Specify bar border width
                                    }]
                            },
                            isLoaded: true
                        });
                    }.bind(this),
                });
            }.bind(this),
        });
    }


    render() {
        return (
            <div className="App">
                <h3>COMPARATIVA DE VENTAS Y COMPRAS POR MES</h3>

                {this.state.isLoaded ? <Chart chartData={this.state.chartData} location={""}/> : <div>Loading...</div>}

            </div>
        );
    }
}


export default GraphTop5ArtVent;