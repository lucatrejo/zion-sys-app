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

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";
import CustomInputNumber from "components/CustomInput/CustomInputNumber.jsx";
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

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
            id: query.get('id'),
            nameVal: query.get('name'),
            lastNameVal: query.get('last_name'),
            cuilVal: query.get('cuil'),
            dniVal: query.get('dni'),
            addressVal: query.get('address'),
            errors: {},
            tableData: [],
            alertColor: 'success',
            alertOpen: false,
            alertMsg: '',
            actionButton: query.get('id') ? 'Actualizar' : 'Registrar',
            birthdate: birthdate ? birthdate : dateNow,

        };
        this.insertObject = this.insertObject.bind(this);
        this.updateNameVal = this.updateNameVal.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillTable(this);
    }

    fillTable(e) {
        if((this.state.nameVal === null || this.state.nameVal ==='null' || this.state.nameVal ==='') &&
        (this.state.lastNameVal === null || this.state.lastNameVal ==='null' || this.state.lastNameVal ==='')) {

            axios.get(`http://${REACT_APP_SERVER_URL}/customers`)
                .then(res => {
                    const cat = res.data.customers;
                    this.setState({tableData: cat.map(c => Object.values(c))});
                })
        }else if(!(this.state.nameVal === null || this.state.nameVal ==='null' || this.state.nameVal ==='') ){

            axios.get(`http://${REACT_APP_SERVER_URL}/customers/`+this.state.nameVal+"/search/")
                .then(res => {
                    console.log(res.data.items)
                    const cat = res.data.customers;
                    this.setState({tableData: cat.map(c => Object.values(c))});
                })
        }else{
            axios.get(`http://${REACT_APP_SERVER_URL}/customers/`+this.state.lastNameVal+"/searchLastName/")
                .then(res => {
                    console.log(res.data.items)
                    const cat = res.data.customers;
                    this.setState({categoriesData: cat.map(c => Object.values(c))});
                })
        }
    }
    updateNameVal(e) {
        this.setState({nameVal: e.target.value});
    }
    updateLastName(e) {
        this.setState({lastNameVal: e.target.value});
    }
    async searchItems(e) {
        window.location.href = "customers?name=" + this.state.nameVal;
    }

     searchItemsWithName(e) {
        window.location.href = "customers?last_name=" + this.state.lastNameVal;
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
    async handleRemove(e) {

        this.setState({errors: {}});


        let deleteRequest;
        try {
            deleteRequest = await axios.delete(
                `http://${REACT_APP_SERVER_URL}/customers/`+e,

            );
        } catch ({response}) {
            console.log(response.data.messages)
            deleteRequest = response;
            this.showAlert(this, response.data.messages, deleteRequest.danger);
            return;

        }
        console.log(deleteRequest)

        const {data: deleteRequestData} = deleteRequest;



        var msg = 'Se eliminó el cliente correctamente';
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
                                    <h4 className={classes.cardTitleWhite}>Clientes</h4>
                                    <p className={classes.cardCategoryWhite}>Administración</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Nombre"
                                                id="name"
                                                error={(errors)?errors.name:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "name",
                                                    endAdornment:
                                                        <Link>
                                                            <SearchOutlinedIcon onClick={() => this.searchItems(1)} fontSize={"small"}></SearchOutlinedIcon>
                                                        </Link>
                                                    ,
                                                }}
                                                onChange={this.updateNameVal}
                                                defaultValue={this.state.nameVal!="null"?this.state.nameVal:""}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Apellido"
                                                id="last_name"
                                                error={(errors)?errors.last_name:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "last_name",
                                                    endAdornment:
                                                        <Link>
                                                            <SearchOutlinedIcon onClick={() => this.searchItemsWithName(1)} fontSize={"small"}></SearchOutlinedIcon>
                                                        </Link>
                                                    ,
                                                }}
                                                onChange={this.updateLastName}
                                                defaultValue={this.state.lastNameVal!="null"?this.state.lastNameVal:""}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInputNumber
                                                labelText="DNI"
                                                id="identification"
                                                error={(errors)?errors.identification:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "identification"
                                                }}
                                                defaultValue={this.state.dniVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <TextField
                                                id="birthdate"
                                                label="Fecha de Nacimiento"
                                                type="date"
                                                defaultValue={this.state.birthdate}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    required: true,
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Dirección"
                                                id="address"
                                                error={(errors)?errors.address:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "address"
                                                }}
                                                defaultValue={this.state.addressVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={1}>
                                            <Button type="submit" color="info" size="xs">
                                                {this.state.actionButton}
                                            </Button>
                                        </GridItem>

                                    </GridContainer>
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
                                                    {["Nombre", "Apellido", "DNI", "Fecha de Nacimiento", "Dirección", "Acciones"].map((prop, key) => {
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
                                                                if (key !== 0 && key !== 6) {
                                                                return (
                                                                    <TableCell className={classes.tableCell} key={key}>
                                                                        {prop}
                                                                    </TableCell>
                                                                );
                                                            }})}
                                                            <TableCell className={classes.tableCell} key={key}>
                                                                <Link href={"customers?id=" + prop[0] +
                                                                            "&name=" + prop[1] +
                                                                            "&last_name=" + prop[2] +
                                                                            "&dni=" + prop[3] +
                                                                            "&birthdate=" + prop[4] +
                                                                            "&address=" + prop[5]
                                                                }
                                                                      className={classes.tableCell}>
                                                                    <EditIcon icon={EditIcon} size="2x"/>
                                                                </Link>
                                                                <Link>
                                                                    <DeleteIcon onClick={() => this.handleRemove(prop[0])} />
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
