import React, { Component } from "react";
import Axios from "axios";

import CardCrudeDrug from "../../components/card-crude/CardCrudeDrug";
import Spinner from "../../components/spinner/Spinner";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";
import ModalCrude from "../../components/modal/ModalCrude";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import SnackBar from "../../components/snackbar/SnackBar";
import Pagination from "material-ui-flat-pagination";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

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
class CrudeDrugPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadData: false,
      inputSearch: "",
      onSearch: [],
      crude: [],
      plant: [],
      modal: {
        open: false,
        mode: ""
      },
      snackbar: {
        open: false,
        success: false,
        message: ""
      },
      onSelect: null,
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
  }

  async componentDidMount() {
    //window.addEventListener('scroll', this.onScroll, false);
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

  async handleClick(offset, page) {
    console.log(page);
    await this.setState({ currentPage: page, offset });
    this.getData();
  }

  async handleClickOnSearch(offset, page) {
    console.log(page);
    await this.setState({ currentPage: page, offset });
    this.getDataSearch();
  }

  async getData() {
    this.setState({
      loading: true
    });
    const url = "/jamu/api/crudedrug/pages/" + this.state.currentPage;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      pages: data.pages,
      crude: data.data,
      loading: false
    });
  }

  async afterUpdate(success, message) {
    const url = "/jamu/api/crudedrug/pages/" + this.state.currentPage;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      crude: data.data,
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

  async getDataSearch() {
    console.log(this.state.inputSearch);
    this.setState({
      loadData: true
    });
    const url = "/jamu/api/crudedrug/search";
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await Axios.get(
      url,
      {
        params: {
          search: this.state.inputSearch,
          page: this.state.currentPage
        }
      },
      axiosConfig
    );
    const { data } = await res;
    let newData = data.data;
    console.log(newData);
    this.setState({
      onSearch: true,
      crude: newData,
      loadData: false,
      pages: data.pages
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(value);
    console.log(name);
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
    let onSelect = await this.state.crude.find(c => {
      return c.idcrude === id;
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
    let onSelect = await this.state.crude.find(c => {
      return c.idcrude === id;
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
    let onSelect = await this.state.crude.find(c => {
      return c.idcrude === id;
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
                <Breadcrumbs aria-label="Breadcrumb">
                  <Link color="inherit" href="/">
                    KMS Jamu
                  </Link>
                  <Link color="inherit">Explore</Link>
                  <Typography color="textPrimary">Crude Drug</Typography>
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

            <div className="for-card">
              {this.state.crude.map(item => (
                <CardCrudeDrug
                  key={item.idcrude}
                  id={item.idcrude}
                  name={item.sname}
                  efficacy={item.effect}
                  reff={item.refPlant}
                  update={this.updateBtn}
                  delete={this.deleteBtn}
                />
              ))}
            </div>
            {this.state.modal.open === true ? (
              <ModalCrude
                data={this.state.onSelect}
                afterUpdate={this.afterUpdate}
                modal={this.state.modal}
                baseMedtype={this.state.medtype}
                basePlant={this.state.plant}
                close={this.closeBtn}
              />
            ) : null}
            {this.state.onSearch ? (
              <Pagination
                style={{
                  margin: "auto",
                  marginBottom: "10px"
                }}
                size="large"
                limit={10}
                offset={this.state.offset}
                total={10 * this.state.pages}
                onClick={(e, offset, page) =>
                  this.handleClickOnSearch(offset, page)
                }
              />
            ) : (
              <Pagination
                style={{
                  margin: "auto",
                  marginBottom: "10px"
                }}
                size="large"
                limit={10}
                offset={this.state.offset}
                total={10 * this.state.pages}
                onClick={(e, offset, page) => this.handleClick(offset, page)}
              />
            )}
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

export default withStyles(styles)(CrudeDrugPage);
