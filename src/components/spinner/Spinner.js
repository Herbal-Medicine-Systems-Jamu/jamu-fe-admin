import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Spinner(props) {
  const { classes } = props;
  return (
    <div style={{
        position: "fixed",
        zIndex: "999",
        height: "2em",
        width: "2em",
        overflow: "visible",
        margin: "auto",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0"
    }}>
      <CircularProgress style={{
        color:"#7AC143"
      }} className={classes.progress} />
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);
