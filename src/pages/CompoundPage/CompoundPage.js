import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";

import Spinner from "../../Spinner";
import CardCompound from "../../CardCompound";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import SnackBar from "../../SnackBar";
import ErorPage from "../../ErorPage";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ModalCompound from "../../ModalCompound";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
};

class Compound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadData: false,
      inputSearch: "",
      compounds: [],
      plant: [],
      onSearch: false,
      currentPage: 1,
      offset: 5,
      pages: null,
      modal: {
        open: false,
        mode: ""
      },
      snackbar: {
        open: false,
        success: false,
        message: ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDataSearch = this.getDataSearch.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.deleteBtn = this.deleteBtn.bind(this);
    this.updateBtn = this.updateBtn.bind(this);
    this.detailBtn = this.detailBtn.bind(this);
    this.addBtn = this.addBtn.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  async componentDidMount() {
    const urlPlant = "/jamu/api/plant/getlist";
    const resPlant = await Axios.get(urlPlant);
    let dataPlant = await resPlant.data.data.map(dt => {
      return { label: dt.sname, value: dt._id };
    });
    this.setState({
      plant: dataPlant
    });
    this.getData();
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.getDataSearch(event);
    }
  }

  async getData() {
    try {
      const url = "/jamu/api/compound/pages/" + this.state.currentPage;
      //const url = '/jamu/api/generate/new/compound/index';
      const res = await Axios.get(url);
      const { data } = await res;

      let dataNew = await Promise.all(
        data.data.map(async dt => {
          let url =
            "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" +
            dt.cname +
            "/cids/TXT";
          try {
            let res = await Axios.get(url);
            console.log(res);
            let data = res.data.split("\n");
            dt.idPubChem = data[0];
            return dt;
          } catch (err) {
            console.log(err);
            dt.idPubChem = "";
            return dt;
          }
        })
      );

      let newData = this.state.compounds.concat(dataNew);
      this.afterUpdate(data.success, data.message);
      this.setState({
        compounds: newData,
        loading: false
      });
    } catch (err) {
      console.log(err.message);
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
  }

  async getDataSearch(event) {
    try {
      console.log(this.state.inputSearch);
      this.setState({
        loading: true,
        onSearch: true
      });
      const url = "/jamu/api/compound/search";
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await Axios.get(
        url,
        {
          params: {
            search: this.state.inputSearch
          }
        },
        axiosConfig
      );
      const { data } = await res;
      let newData = data.data;
      console.log(newData);
      this.afterUpdate(data.success, data.message);
      this.setState({
        compounds: newData,
        loading: false
      });
    } catch (err) {
      console.log(err.message);
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

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
      onSelect: null,
      modal: {
        open: false,
        mode: ""
      },
      snackbar: {
        open: false,
        success: false,
        message: ""
      }
    });
  }

  async updateBtn(id) {
    let onSelect = await this.state.compounds.find(c => {
      return c._id === id;
    });
    console.log(onSelect);
    this.setState({
      onSelect: onSelect,
      modal: {
        open: true,
        mode: "update"
      }
    });
  }

  async detailBtn(id) {
    let onSelect = await this.state.compounds.find(c => {
      return c._id === id;
    });
    this.setState({
      onSelect: onSelect,
      modal: {
        open: true,
        mode: "detail"
      }
    });
  }

  addBtn() {
    this.setState({
      modal: {
        open: true,
        mode: "add"
      }
    });
  }

  async deleteBtn(id) {
    let onSelect = await this.state.compounds.find(c => {
      return c._id === id;
    });
    this.setState({
      onSelect: onSelect,
      modal: {
        open: true,
        mode: "delete"
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "30px"
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            margin: "auto"
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Breadcrumbs aria-label="Breadcrumb">
              <Link color="inherit" href="/">
                KMS Jamu
              </Link>
              <Link color="inherit">Explore</Link>
              <Typography color="textPrimary">Compound</Typography>
            </Breadcrumbs>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row-reverse"
            }}
          >
            <Paper className={classes.root} elevation={1}>
              <InputBase
                className={classes.input}
                name="inputSearch"
                value={this.state.inputSearch}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="Search here..."
              />
              <IconButton
                className={classes.iconButton}
                onClick={this.getDataSearch}
                aria-label="Search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        {this.state.onEror ? (
          <ErorPage />
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <div className="for-card">
            {this.state.compounds.map(item => (
              <CardCompound
                key={item._id}
                id={item._id}
                part={item.part}
                name={item.cname}
                image={`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${
                  item.idPubChem
                }`}
                reff={[item.refPlant]}
                update={this.updateBtn}
                delete={this.deleteBtn}
              />
            ))}
          </div>
        )}
        {this.state.modal.open === true ? (
          <ModalCompound
            data={this.state.onSelect}
            afterUpdate={this.afterUpdate}
            modal={this.state.modal}
            basePlant={this.state.plant}
            close={this.closeBtn}
          />
        ) : null}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
        <Fab
          style={{
            position: "fixed",
            width: "45px",
            height: "45px",
            bottom: "25px",
            right: "25px"
          }}
          color="primary"
          aria-label="Add"
          onClick={this.addBtn}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(Compound);
