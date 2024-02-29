import React, { Component } from "react";
import Axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import ButtonProgress from "../../components/button-progress/ButtonProgress";
import logo from "../../logo-hijau.png";
import { Paper } from "@material-ui/core";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: "#89b143"
    }
  },
  paper: {
    marginTop: theme.spacing(18),
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      },
      snackbar: {
        open: false,
        success: false,
        message: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleSubmit = event => {
    this.setState({
      loading: true
    });
    if (formValid(this.state)) {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      Axios.post(
        "/jamu/api/user/signin",
        {
          email: this.state.email,
          password: this.state.password
        },
        axiosConfig
      )
        .then(data => {
          const user = data.data;
          this.afterUpdate(user.success, user.message);
          if (user.succes !== false) {
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "/";
          }
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          this.afterUpdate(false, err.message);
          this.setState({
            onEror: true,
            loading: false
          });
        });
    } else {
      this.afterUpdate(false, "fill the form with true value");
      this.setState({
        onEror: true,
        loading: false
      });
    }
    event.preventDefault();
  };

  async afterUpdate(success, message) {
    this.setState({
      snackbar: {
        open: true,
        success: success,
        message: message
      }
    });
  }

  closeBtn() {
    this.setState({
      snackbar: {
        open: false,
        success: false,
        message: ""
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { formErrors } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/* <div className={classes.paper}> */}
        {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
        <Paper className={classes.paper}>
          <img
            style={{
              marginBottom: "20px"
            }}
            src={logo}
            alt="Logo"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleChange}
            type="email"
            error={formErrors.email.length > 0}
          />
          {formErrors.email.length > 0 && (
            <span
              style={{
                color: "red",
                margin: 0,
                fontSize: "12px"
              }}
            >
              {formErrors.email}
            </span>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleChange}
            error={formErrors.password.length > 0}
          />
          {formErrors.password.length > 0 && (
            <span
              style={{
                color: "red",
                margin: 0,
                fontSize: "12px"
              }}
            >
              {formErrors.password}
            </span>
          )}
          <ButtonProgress
            loading={this.state.loading}
            handleButtonClick={this.handleSubmit}
            disable={
              formErrors.password.length > 0 && formErrors.email.length > 0
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          />
        </Paper>
        {/* </div> */}
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
