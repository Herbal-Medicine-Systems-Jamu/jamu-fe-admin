import React, { Component } from "react";
import Axios from "axios";

import CardDclass from "../../components/card-dclass/CardDclass";
import Spinner from "../../components/spinner/Spinner";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";
import ModalDclass from "../../components/modal/ModalDclass";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

import SnackBar from "../../components/snackbar/SnackBar";

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

class DclassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadData: false,
      inputSearch: "",
      onSearch: [],
      dclass: [],
      onDisplay: [],
      modal: {
        open: false,
        mode: ""
      },
      snackbar: {
        open: false,
        success: false,
        message: ""
      },
      currentPage: 1
    };
    // this.onScroll = this.onScroll.bind(this);
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
    // window.addEventListener('scroll', this.onScroll, false);
    this.getData();
  }

  // async onScroll() {
  //   if (
  //     (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
  //     !this.props.isLoading
  //   ){
  //     // Do awesome stuff like loading more content!
  //     await this.setState({
  //       loadData: true,
  //       currentPage: this.state.currentPage + 1
  //     })
  //     this.getData();
  //   }
  // };

  async getData() {
    const url = "/jamu/api/dclass/";
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      onDisplay: data.data,
      dclass: data.data,
      loading: false
    });
  }

  async getDataSearch(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

    if (e.target.value === "") {
      this.setState({
        onDisplay: this.state.dclass
      });
    } else {
      const regex = new RegExp(e.target.value, "ig");
      let filter = this.state.dclass.filter(dt => {
        return dt.class.match(regex);
      });
      this.setState({
        onDisplay: filter,
        loading: false
      });
    }
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

  async afterUpdate(success, message) {
    this.getData();
    this.setState({
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
    let onSelect = await this.state.dclass.find(c => {
      return c.idclass === id;
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
    let onSelect = await this.state.dclass.find(c => {
      return c.idclass === id;
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
    let onSelect = await this.state.dclass.find(c => {
      return c.idclass === id;
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
                  <Typography color="textPrimary">Dclass</Typography>
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
                    onChange={this.getDataSearch}
                    onKeyDown={this.handleKeyDown}
                    placeholder="Search here..."
                  />
                  <IconButton
                    className={classes.iconButton}
                    aria-label="Search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </div>
            </div>

            <div className="for-card">
              {this.state.onDisplay.map(item => (
                <CardDclass
                  key={item.idclass}
                  id={item.idclass}
                  name={item.class}
                  efficacy={item.description}
                  detail={this.detailBtn}
                  update={this.updateBtn}
                  delete={this.deleteBtn}
                />
              ))}
              {this.state.modal.open === true ? (
                <ModalDclass
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
            </div>
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

export default withStyles(styles)(DclassPage);
