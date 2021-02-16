import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from '@material-ui/core/TextField';

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Snackbar from "components/Snackbar/Snackbar.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Alert from '@material-ui/lab/Alert';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";
import CustomInputNumber from "components/CustomInput/CustomInputNumber.jsx";
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import CustomAutoSelect from "../../components/CustomSelect/CustomAutoSelect";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";

const createHistory = require("history").createBrowserHistory;
let history = createHistory();

const {REACT_APP_SERVER_URL} = process.env;
const date = new Date();
const dateNow = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);

        let birthdate;
        if (query.get('birthdate')) {
            var date1 = query.get('birthdate').split('/')
            var newDate = date1[1] + '/' +date1[0] +'/' +date1[2];
            let date = new Date(newDate);
            console.log(date);
            birthdate = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
            console.log(birthdate);
        }

        this.state = {
            customersData: [],
            customerComboVal: 1,
            clientStatus: '',
            id: query.get('id'),
            accountId: '',
            nameVal: query.get('name'),
            lastNameVal: query.get('last_name'),
            cuilVal: query.get('cuil'),
            dniVal: query.get('dni'),
            addressVal: query.get('address'),
            errors: {},
            categoriesData: [],
            alertColor: 'success',
            alertOpen: false,
            alertMsg: '',
            actionButton: query.get('id') ? 'Actualizar' : 'Registrar',
            birthdate: birthdate ? birthdate : dateNow,
            totalAmount: 0.00,

        };
        this.insertObject = this.insertObject.bind(this);
        this.updateNameVal = this.updateNameVal.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillComboCustomer(this);
    }

    fillComboCustomer(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/customers`)
            .then(res => {
                const cat = res.data.customers;
                cat.forEach(e => {
                    e.name = e.name + " " + e.last_name;
                });
                this.setState({customersData: cat});

            })
    }

    updateCustomer(e, value) {
        console.log(value.id);
        console.log(this.state.customerComboVal);
        this.setState({customerComboVal: value.id});

        console.log("ERRROR");
        var val = this.state.customersData.find(v => v.id === value.id);
        this.setState({customerComboVal: val});
        console.log("ERRROR");

        axios.get(`http://${REACT_APP_SERVER_URL}/customers/` + val.id + `/accounts`)
            .then(res => {
                const cat = res.data.account.details;
                this.setState({accountId: res.data.account.id});
                this.setState({totalAmount: res.data.account.amount});
                console.log(cat);
                this.setState({categoriesData: cat.map(c => Object.values(c))});
            });

        console.log("TERMINO");
        console.log(this.state.categoriesData);

        if (val.first_debt_date == null) {
            this.setState({clientStatus: "up_to_date"});
        } else {
            console.log(val.first_debt_date);
            var date1 = val.first_debt_date.split('/');
            var newDate = date1[1] + '/' +date1[0] +'/' +date1[2];
            let date = new Date(newDate);

            console.log(date);
            console.log(new Date());

            var dateDiff = new Date().getTime() - date.getTime();
            var daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
            console.log(daysDiff);

            if (daysDiff >= 45) {
                this.setState({clientStatus: "defaulter"});
            } else {
                this.setState({clientStatus: "debtor"});
            }


        }
    }

    updateNameVal(e) {
        this.setState({nameVal: e.target.value});
    }
    async searchItems(e) {
        window.location.href = "customers?name=" + this.state.nameVal;


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

        const fields = ["name", "last_name", "identification", "birthdate", "address"];
        const formElements = e.target.elements;
        const formValues = fields
            .map(field => ({
                [field]: formElements.namedItem(field).value
            }))
            .reduce((current, next) => ({...current, ...next}));

        formValues.identification = formValues.identification.trim();

        let insertRequest;
        try {
            if (this.state.id) {
                insertRequest = await axios.put(
                    `http://${REACT_APP_SERVER_URL}/customers/` + this.state.id,
                    {
                        ...formValues
                    }
                );
            } else {
                insertRequest = await axios.post(
                    `http://${REACT_APP_SERVER_URL}/customers`,
                    {
                        ...formValues
                    }
                );
            }
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
            history.push("/admin/customers");
            window.location.reload(false);
        }

        this.fillTable(this);
        this.showAlert(this, msg, insertRequestData.success);
    }

    async handleTotalPay(e) {
        this.setState({errors: {}});
        console.log(this.state.accountId);
        console.log(e);

        let putRe;
        try {
            putRe = await axios.put(
                `http://${REACT_APP_SERVER_URL}/customers/accounts/` + this.state.accountId,

            );
        } catch ({response}) {
            console.log(response.data.messages);
            putRe = response;
            this.showAlert(this, response.data.messages, putRe.danger);
            return;

        }
        console.log(putRe)

        const {data: deleteRequestData} = putRe;

        var msg = 'La deuda total se pago correctamente';
        this.showAlert(this, msg, "success");
        window.location.reload();
    }

    async handlePay(e) {
        this.setState({errors: {}});
        console.log(this.state.accountId);
        console.log(e);

        let putRe;
        try {
            putRe = await axios.put(
                `http://${REACT_APP_SERVER_URL}/customers/accounts/` + this.state.accountId + `/detail-accounts/` + e,

            );
        } catch ({response}) {
            console.log(response.data.messages);
            putRe = response;
            this.showAlert(this, response.data.messages, putRe.danger);
            return;

        }
        console.log(putRe);

        const {data: deleteRequestData} = putRe;

        var msg = 'El detalle se pago correctamente';
        this.showAlert(this, msg, "success");
        window.location.reload();
    }

    render() {
        const {classes, name} = this.props;
        const {errors, alertColor, alertMsg, alertOpen} = this.state;

        console.log(errors.name);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Cuentas</h4>
                                    <p className={classes.cardCategoryWhite}>Administración</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={4}>
                                            <CustomAutoSelect
                                                labelText="Cliente"
                                                id="customer_id"
                                                value={this.state.customerComboVal}
                                                onChange={this.updateCustomer}
                                                error={errors.username}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "customer_id"
                                                }}
                                                items={this.state.customersData}
                                            />
                                            {
                                                this.state.clientStatus === "up_to_date" ?
                                                    <Alert severity="success">Cliente al día</Alert> :
                                                    this.state.clientStatus === "debtor" ?
                                                        <Alert severity="warning">Cliente en deuda</Alert> :
                                                        this.state.clientStatus === "defaulter" ?
                                                            <Alert severity="error">Cliente moroso</Alert> :
                                                            ''
                                            }
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={2}>
                                            <CustomInputNumber
                                                labelText="Monto Total"
                                                id="total_amount"
                                                error={errors.username}
                                                value={this.state.totalAmount}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    name: "unit_price",
                                                    disabled: true,
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={2}>
                                            {
                                                this.state.clientStatus === "up_to_date" ?
                                                    <Button type="button" disabled color="success" size="xs">Saldar Deuda Total</Button> :
                                                        <Button type="button" onClick={() => this.handleTotalPay()} color="success" size="xs">Saldar Deuda Total</Button>
                                            }
                                        </GridItem>

                                    </GridContainer>
                                    <Snackbar
                                        place="br"
                                        color={alertColor}
                                        message={alertMsg}
                                        open={alertOpen}
                                    />


                                </CardBody>
                            </Card>

                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Detalle</h4>
                                </CardHeader>
                                <CardBody>

                                    <div className={classes.tableResponsive}>
                                        <Table className={classes.table}>
                                            <TableHead className={classes["primaryTableHeader"]}>
                                                <TableRow>
                                                    {["Fecha", "Estado", "Monto", "Acciones"].map((prop, key) => {
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
                                                {this.state.categoriesData.map((prop, key) => {
                                                    return (
                                                        <TableRow key={key}>
                                                            {prop.map((prop, key) => {
                                                                if (key === 2) {
                                                                    return (
                                                                        <TableCell className={classes.tableCell}
                                                                                   key={key}>
                                                                            {prop}
                                                                        </TableCell>
                                                                    );
                                                                }
                                                                if (key === 3) {
                                                                    if(prop === 'owed') {
                                                                        return (
                                                                            <TableCell className={classes.tableCell} key={key}>
                                                                                <Alert severity="error">Adeudado</Alert>
                                                                            </TableCell>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <TableCell className={classes.tableCell} key={key}>
                                                                                <Alert severity="success">Pagado</Alert>
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                }
                                                                if (key === 4) {
                                                                    return (
                                                                        <TableCell className={classes.tableCell}
                                                                                   key={key}>
                                                                            ${prop}
                                                                        </TableCell>
                                                                    );
                                                                }
                                                            })}
                                                            <TableCell className={classes.tableCell} key={key}>
                                                                {
                                                                    prop[3] === 'owed' ?
                                                                        <Link href="#"><CheckCircleIcon style={{color: green[500]}}  onClick={() => this.handlePay(prop[0])} /></Link> : ''

                                                                }

                                                                <Link href={"sale_detail?id=" + prop[0]}
                                                                      className={classes.tableCell}>
                                                                    <VisibilityIcon icon={VisibilityIcon} size="2x"/>
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
