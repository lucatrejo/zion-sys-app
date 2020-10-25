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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Link from '@material-ui/core/Link';


const createHistory = require("history").createBrowserHistory;
let history = createHistory();

const {REACT_APP_SERVER_URL} = process.env;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            id: query.get('id'),
            errors: {},
            categoriesData: [],
            alertColor: '',
            alertOpen: false,
            alertMsg: '',
            nameVal: query.get('name'),
            descVal: query.get('description'),
            actionButton: query.get('id') ? 'Actualizar' : 'Guardar'
        };
        this.insertObject = this.insertObject.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillTable(this);
    }

    fillTable(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/categories`)
            .then(res => {
                const cat = res.data.categories;
                this.setState({categoriesData: cat.map(c => Object.values(c))});
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

        formValues.name = formValues.name.trim();

        console.log(formValues);

        let insertRequest;
        try {
            if (this.state.id) {
                insertRequest = await axios.put(
                    `http://${REACT_APP_SERVER_URL}/categories/` + this.state.id,
                    {
                        ...formValues
                    }
                );
            } else {
                insertRequest = await axios.post(
                    `http://${REACT_APP_SERVER_URL}/categories`,
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
            history.push("/admin/categories");
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
                `http://${REACT_APP_SERVER_URL}/categories/`+e,

            );
        } catch ({response}) {
            console.log(response.data.messages)
            deleteRequest = response;
            this.showAlert(this, response.data.messages, deleteRequest.danger);
            return;

        }
        console.log(deleteRequest)

        const {data: deleteRequestData} = deleteRequest;



        var msg = 'Se eliminó la categoría correctamente';
        this.showAlert(this, msg, deleteRequestData.success);
        window.location.reload();
    }
    render() {
        const {classes, name} = this.props;
        const {errors, alertColor, alertMsg, alertOpen} = this.state;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Categorías</h4>
                                    <p className={classes.cardCategoryWhite}>Administración</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={4}>
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
                                                }}
                                                defaultValue={this.state.nameVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText="Descripción"
                                                id="description"
                                                error={(errors)?errors.username:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "description"
                                                }}
                                                defaultValue={this.state.descVal}
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
                                                    {["ID", "Nombre", "Descripción", "Acciones"].map((prop, key) => {
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
                                                                return (
                                                                    <TableCell className={classes.tableCell} key={key}>
                                                                        {prop}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                            <TableCell className={classes.tableCell} key={key}>

                                                                  <Link href={"categories?id=" + prop[0] + "&name=" + prop[1] + "&description=" + prop[2]}
                                                                                 className={classes.tableCell}>
                                                                         <EditIcon icon={EditIcon} size="2x"/>

                                                                  </Link>

                                                                <DeleteIcon onClick={() => this.handleRemove(prop[0])} />
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
