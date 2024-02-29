import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Select from "react-select";

import LinearProgress from "../linear-progress/LinearProgress";

import Axios from "axios";

class ModalPlantEthnic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _id: "",
      ethnic: "",
      disease_ina: "",
      disease_ing: "",
      name_ina: "",
      species: "",
      family: "",
      section_ina: "",
      section_ing: ""
    };
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    if (
      this.props.modal.mode === "update" ||
      this.props.modal.mode === "detail" ||
      this.props.modal.mode === "delete"
    ) {
      let province = "";
      if (this.props.data.refProvince) {
        province = this.props.baseProvince.find(
          p => p.value === this.props.data.refProvince
        );
      }
      let ethnic = "";
      if (this.props.data.refEthnic) {
        ethnic = this.props.baseEthnic.find(
          p => p.value === this.props.data.refEthnic
        );
      }
      // let crude = "";
      // if (this.props.data.refCrudedrug) {
      //   crude = this.props.baseCrude.find(
      //     p => p.value === this.props.data.refCrudedrug
      //   );
      // }
      let plant = "";
      if (this.props.data.refPlant) {
        plant = this.props.basePlant.find(
          p => p.value === this.props.data.refPlant
        );
      }

      this.setState({
        _id: this.props.data._id,
        ethnic: this.props.data.ethnic,
        disease_ina: this.props.data.disease_ina,
        disease_ing: this.props.data.disease_ing,
        name_ina: this.props.data.name_ina,
        species: this.props.data.species,
        family: this.props.data.family,
        section_ina: this.props.data.section_ina,
        section_ing: this.props.data.section_ing,
        refEthnic: ethnic,
        refProvince: province,
        // refCrudedrug: crude,
        refPlant: plant
      });
    }
    this.setState({
      baseProvince: this.props.baseProvince,
      baseEthnic: this.props.baseEthnic,
      basePlant: this.props.basePlant
    });
  }

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  valueChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmitUpdate = event => {
    this.setState({
      loading: true
    });
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token
      }
    };

    let url = "/jamu/api/plantethnic/update/" + this.state._id;

    Axios.patch(
      url,
      {
        ethnic: this.state.ethnic,
        disease_ina: this.state.disease_ina,
        disease_ing: this.state.disease_ing,
        name_ina: this.state.name_ina,
        species: this.state.species,
        family: this.state.family,
        section_ina: this.state.section_ina,
        section_ing: this.state.section_ing,
        refEthnic: this.state.refEthnic.value,
        refProvince: this.state.refProvince.value,
        refPlant: this.state.refPlant.value
      },
      axiosConfig
    )
      .then(data => {
        const res = data.data;
        this.props.afterUpdate(res.success, res.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        if (err.response.data.message) {
          this.props.afterUpdate(false, err.response.data.message);
          this.setState({
            loading: false
          });
        } else {
          this.props.afterUpdate(false, err.message);
          this.setState({
            loading: false
          });
        }
      });
  };

  handleSubmitAdd = event => {
    this.setState({
      loading: true
    });
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token
      }
    };

    let url = "/jamu/api/plantethnic/add";
    Axios.post(
      url,
      {
        ethnic: this.state.ethnic,
        disease_ina: this.state.disease_ina,
        disease_ing: this.state.disease_ing,
        name_ina: this.state.name_ina,
        species: this.state.species,
        family: this.state.family,
        section_ina: this.state.section_ina,
        section_ing: this.state.section_ing,
        refEthnic: this.state.refEthnic.value,
        refProvince: this.state.refProvince.value,
        refPlant: this.state.refPlant.value
      },
      axiosConfig
    )
      .then(data => {
        const res = data.data;
        this.props.afterUpdate(res.success, res.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        if (err.response.data.message) {
          this.props.afterUpdate(false, err.response.data.message);
          this.setState({
            loading: false
          });
        } else {
          this.props.afterUpdate(false, err.message);
          this.setState({
            loading: false
          });
        }
      });
  };

  handleSubmitDelete = event => {
    this.setState({
      loading: true
    });
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        Authorization: user.token
      }
    };

    let section_ing = "/jamu/api/plantethnic/delete/" + this.state._id;
    Axios.delete(section_ing, axiosConfig)
      .then(data => {
        const res = data.data;
        this.props.afterUpdate(res.success, res.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        if (err.response.data.message) {
          this.props.afterUpdate(false, err.response.data.message);
          this.setState({
            loading: false
          });
        } else {
          this.props.afterUpdate(false, err.message);
          this.setState({
            loading: false
          });
        }
      });
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
            {this.state.loading ? <LinearProgress /> : null}
            <DialogTitle id="form-dialog-title">
              You update Plant Etnic with name {this.state.name_ina}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="ethnic"
                label="Ethnic"
                name="ethnic"
                type="text"
                value={this.state.ethnic}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="disease_ina"
                label="Disease in Bahasa"
                name="disease_ina"
                type="text"
                value={this.state.disease_ina}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="disease_ing"
                label="Disease in English"
                name="disease_ing"
                type="text"
                value={this.state.disease_ing}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="name_ina"
                label="Name in Bahasa"
                name="name_ina"
                type="text"
                value={this.state.name_ina}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="species"
                label="Species"
                name="species"
                type="text"
                value={this.state.species}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="family"
                label="Family"
                name="family"
                type="text"
                value={this.state.family}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="section_ina"
                label="Section in Bahasa"
                name="section_ina"
                type="text"
                value={this.state.section_ina}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="section_ing"
                label="Section in English"
                name="section_ing"
                type="text"
                value={this.state.section_ing}
                fullWidth
                onChange={this.valueChange}
              />
              <label
                style={{
                  color: "grey",
                  fontWeight: "lighter",
                  fontSize: "13px",
                  display: "block",
                  marginTop: "10px",
                  marginBottom: "5px"
                }}
              >
                Ethnic :
              </label>
              <Select
                value={this.state.refEthnic}
                onChange={this.handleChange("refEthnic")}
                options={this.state.baseEthnic}
              />
              <label
                style={{
                  color: "grey",
                  fontWeight: "lighter",
                  fontSize: "13px",
                  display: "block",
                  marginTop: "10px",
                  marginBottom: "5px"
                }}
              >
                Province :
              </label>
              <Select
                value={this.state.refProvince}
                onChange={this.handleChange("refProvince")}
                options={this.state.baseProvince}
              />
              {/* <Select
                value={this.state.refCrudedrug}
                onChange={this.handleChange("refCrudedrug")}
                options={this.state.baseCrude}
              /> */}
              <label
                style={{
                  color: "grey",
                  fontWeight: "lighter",
                  fontSize: "13px",
                  display: "block",
                  marginTop: "10px",
                  marginBottom: "5px"
                }}
              >
                Plant :
              </label>
              <Select
                value={this.state.refPlant}
                onChange={this.handleChange("refPlant")}
                options={this.state.basePlant}
              />
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
          {this.state.loading ? <LinearProgress /> : null}
          <DialogTitle id="alert-dialog-title">
            {"You want delete ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You want delete plant ethnic record data with name{" "}
              {this.state.name_ina}
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
    } else if (this.props.modal.mode === "add") {
      return (
        <Dialog
          open={this.props.modal.open}
          onClose={this.props.close}
          aria-labelledby="form-dialog-title"
        >
          {this.state.loading ? <LinearProgress /> : null}
          <DialogTitle id="form-dialog-title">
            Create Data Record PLant Etnic :
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="ethnic"
              label="Ethnic"
              name="ethnic"
              type="text"
              value={this.state.ethnic}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="disease_ina"
              label="Disease in Bahasa"
              name="disease_ina"
              type="text"
              value={this.state.disease_ina}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="disease_ing"
              label="Disease in English"
              name="disease_ing"
              type="text"
              value={this.state.disease_ing}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="name_ina"
              label="Name in Bahasa"
              name="name_ina"
              type="text"
              value={this.state.name_ina}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="species"
              label="Species"
              name="species"
              type="text"
              value={this.state.species}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="family"
              label="Family"
              name="family"
              type="text"
              value={this.state.family}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="section_ina"
              label="Section in Bahasa"
              name="section_ina"
              type="text"
              value={this.state.section_ina}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="section_ing"
              label="Section in English"
              name="section_ing"
              type="text"
              value={this.state.section_ing}
              fullWidth
              onChange={this.valueChange}
            />
            <label
              style={{
                color: "grey",
                fontWeight: "lighter",
                fontSize: "13px",
                display: "block",
                marginTop: "10px",
                marginBottom: "5px"
              }}
            >
              Ethnic :
            </label>
            <Select
              value={this.state.refEthnic}
              onChange={this.handleChange("refEthnic")}
              options={this.state.baseEthnic}
            />
            <label
              style={{
                color: "grey",
                fontWeight: "lighter",
                fontSize: "13px",
                display: "block",
                marginTop: "10px",
                marginBottom: "5px"
              }}
            >
              Province :
            </label>
            <Select
              value={this.state.refProvince}
              onChange={this.handleChange("refProvince")}
              options={this.state.baseProvince}
            />
            {/* <Select
              value={this.state.refCrudedrug}
              onChange={this.handleChange("refCrudedrug")}
              options={this.state.baseCrude}
            /> */}
            <label
              style={{
                color: "grey",
                fontWeight: "lighter",
                fontSize: "13px",
                display: "block",
                marginTop: "10px",
                marginBottom: "5px"
              }}
            >
              Plant :
            </label>
            <Select
              value={this.state.refPlant}
              onChange={this.handleChange("refPlant")}
              options={this.state.basePlant}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitAdd} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
}

export default ModalPlantEthnic;
