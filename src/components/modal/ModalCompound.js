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

const List = props => {
  if (props.item.sname !== "") {
    return (
      <li>
        {props.item.label}{" "}
        <button id={props.item.value} onClick={props.delete}>
          delete
        </button>
      </li>
    );
  }

  return null;
};

const ModalRefPlant = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Select Reference Plant :</DialogTitle>
      <DialogContent
        style={{
          height: "200px"
        }}
      >
        <Select
          onChange={props.handleChange("addPlant")}
          options={props.basePlant}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleAddPlant} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

class ModalCompound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCrude: false,
      addCrude: null,
      loading: false,
      _id: "",
      compound_id: "",
      cname: "",
      effect_compound: "",
      pubchem_ID: "",
      knapsack_ID: "",
      chemspider_ID: "",
      other_ID: "",
      note: "",
      ref_effect: "",
      refCrudeCompound: [],
      refPlant: []
    };
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleAddPlant = this.handleAddPlant.bind(this);
    this.handleDeletePlant = this.handleDeletePlant.bind(this);
  }

  async componentDidMount() {
    if (
      this.props.modal.mode === "update" ||
      this.props.modal.mode === "detail" ||
      this.props.modal.mode === "delete"
    ) {
      console.log(this.props.data.refPlant);
      console.log(this.props.basePlant);
      let refPlant =
        this.props.data.refPlant !== null
          ? await this.props.data.refPlant.map(dt => {
              return { label: dt.sname, value: dt._id };
            })
          : [];
      // let refPlant = await this.props.data.refPlant.map(dt => {
      //   return { label: dt.sname, value: dt.idplant };
      // });

      this.setState({
        _id: this.props.data._id,
        compound_id: this.props.data.compound_id,
        cname: this.props.data.cname,
        effect_compound: this.props.data.effect_compound,
        pubchem_ID: this.props.data.pubchem_ID,
        knapsack_ID: this.props.data.knapsack_ID,
        chemspider_ID: this.props.data.chemspider_ID,
        other_ID: this.props.data.other_ID,
        note: this.props.data.note,
        ref_effect: this.props.data.ref_effect,
        refCrudeCompound: null,
        refPlant: refPlant
      });
    }
  }

  handleAddPlant = () => {
    let newData = this.state.refPlant.concat(this.state.addPlant);
    this.setState({
      refPlant: newData,
      addPlant: null
    });
    this.togglePopup();
  };

  handleDeletePlant = e => {
    console.log(e.target.id);
    let newData = this.state.refPlant.filter(dt => dt.value !== e.target.id);
    this.setState({
      refPlant: newData
    });
  };

  togglePopup = () => {
    this.setState({
      openModalPlant: !this.state.openModalPlant
    });
  };

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

  onChange(e) {
    this.setState({ img: e.target.files[0] });
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

    let url = "/jamu/api/compound/update/" + this.state._id;
    let refPlant = this.state.refPlant.map(data => data.value);
    Axios.patch(
      url,
      {
        cname: this.state.cname,
        effect_compound: this.state.effect_compound,
        pubchem_ID: this.state.pubchem_ID,
        knapsack_ID: this.state.knapsack_ID,
        chemspider_ID: this.state.chemspider_ID,
        other_ID: this.state.other_ID,
        note: this.state.note,
        ref_effect: this.state.ref_effect,
        refCrudeCompound: [],
        refPlant: refPlant
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

    let url = "/jamu/api/compound/add";
    let refPlant = this.state.refPlant.map(data => data.value);
    Axios.post(
      url,
      {
        compound_id: this.state.compound_id,
        cname: this.state.cname,
        effect_compound: this.state.effect_compound,
        pubchem_ID: this.state.pubchem_ID,
        knapsack_ID: this.state.knapsack_ID,
        chemspider_ID: this.state.chemspider_ID,
        other_ID: this.state.other_ID,
        note: this.state.note,
        ref_effect: this.state.ref_effect,
        refCrudeCompound: [],
        refPlant: refPlant
      },
      axiosConfig
    )
      .then(data => {
        const res = data.data;
        console.log(res);
        this.props.afterUpdate(res.success, res.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
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

    let url = "/jamu/api/compound/delete/" + this.state._id;
    Axios.delete(url, axiosConfig)
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
              You update compound with id {this.state.compound_id} and name is{" "}
              {this.state.cname} :{" "}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
              You update herbal medicine with id {this.state.idplant}
            </DialogContentText> */}
              {/* <TextField
                autoFocus
                margin="dense"
                id="compound_id"
                label="Compound ID"
                name="compound_id"
                type="text"
                value={this.state.compound_id}
                fullWidth
                onChange={this.valueChange}
              /> */}
              <TextField
                margin="dense"
                id="cname"
                label="Compound Name"
                name="cname"
                type="text"
                value={this.state.cname}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Effect Compound"
                label="Effect Compound"
                name="effect_compound"
                type="text"
                value={this.state.effect_compound}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Pubchem ID"
                label="Pubchem ID"
                name="pubchem_ID"
                type="text"
                value={this.state.pubchem_ID}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Knapsack ID"
                label="Knapsack ID"
                name="knapsack_ID"
                type="text"
                value={this.state.knapsack_ID}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="chemspider ID"
                label="chemspider ID"
                name="chemspider_ID"
                type="text"
                value={this.state.chemspider_ID}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="other ID"
                label="other ID"
                name="other_ID"
                type="text"
                value={this.state.other_ID}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Note"
                label="Note"
                name="note"
                type="text"
                value={this.state.note}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Ref effect"
                label="Ref effect"
                name="ref_effect"
                type="text"
                value={this.state.ref_effect}
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
                Reference Plant :
              </label>
              <Button onClick={this.togglePopup} color="primary">
                Add Refren Plant
              </Button>
              {this.state.openModalPlant === true ? (
                <ModalRefPlant
                  basePlant={this.props.basePlant}
                  handleChange={this.handleChange}
                  handleAddPlant={this.handleAddPlant}
                  close={this.togglePopup}
                  open={this.state.openModalPlant}
                />
              ) : null}
              <ul className="reff">
                {this.state.refPlant.map(item => (
                  <List item={item} delete={this.handleDeletePlant} />
                ))}
              </ul>
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
              You want delete compound record data with id{" "}
              {this.state.compound_id} and name {this.state.cname}
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
            You update compound with id {this.state.idplant} and name is{" "}
            {this.state.cname} :{" "}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idplant}
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="compound_id"
              label="Compound ID"
              name="compound_id"
              type="text"
              value={this.state.compound_id}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="cname"
              label="Compound Name"
              name="cname"
              type="text"
              value={this.state.cname}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Effect Compound"
              label="Effect Compound"
              name="effect_compound"
              type="text"
              value={this.state.effect_compound}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Pubchem ID"
              label="Pubchem ID"
              name="pubchem_ID"
              type="text"
              value={this.state.pubchem_ID}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Knapsack ID"
              label="Knapsack ID"
              name="knapsack_ID"
              type="text"
              value={this.state.knapsack_ID}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="chemspider ID"
              label="chemspider ID"
              name="chemspider_ID"
              type="text"
              value={this.state.chemspider_ID}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="other ID"
              label="other ID"
              name="other_ID"
              type="text"
              value={this.state.other_ID}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Note"
              label="Note"
              name="note"
              type="text"
              value={this.state.note}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Ref effect"
              label="Ref effect"
              name="ref_effect"
              type="text"
              value={this.state.ref_effect}
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
              Reference Plant :
            </label>
            <Button onClick={this.togglePopup} color="primary">
              Add Refren Plant
            </Button>
            {this.state.openModalPlant === true ? (
              <ModalRefPlant
                basePlant={this.props.basePlant}
                handleChange={this.handleChange}
                handleAddPlant={this.handleAddPlant}
                close={this.togglePopup}
                open={this.state.openModalPlant}
              />
            ) : null}
            <ul className="reff">
              {this.state.refPlant.map(item => (
                <List item={item} delete={this.handleDeletePlant} />
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
}

export default ModalCompound;
