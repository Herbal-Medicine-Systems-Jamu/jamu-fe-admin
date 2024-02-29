import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControl, InputLabel, Input } from "@material-ui/core";

import Axios from "axios";

class ModalExplicit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCrude: false,
      addCrude: null,
      loading: true,
      _id: "",
      file: null,
      firstName: "",
      lastName: "",
      title: "",
      datePublish: "",
      citation: "",
      language: "",
      abstract: "",
      description: "",
      publisher: ""
    };
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    if (
      this.props.modal.mode === "update" ||
      this.props.modal.mode === "detail" ||
      this.props.modal.mode === "delete"
    ) {
      this.setState({
        _id: this.props.data._id,
        file: this.props.data.file,
        firstName: this.props.data.firstName,
        lastName: this.props.data.lastName,
        title: this.props.data.title,
        datePublish: this.props.data.datePublish,
        citation: this.props.data.citation,
        language: this.props.data.language,
        abstract: this.props.data.abstract,
        description: this.props.data.description,
        publisher: this.props.data.publisher
      });
    }
  }

  valueChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onChange(e) {
    this.setState({ img: e.target.files[0] });
  }

  handleSubmitUpdate = event => {
    console.log("oke");
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: user.token
      }
    };

    let url = "/jamu/api/explicit/update/" + this.state._id;
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
    Axios.patch(url, formData, axiosConfig)
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

  handleSubmitDelete = event => {
    console.log(this.state);
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        Authorization: user.token
      }
    };

    let url = "/jamu/api/explicit/delete/" + this.state._id;
    Axios.delete(url, axiosConfig)
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
    if (this.props.modal.mode === "update") {
      return (
        <div>
          <Dialog
            open={this.props.modal.open}
            onClose={this.props.close}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              You update herbal medicine with id {this.state.idherbsmed}
            </DialogTitle>
            <DialogContent>
              <Paper
                style={{
                  display: "flex",
                  justifyContent: "center",
                  minHeight: "400px"
                }}
              >
                <form style={{ width: "90%" }}>
                  <FormControl margin="normal" fullWidth>
                    <Button>
                      <input type="file" onChange={this.onChange} />
                    </Button>
                  </FormControl>

                  <div
                    style={{
                      display: "flex"
                    }}
                  >
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="firstName">First Name</InputLabel>
                      <Input
                        style={{ marginRight: "15px" }}
                        value={this.state.firstName}
                        onChange={this.valueChange}
                        id="firstName"
                        name="firstName"
                        type="text"
                      />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="lastName">Last Name</InputLabel>
                      <Input
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.valueChange}
                        name="lastName"
                        type="text"
                      />
                    </FormControl>
                  </div>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                      id="title"
                      value={this.state.title}
                      onChange={this.valueChange}
                      type="text"
                      name="title"
                    />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    {/* <InputLabel htmlFor="email">Date Publish</InputLabel> */}
                    <Input
                      id="datePublish"
                      value={this.state.datePublish}
                      onChange={this.valueChange}
                      type="date"
                      name="datePublish"
                    />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="Citation">citation</InputLabel>
                    <Input
                      id="citation"
                      value={this.state.citation}
                      onChange={this.valueChange}
                      type="text"
                      name="citation"
                    />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <FormLabel component="legend">Select Language :</FormLabel>
                    <RadioGroup
                      aria-label="Language"
                      name="language"
                      onChange={this.valueChange}
                      value={this.state.language}
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
                      value={this.state.abstract}
                      onChange={this.valueChange}
                      name="abstract"
                      multiline
                      rows={10}
                    />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input
                      id="description"
                      value={this.state.description}
                      onChange={this.valueChange}
                      name="description"
                      multiline
                      rows={10}
                    />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="publisher">Publisher</InputLabel>
                    <Input
                      id="publisher"
                      value={this.state.publisher}
                      onChange={this.valueChange}
                      type="text"
                      name="publisher"
                    />
                  </FormControl>
                </form>
              </Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.close} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmitUpdate} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else if (this.props.modal.mode === "delete") {
      return (
        <Dialog
          open={this.props.modal.open}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You want delete tacit knowledge record data with title{" "}
              {this.state.title}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              NO
            </Button>
            <Button onClick={this.handleSubmitDelete} color="primary" autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else if (this.props.modal.mode === "detail") {
    }
  }
}

export default ModalExplicit;
