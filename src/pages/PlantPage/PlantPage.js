import React, { Component } from "react";
import Axios from "axios";

import CardExample from "../../components/card-plant/card";
import Spinner from "../../components/spinner/Spinner";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";
import ModalPlant from "../../components/modal/ModalPlant";

import SnackBar from "../../components/snackbar/SnackBar";
import Pagination from "material-ui-flat-pagination";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

import ErorPage from "../ErrorPage/ErorPage";

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

class PlantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadData: false,
      inputSearch: "",
      plant: [],
      onSearch: false,
      crude: [],
      modal: {
        open: false,
        mode: ""
      },
      snackbar: {
        open: false,
        success: false,
        message: ""
      },
      currentPage: 1,
      offset: 5,
      pages: null
    };
    //this.onScroll = this.onScroll.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDataSearch = this.getDataSearch.bind(this);
    this.updateBtn = this.updateBtn.bind(this);
    this.deleteBtn = this.deleteBtn.bind(this);
    this.detailBtn = this.detailBtn.bind(this);
    this.addBtn = this.addBtn.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async componentDidMount() {
    const urlCrude = "/jamu/api/crudedrug/getlist";
    const resCrude = await Axios.get(urlCrude);
    let dataCrude = await resCrude.data.data.map(dt => {
      return { label: dt.sname, value: dt._id };
    });
    this.setState({
      crude: dataCrude
    });
    this.getData();
  }

  async handleClick(offset, page) {
    console.log(page);
    await this.setState({ currentPage: page, offset });
    this.getData();
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.getDataSearch(event);
    }
  }

  async getData() {
    this.setState({
      loading: true
    });
    const url = "/jamu/api/plant/pages/" + this.state.currentPage;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      onSearch: false,
      pages: data.pages,
      plant: data.data,
      loading: false
    });
  }

  async afterUpdate(success, message) {
    const url = "/jamu/api/plant/pages/" + this.state.currentPage;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      plant: data.data,
      modal: {
        open: false,
        mode: ""
      },
      snackbar: {
        open: true,
        success: success,
        message: message
      }
    });
  }

  async getDataSearch(event) {
    try {
      console.log(this.state.inputSearch);
      this.setState({
        loading: true,
        onSearch: true
      });
      const url = "/jamu/api/plant/search";
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
      this.setState({
        onSearch: true,
        pagesOnSearch: newData.length,
        plant: newData,
        loading: false
      });
    } catch (err) {
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
    let onSelect = await this.state.plant.find(c => {
      return c.idplant === id;
    });
    this.setState({
      onSelect: onSelect,
      modal: {
        open: true,
        mode: "update"
      }
    });
  }

  async detailBtn(id) {
    let onSelect = await this.state.plant.find(c => {
      return c.idplant === id;
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
    let onSelect = await this.state.plant.find(c => {
      return c.idplant === id;
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
      <div>
        {this.state.loading ? (
          <Spinner />
        ) : (
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
                {this.state.onSearch ? (
                  <Breadcrumbs aria-label="Breadcrumb">
                    <Link color="inherit" href="/">
                      KMS Jamu
                    </Link>
                    <Link color="inherit">Plant</Link>
                    <Typography color="textPrimary">Search</Typography>
                  </Breadcrumbs>
                ) : (
                  <Breadcrumbs aria-label="Breadcrumb">
                    <Link color="inherit" href="/">
                      KMS Jamu
                    </Link>
                    <Link color="inherit">Explore</Link>
                    <Typography color="textPrimary">Plant</Typography>
                  </Breadcrumbs>
                )}
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
                {this.state.plant.map(item => (
                  <CardExample
                    key={item.id}
                    id={item.idplant}
                    name={item.sname}
                    image={item.refimg}
                    reff={item.refCrude}
                    detail={this.detailBtn}
                    update={this.updateBtn}
                    delete={this.deleteBtn}
                  />
                ))}
              </div>
            )}
            {this.state.modal.open === true ? (
              <ModalPlant
                baseCrude={this.state.crude}
                afterUpdate={this.afterUpdate}
                data={this.state.onSelect}
                modal={this.state.modal}
                close={this.closeBtn}
              />
            ) : null}
            <Pagination
              style={{
                margin: "auto",
                marginBottom: "10px"
              }}
              size="large"
              limit={10}
              offset={this.state.offset}
              total={
                this.state.inputSearch === "" ? 10 * this.state.pages : null
              }
              onClick={(e, offset, page) => this.handleClick(offset, page)}
            />

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
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PlantPage);
