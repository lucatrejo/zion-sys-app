import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";

// core components
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";

function CustomAutoSelect({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    onChange,
    value,
    error,
    success,
    items,
    readOnly,
    defaultValue,
  } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <Autocomplete
          style={{ marginTop: 12 }}
          labelId="demo-simple-select-label"
          id={id}
          value={value}
          onChange={(event, newValue) => {
              onChange(event, newValue);
          }}
          disableClearable
          size="small"
          options={items}
          defaultValue={defaultValue}
          renderInput={(params) => <TextField {...params} label={labelText} variant="outlined" />}
          getOptionLabel={(option) => option.name}
        >
        </Autocomplete>
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomAutoSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  success: PropTypes.bool,
  readOnly: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(customInputStyle)(CustomAutoSelect);
