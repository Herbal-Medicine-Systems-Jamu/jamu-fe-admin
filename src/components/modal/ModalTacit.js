import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Paper from "@material-ui/core/Paper";
import { FormControl, InputLabel, Input } from "@material-ui/core";

import Axios from "axios";

class ModalTacit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCrude: false,
      addCrude: null,
      loading: true,
      _id: "",
      file: null,
      title: "",
      content: "",
      reference: ""
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
        title: this.props.data.title,
        content: this.props.data.content,
        reference: this.props.data.reference
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
    this.setState({ file: e.target.files[0] });
  }

  handleSubmitUpdate = event => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: user.token
      }
    };

    let url = "/jamu/api/tacit/update/" + this.state._id;
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    formData.append("reference", this.state.reference);
    Axios.post(url, formData, axiosConfig)
      .then(data => {
        const res = data.data;
        console.log(res);
        window.location.href = "/tacit";
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

    let url = "/jamu/api/tacit/delete/" + this.state._id;
    Axios.delete(url, axiosConfig)
      .then(data => {
        const res = data.data;
        console.log(res);
        window.location.href = "/tacit";
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

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                      style={{ marginRight: "15px" }}
                      value={this.state.title}
                      onChange={this.valueChange}
                      id="title"
                      name="title"
                      type="text"
                    />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="content">Content</InputLabel>
                    <Input
                      id="content"
                      value={this.state.content}
                      onChange={this.valueChange}
                      name="content"
                      type="text"
                    />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="reference">Reference</InputLabel>
                    <Input
                      id="reference"
                      value={this.state.reference}
                      onChange={this.valueChange}
                      type="text"
                      name="reference"
                    />
                  </FormControl>
                </form>
              </Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.close} color="primary">
                Cancel
              </Button>
              <Button onClick={this.props.handleSubmitUpdate} color="primary">
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
            {"You want delete ?"}
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

export default ModalTacit;
