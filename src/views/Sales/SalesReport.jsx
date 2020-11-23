import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";

import generatePDFCustomers from "components/Reports/reportCustomerList";
import generatePDFReportSales from "components/Reports/reportSales";
import generatePDFSalesEmployee from "components/Reports/reportSalesEmployee";
import generatePDFTopItemsSale from "components/Reports/reportTopItemsSale";

const {REACT_APP_SERVER_URL} = process.env;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportData: [],
            reportProviders: [],
            reportPurchases: [],
            reportPurchasesEmployee: []
        };

        this.fillReportData = this.fillReportData.bind(this);
        this.fillReportProviders = this.fillReportProviders.bind(this);
        this.fillReportPurchases = this.fillReportPurchases.bind(this);
        this.fillReportPurchasesEmployee = this.fillReportPurchasesEmployee.bind(this);
        this.fillReportData(this);
        this.fillReportProviders(this);
        this.fillReportPurchases(this);
        this.fillReportPurchasesEmployee(this);
    };

    fillReportData(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/sales/top_items`)
            .then(res => {
                const top_items = res.data.top_items;
                this.setState({reportData: top_items});
            })
    }

    fillReportProviders(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/customers`)
            .then(res => {
                const items = res.data.customers;
                this.setState({reportProviders: items});
            })
    }

    fillReportPurchases(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/sales/sales_month`)
            .then(res => {
                const items = res.data.sales;
                this.setState({reportPurchases: items});
            })
    }

    fillReportPurchasesEmployee(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/sales/sales_employee`)
            .then(res => {
                const items = res.data.sales;
                this.setState({reportPurchasesEmployee: items});
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={24} sm={24} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Ventas</h4>
                                <p className={classes.cardCategoryWhite}>Reportes</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>

                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFTopItemsSale(this.state.reportData)}>
                                            Generar Reporte de Artículos mas Vendidos
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFCustomers(this.state.reportProviders)}>
                                            Generar Listado de Clientes
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFReportSales(this.state.reportPurchases)}>
                                            Generar Reporte de Ventas del mes
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFSalesEmployee(this.state.reportPurchasesEmployee)}>
                                            Generar Reporte de Ventas por Empleado
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string,
    email: PropTypes.string
};

export default withStyles(formStyle)(UserProfile);
