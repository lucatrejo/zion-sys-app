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
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReceiptIcon from '@material-ui/icons/Receipt';

import Snackbar from "components/Snackbar/Snackbar.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";

import generateReceipt from "components/Reports/reportReceipt.js";

const {REACT_APP_SERVER_URL} = process.env;
class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            tableData: [],
            alertColor: '',
            alertOpen: false,
            alertMsg: '',
        };
        this.insertObject = this.insertObject.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillTable(this);
    }

    fillTable(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/sales`)
            .then(res => {
                const cat = res.data.sales;
                this.setState({tableData: cat.map(c => Object.values(c))});
            })
    }

    showAlert(e, msg, success) {
        if (msg) {
            this.setState({alertOpen: true});
            this.setState({alertMsg: msg});
            this.setState({alertColor: success ? 'success' : 'danger'});
            setTimeout(
                () => {
                    this.setState({alertOpen: false});
                },
                3000
            );
        }
    }

    async insertObject(e) {
        e.preventDefault();
        this.setState({errors: {}});

        const fields = ["name", "description"];
        const formElements = e.target.elements;
        const formValues = fields
            .map(field => ({
                [field]: formElements.namedItem(field).value
            }))
            .reduce((current, next) => ({...current, ...next}));

        let insertRequest;
        try {
            insertRequest = await axios.post(
                `http://${REACT_APP_SERVER_URL}/categories`,
                {
                    ...formValues
                }
            );
        } catch ({response}) {
            insertRequest = response;
        }

        const {data: insertRequestData} = insertRequest;

        console.log(insertRequestData);
        console.log(insertRequest);

        var msg = '';

        if (!insertRequestData.success) {
            this.setState({
                errors:
                    insertRequestData.messages && insertRequestData.messages.errors
            });
            if (insertRequestData.messages.errors.databaseError) {
                msg = insertRequestData.messages.errors.databaseError;
            }
        } else {
            msg = insertRequestData.messages.success;
        }

        this.fillTable(this);
        this.showAlert(this, msg, insertRequestData.success);
    }

    async handleRemove(e) {

        this.setState({errors: {}});


        let deleteRequest;
        try {
            deleteRequest = await axios.delete(
                `http://${REACT_APP_SERVER_URL}/sales/`+e,

            );
        } catch ({response}) {
            console.log(response.data.messages)
            deleteRequest = response;
            this.showAlert(this, response.data.messages, deleteRequest.danger);
            return;

        }
        console.log(deleteRequest)

        const {data: deleteRequestData} = deleteRequest;



        var msg = 'Se eliminó la venta correctamente';
        this.showAlert(this, msg, "success");
        window.location.reload();
    }

    async handleReceipt(id, employee, client, date) {
        console.log("Hola");
        axios.get(`http://${REACT_APP_SERVER_URL}/sales/` + id + `/details`)
            .then(res => {
                const cat = res.data.details;
                generateReceipt(cat, id, employee, client, date);
            });
    }

    render() {
        const {classes} = this.props;
        const {errors, alertColor, alertMsg, alertOpen} = this.state;

        console.log(errors.name);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={24} sm={24} md={24}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Ventas</h4>
                                    <p className={classes.cardCategoryWhite}>Administración</p>
                                </CardHeader>
                                <CardBody>
                                    <Snackbar
                                        place="br"
                                        color={alertColor}
                                        message={alertMsg}
                                        open={alertOpen}
                                    />

                                    <div className={classes.tableResponsive}>
                                        <Table className={classes.table}>
                                            <TableHead className={classes["primaryTableHeader"]}>
                                                <TableRow>
                                                    {["Empleado", "Cliente", "Fecha","Acciones"].map((prop, key) => {
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
                                                                if (key !== 0 && key !== 4 && key !== 5) {
                                                                    return (
                                                                        <TableCell className={classes.tableCell}
                                                                                   key={key}>
                                                                            {prop}
                                                                        </TableCell>

                                                                    );
                                                            }})}
                                                            <TableCell className={classes.tableCell} key={key}>
                                                                <Link href={"sale_detail?id=" + prop[0]}
                                                                      className={classes.tableCell}>
                                                                    <VisibilityIcon icon={VisibilityIcon} size="2x"/>
                                                                </Link>

                                                                <Link >
                                                                    <ReceiptIcon icon={ReceiptIcon} onClick={() => this.handleReceipt(prop[0], prop[1], prop[2], prop[3])}/>
                                                                </Link>

                                                                <Link href={"add_sale?id=" + prop[0] +
                                                                "&employeeId=" + prop[4] +
                                                                "&customerId=" + prop[5] +
                                                                "&date=" + prop[3]
                                                                }
                                                                      className={classes.tableCell}>
                                                                    <EditIcon icon={EditIcon} size="2x"/>
                                                                </Link>

                                                                <Link >
                                                                    <DeleteIcon icon={DeleteIcon} onClick={() => this.handleRemove(prop[0])}/>
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </div>
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
    name: PropTypes.string,
    email: PropTypes.string
};

export default withStyles(formStyle)(UserProfile);
