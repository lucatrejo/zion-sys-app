import React, { Component } from 'react';

import Chart from '../../components/Graphs/ChartBar';
import $ from 'jquery/dist/jquery';
import CustomAutoSelect from "../../components/CustomSelect/CustomAutoSelect";

const {REACT_APP_SERVER_URL} = process.env;


class GraphTop5ArtVent extends Component {
    constructor(props){
        super(props);
        const query = new URLSearchParams(this.props.location.search);

        this.state = {
            chartData:{},
            isLoaded: false,
            month: [
                {name: 'Enero', id: 1},
                {name: 'Febrero', id: 2},
                {name: 'Marzo', id: 3},
                {name: 'Abril', id: 4},
                {name: 'Mayo', id: 5},
                {name: 'Junio', id: 6},
                {name: 'Julio', id: 7},
                {name: 'Agosto', id: 8},
                {name: 'Septiembre', id: 9},
                {name: 'Octubre', id: 10},
                {name: 'Noviembre', id: 11},
                {name: 'Diciembre', id: 12},

            ],
            idMonth: query.get('id') ? query.get('id') : null,
            monthCombo: "",


        }
    }

    componentWillMount(){
        // this.getchartData(); // this should be this.getChartData();
        this.getChartData();
    }

    getChartData(){
        $.ajax({
            url: `http://${REACT_APP_SERVER_URL}/sales/count_sales`,
            dataType: 'json',
            success: function(dataReturned){
                //logging to test if correct data is being received
                console.log('original data: ', dataReturned);
                var arrCAT = [];
                var arrTOTAL = [];
                let sorted = dataReturned.getCountSales.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()))

                if (this.state.idMonth !== null) {
                    sorted = sorted.filter(e => {
                        var month = e.date.split('/')[1];
                        console.log("ahora"+month)// Or, var month = e.date.split('-')[1];
                        if (this.state.idMonth == 1 || this.state.idMonth == 2 || this.state.idMonth == 3 || this.state.idMonth == 4 || this.state.idMonth == 5 || this.state.idMonth == 6 || this.state.idMonth == 7 || this.state.idMonth == 8 || this.state.idMonth == 9) {
                            let mesHardcode= 0 + this.state.idMonth;
                            console.log("ESTO ES UNA PRUEBA"+(mesHardcode.toString() === month))
                            return (mesHardcode.toString() === month);
                        }
                        else{
                            let mesHardcode=  this.state.idMonth;
                            return (mesHardcode === month);

                        }
                    })
                }
                ;

                for (var i = 0, len = sorted.length; i < len; i++) {
                    arrCAT.push(sorted[i].date);
                    arrTOTAL.push(sorted[i].count);
                }
                //logging to test that arrays were loaded correctly
                console.log('just name items: ', arrCAT);
                console.log('just totals: ', arrTOTAL);

                this.setState({
                    chartData: {
                        labels:arrCAT,
                        datasets: [
                            {
                                label:"cantidad de ventas por dia",
                                data: arrTOTAL,
                                backgroundColor: 'rgb(169,106,173)',


                                borderColor:

                                    'rgb(226,64,255)'
                                  ,
                                borderWidth: 1
                    }
                ]
            },
                    isLoaded: true
        });
            }.bind(this),
        });
    }
    async searchItems(e, value) {
        if (value !== null)
            window.location.href = "reportCountSaleForDay?id=" + value.id;
        else
            window.location.href = "reportCountSaleForDay";


    }


    render() {
        return (
            <div className="App">
                <h3>VENTAS POR DIA</h3>

                <CustomAutoSelect
                    labelText="Filtrado de meses"
                    id="meses"
                    value={this.state.monthCombo}
                    onChange={this.searchItems}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        required: true,
                        name: "meses_id"
                    }}
                    items={this.state.month}
                />
                {this.state.isLoaded ? <Chart chartData={this.state.chartData} location={""} /> : <div>Loading...</div>}

            </div>
        );
    }
}


export default GraphTop5ArtVent;