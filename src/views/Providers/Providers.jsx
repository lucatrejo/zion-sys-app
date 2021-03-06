import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
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
import Link from '@material-ui/core/Link';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const createHistory = require("history").createBrowserHistory;
let history = createHistory();


const {REACT_APP_SERVER_URL} = process.env;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            id: query.get('id'),
            nameVal: query.get('name'),
            businessNameVal: query.get('business'),
            descriptionVal: query.get('description'),
            addressVal: query.get('address'),
            errors: {},
            tableData: [],
            alertColor: '',
            alertOpen: false,
            alertMsg: '',
            actionButton: query.get('id') ? 'Actualizar' : 'Registrar',
        };
        this.insertObject = this.insertObject.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.updateNameVal = this.updateNameVal.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillTable(this);
    }

    fillTable(e) {
        if(this.state.nameVal === null || this.state.nameVal ==='null' || this.state.nameVal ==='') {

            axios.get(`http://${REACT_APP_SERVER_URL}/providers`)
                .then(res => {
                    const cat = res.data.providers;
                    this.setState({tableData: cat.map(c => Object.values(c))});
                })
        }else{
            axios.get(`http://${REACT_APP_SERVER_URL}/providers/`+this.state.nameVal+"/search/")
                .then(res => {
                    const cat = res.data.providers;
                    this.setState({tableData: cat.map(c => Object.values(c))});
                })
        }
    }
    updateNameVal(e) {
        this.setState({nameVal: e.target.value});
    }
    async searchItems(e) {
        window.location.href = "providers?name=" + this.state.nameVal;


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
    async handleRemove(e) {

        this.setState({errors: {}});


        let deleteRequest;
        try {
            deleteRequest = await axios.delete(
                `http://${REACT_APP_SERVER_URL}/providers/`+e,

            );
        } catch ({response}) {
            console.log(response.data.messages)
            deleteRequest = response;
            this.showAlert(this, response.data.messages, deleteRequest.danger);
            return;

        }
        console.log(deleteRequest)

        const {data: deleteRequestData} = deleteRequest;



        var msg = 'Se eliminó el proveedor correctamente';
        this.showAlert(this, msg, "success");
        window.location.reload();
    }
    async insertObject(e) {
        e.preventDefault();
        this.setState({errors: {}});

        const fields = ["name", "business_name", "description", "address"];
        const formElements = e.target.elements;
        const formValues = fields
            .map(field => ({
                [field]: formElements.namedItem(field).value
            }))
            .reduce((current, next) => ({...current, ...next}));

        formValues.name = formValues.name.trim();

        let insertRequest;
        try {
            if (this.state.id) {
                insertRequest = await axios.put(
                    `http://${REACT_APP_SERVER_URL}/providers/` + this.state.id,
                    {
                        ...formValues
                    }
                );
            } else {
                insertRequest = await axios.post(
                    `http://${REACT_APP_SERVER_URL}/providers`,
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
            history.push("/admin/providers");
            window.location.reload(false);
        }

        this.fillTable(this);
        this.showAlert(this, msg, insertRequestData.success);
    }

    render() {
        const {classes} = this.props;
        const {errors, alertColor, alertMsg, alertOpen} = this.state;

        console.log(errors.name);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Proveedores</h4>
                                    <p className={classes.cardCategoryWhite}>Administración</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Nombre"
                                                id="name"
                                                error={errors.name}
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
                                                labelText="Razón Social"
                                                id="business_name"
                                                error={errors.business_name}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "business_name"
                                                }}
                                                defaultValue={this.state.businessNameVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <CustomInput
                                                labelText="Descripción"
                                                id="description"
                                                error={errors.description}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: false,
                                                    name: "description"
                                                }}
                                                defaultValue={this.state.descriptionVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText="Dirección"
                                                id="address"
                                                error={errors.address}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: false,
                                                    name: "address"
                                                }}
                                                defaultValue={this.state.addressVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
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
                                                    {["ID", "Nombre", "Razón Social", "Descripción", "Dirección", "Acciones"].map((prop, key) => {
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
                                                                return (
                                                                    <TableCell className={classes.tableCell} key={key}>
                                                                        {prop}
                                                                    </TableCell>
                                                                );
                                                            })}

                                                                <TableCell className={classes.tableCell} key={key}>

                                                                    <Link href={"providers?id=" + prop[0] +
                                                                    "&name=" + prop[1] +
                                                                    "&business=" + prop[2] +
                                                                    "&description=" + prop[3] +
                                                                    "&address=" + prop[4]
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
