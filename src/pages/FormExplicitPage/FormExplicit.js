import React, { Component } from "react";
import Axios from "axios";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { FormControl, InputLabel, Input } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "90%",
    margin: "auto",
    marginTop: "100px",
    padding: "10px"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class FormExplicit extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  constructor(props) {
    super(props);
    // change code below this line
    this.state = {
      loading: true,
      activeStep: 0,
      skipped: new Set(),
      file: null,
      firstName: "",
      lastName: "",
      title: "",
      datePublish: "",
      citation: "",
      language: "",
      abstract: "",
      description: "",
      publisher: "",
      agree: false
    };
    // change code above this line
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.getData();
  }

  async getData() {}

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
    event.preventDefault();
  };

  handleCheck = event => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
    console.log(this.state);
    event.preventDefault();
  };

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(this.state);
  }

  handleSubmit = event => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: user.token
      }
    };

    let url = "/jamu/api/explicit/add";
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("title", this.state.title);
    formData.append("datePublish", this.state.datePublish);
    formData.append("citation", this.state.citation);
    formData.append("language", this.state.language);
    formData.append("abstract", this.state.abstract);
    formData.append("description", this.state.description);
    formData.append("publisher", this.state.publisher);
    Axios.post(url, formData, axiosConfig)
      .then(data => {
        const res = data.data;
        console.log(res);
        window.location.href = "/explicit";
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const steps = [
      "Add Information Explicit Knowledge",
      "AddDocument Explicit Knowledge",
      "Term and Condition",
      "Review"
    ];
    const { activeStep } = this.state;

    return (
      <Paper className={classes.root} elevation={4}>
        <div>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepSkipped(index)) {
                props.completed = false;
              }
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Paper
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "50%",
                      minHeight: "400px"
                    }}
                  >
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                  </Paper>
                </div>
                <div>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Step1
                    activeStep={this.state.activeStep}
                    handleChange={this.handleChange}
                  />
                  <Step2
                    activeStep={this.state.activeStep}
                    handleChange={this.onChange}
                  />
                  <Step3
                    activeStep={this.state.activeStep}
                    handleChange={this.handleCheck}
                    agree={this.state.agree}
                  />

                  <Step4
                    activeStep={this.state.activeStep}
                    handleChange={this.handleChange}
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px"
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {activeStep === 2 ? (
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      disabled={!this.state.agree}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  ) : activeStep === steps.length - 1 ? (
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={this.handleSubmit}
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Paper>
    );
  }
}

function Step1(props) {
  if (props.activeStep !== 0) {
    return null;
  }
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        minHeight: "400px"
      }}
    >
      <form style={{ width: "90%" }}>
        <div
          style={{
            display: "flex"
          }}
        >
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              style={{ marginRight: "15px" }}
              onChange={props.handleChange}
              id="firstName"
              name="firstName"
              type="text"
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              onChange={props.handleChange}
              name="lastName"
              type="text"
            />
          </FormControl>
        </div>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            onChange={props.handleChange}
            type="text"
            name="title"
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          {/* <InputLabel htmlFor="email">Date Publish</InputLabel> */}
          <Input
            id="datePublish"
            onChange={props.handleChange}
            type="date"
            name="datePublish"
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="Citation">citation</InputLabel>
          <Input
            id="citation"
            onChange={props.handleChange}
            type="text"
            name="citation"
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <FormLabel component="legend">Select Language :</FormLabel>
          <RadioGroup
            aria-label="Language"
            name="language"
            onChange={props.handleChange}
          >
            <FormControlLabel
              value="indonesian"
              control={<Radio />}
              label="Indonesia (Bahasa)"
            />
            <FormControlLabel
              value="english"
              control={<Radio />}
              label="English"
            />
          </RadioGroup>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="abstract">Abstract</InputLabel>
          <Input
            id="abstract"
            onChange={props.handleChange}
            name="abstract"
            multiline
            rows={10}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            onChange={props.handleChange}
            name="description"
            multiline
            rows={10}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="publisher">Publisher</InputLabel>
          <Input
            id="publisher"
            onChange={props.handleChange}
            type="text"
            name="publisher"
          />
        </FormControl>
      </form>
    </Paper>
  );
}

function Step2(props) {
  if (props.activeStep !== 1) {
    return null;
  }
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        minHeight: "400px"
      }}
    >
      <form style={{ width: "90%" }}>
        <FormControl margin="normal" fullWidth>
          <Button>
            <input type="file" onChange={props.handleChange} />
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}

function Step3(props) {
  if (props.activeStep !== 2) {
    return null;
  }
  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "50%",
        minHeight: "400px",
        padding: "35px"
      }}
    >
      <Typography variant="body1" gutterBottom align="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        tincidunt sem et scelerisque laoreet. Mauris non mattis sem. Donec
        auctor sem a iaculis pulvinar. Suspendisse id tortor nec erat congue
        volutpat eu a nisl. Nunc eleifend, ligula in egestas gravida, justo elit
        tincidunt risus, interdum porttitor sapien lectus ut orci. Cras quis
        massa non metus tincidunt gravida. Integer ac lacus sit amet augue
        ultrices sodales. Sed sodales sagittis sem sit amet egestas. Mauris
        elementum lacinia massa ut ullamcorper. Maecenas rutrum, sapien a
        imperdiet pharetra, orci lacus consequat purus, quis lobortis leo odio
        at felis. Sed nec lacinia mauris. Nam at vehicula nisl, ac blandit
        lacus. Vestibulum dui tortor, vulputate ac tempus nec, blandit sit amet
        mauris.Sed in dui elit. Cras laoreet ipsum at ornare maximus.
        Pellentesque tempus mi vitae dolor rutrum volutpat. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Phasellus ultricies leo sit amet ultricies viverra. Vivamus ullamcorper
        dui sit amet malesuada ultrices.
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            name="agree"
            checked={props.agree}
            onChange={props.handleChange}
            color="primary"
          />
        }
        label="Agree"
      />
    </Paper>
  );
}

function Step4(props) {
  if (props.activeStep !== 3) {
    return null;
  }
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        minHeight: "400px"
      }}
    >
      <h6> Sumarry</h6>
    </Paper>
  );
}
export default withStyles(styles)(FormExplicit);
