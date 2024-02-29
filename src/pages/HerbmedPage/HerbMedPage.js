import React, { Component } from "react";
import Axios from "axios";

import CardHerbMed from "../../components/card-herbmed/CardHerbMed";
import Spinner from "../../components/spinner/Spinner";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import ModalHerbMed from "../../components/modal/ModalHerbMed";
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

class HerbMeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadData: false,
      inputSearch: "",
      onSearch: false,
      herbmeds: [],
      crude: [],
      company: [],
      dclass: [],
      medtype: [],
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
    this.handleClick = this.handleClick.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
  }

  async componentDidMount() {
    await this.getData();
  }

  // async componentWillReceiveProps() {
  //   this.setState({
  //     loading: true
  //   });
  //   await this.getData();
  // }

  async handleClick(offset, page) {
    console.log(page);
    await this.setState({ currentPage: page, offset });
    this.getDataPage();
  }

  async handleClickSearch(offset, page) {
    console.log(page);
    await this.setState({ currentPage: page, offset });
    this.getDataSearch();
  }

  async getDataPage() {
    this.setState({
      loading: true
    });
    const url = "/jamu/api/herbsmed/getbytype";
    const res = await Axios.get(url, {
      params: {
        type: this.props.match.params.type,
        page: this.state.currentPage
      }
    });
    const { data } = await res;
    this.setState({
      herbmeds: data.data,
      loading: false
    });
  }

  async getData() {
    const { type } = await this.props.match.params;
    const url = "/jamu/api/herbsmed/getbytype";
    const urlCrude = "/jamu/api/crudedrug/getlist/";
    const urlCompany = "/jamu/api/company/getlist/";
    const urlDclass = "/jamu/api/dclass/";
    const urlMedtype = "/jamu/api/medtype/";
    const res = await Axios.get(url, {
      params: {
        type: type,
        page: this.state.currentPage
      }
    });
    const resCrude = await Axios.get(urlCrude);
    const resCompany = await Axios.get(urlCompany);
    const resDclass = await Axios.get(urlDclass);
    const resMedtype = await Axios.get(urlMedtype);
    const { data } = await res;
    let dataCrude = await resCrude.data.data.map(dt => {
      return { label: dt.sname, value: dt._id };
    });
    let dataCompany = await resCompany.data.data.map(dt => {
      return { label: dt.cname, value: dt._id };
    });
    let dataDclass = await resDclass.data.data.map(dt => {
      return { label: dt.class, value: dt._id };
    });
    let dataMedtype = await resMedtype.data.data.map(dt => {
      return { label: dt.medname, value: dt._id };
    });
    this.setState({
      pages: data.pages,
      herbmeds: data.data,
      crude: dataCrude,
      company: dataCompany,
      dclass: dataDclass,
      medtype: dataMedtype,
      loading: false
    });
  }

  async afterUpdate(success, message) {
    const url = "/jamu/api/herbsmed/pages/" + this.state.currentPage;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      herbmeds: data.data,
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
    const { type } = await this.props.match.params;
    console.log(this.state.inputSearch);
    this.setState({
      loading: true,
      onSearch: true
    });
    const url = "jamu/api/herbsmed/getbytype/search";
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
          type: type,
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
      herbmeds: newData,
      loading: false,
      pages: data.pages
    });
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
    let onSelect = await this.state.herbmeds.find(c => {
      return c.idherbsmed === id;
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
    let onSelect = await this.state.herbmeds.find(c => {
      return c.idherbsmed === id;
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
    let onSelect = await this.state.herbmeds.find(c => {
      return c.idherbsmed === id;
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
                  <Typography color="textPrimary">Herbal Medicine</Typography>
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
              {this.state.herbmeds.map(item => (
                <CardHerbMed
                  key={item.idherbsmed}
                  id={item.idherbsmed}
                  name={item.name}
                  image={item.img}
                  efficacy={item.efficacy}
                  reff={item.refCrude}
                  detail={this.detailBtn}
                  update={this.updateBtn}
                  delete={this.deleteBtn}
                />
              ))}
            </div>
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
                  this.handleClickSearch(offset, page)
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

            {this.state.modal.open === true ? (
              <ModalHerbMed
                data={this.state.onSelect}
                afterUpdate={this.afterUpdate}
                modal={this.state.modal}
                baseMedtype={this.state.medtype}
                baseCompany={this.state.company}
                baseDclass={this.state.dclass}
                baseCrude={this.state.crude}
                close={this.closeBtn}
              />
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

            {this.state.snackbar.open === true ? (
              <SnackBar data={this.state.snackbar} close={this.closeBtn} />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(HerbMeds);
