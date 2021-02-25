import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";
import generateListadoAlDia from "components/Reports/reportClientesAlDia";
import Button from "components/CustomButtons/Button.jsx";

const {REACT_APP_SERVER_URL} = process.env;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableHeader: ["Nombre", "Apellido", "Dni", "Monto"],
            endpointUrl: `http://${REACT_APP_SERVER_URL}/customers/up_to_date`,
            tableData: [],
            reportData: [],
        };
        this.fillTable = this.fillTable.bind(this);
        this.fillTable(this);
    }

    fillTable(e) {
        axios.get(this.state.endpointUrl)
            .then(res => {
                this.setState({reportData: res.data.result});
                this.setState({tableData: res.data.result.map(c => Object.values(c))});
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Listado de Clientes Al Día</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className={classes.tableResponsive}>
                                        <Table className={classes.table}>
                                            <TableHead className={classes["primaryTableHeader"]}>
                                                <TableRow>
                                                    {this.state.tableHeader.map((prop, key) => {
                                                        return (
                                                            <TableCell
                                                                className={classes.tableCell + " " + classes.tableHeadCell}
                                                                key={key}
                                                            >
                                                                {prop}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.tableData.map((prop, key) => {
                                                    return (
                                                        <TableRow key={key}>
                                                            {prop.map((prop, key) => {
                                                                if(key === 4) {
                                                                    return (
                                                                        <TableCell className={classes.tableCell}
                                                                                   key={key}>
                                                                            $ {prop}
                                                                        </TableCell>
                                                                    );
                                                                }
                                                                if(key !== 0 && key !== 5) {
                                                                    return (
                                                                        <TableCell className={classes.tableCell}
                                                                                   key={key}>
                                                                            {prop}
                                                                        </TableCell>
                                                                    );
                                                                }
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <Button type="button" color="info" size="xs"
                                                    onClick={() => generateListadoAlDia(this.state.reportData)}>
                                                Generar PDF
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(formStyle)(UserProfile);
