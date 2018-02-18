import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
    // color: "pink"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 225
  }
});

function DateAndTimePickers(props) {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Get Data From"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button style={{ margin: "2em" }} variant="raised" color="primary">
        Get Data
      </Button>
    </form>
  );
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateAndTimePickers);
