import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PlantIcon from "../../icon/planticon.png";
import HerbMedIcon from "../../icon/herbmedicon.png";
import CompanyIcon from "../../icon/companyicon.png";
import CompoundIcon from "../../icon/compoundicon.png";
import CrudeIcon from "../../icon/crudeicon.png";
import DClassIcon from "../../icon/dclassicon.png";
import EthnicIcon from "../../icon/ethnicicon.png";
import ExplicitIcon from "../../icon/expliciticon.png";
import MedTypeIcon from "../../icon/medtypeicon.png";
import PlantethnicIcon from "../../icon/plantethnicicon.png";
import TacitIcon from "../../icon/taciticon.png";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
});

function ListDrawer(props) {
  const { classes } = props;
  return (
    <div className={classes.list}>
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          selected={props.selected === 0}
          onClick={props.handleListItemClick.bind(this, 0)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={props.handleClick}
          selected={props.selected === 1 || props.selected === 2}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={HerbMedIcon}
              alt="herbal medicine icon"
            />
          </ListItemIcon>
          <ListItemText primary="Herbal Medicine" />
          {props.openHerbMed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={props.openHerbMed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component="a"
              href="/herbmeds/jamu"
              className={classes.nested}
              selected={props.selected === 1}
              onClick={props.handleListItemClick.bind(this, 1)}
            >
              <ListItemIcon />
              <ListItemText secondary="Jamu" />
            </ListItem>
            <ListItem
              button
              component="a"
              href="/herbmeds/kampo"
              className={classes.nested}
              selected={props.selected === 2}
              onClick={props.handleListItemClick.bind(this, 2)}
            >
              <ListItemIcon />
              <ListItemText secondary="Kampo" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          button
          component={Link}
          to="/medtype"
          selected={props.selected === 3}
          onClick={props.handleListItemClick.bind(this, 3)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={MedTypeIcon}
              alt="medicine type icon"
            />
          </ListItemIcon>
          <ListItemText primary="Medicine Type" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/company"
          selected={props.selected === 4}
          onClick={props.handleListItemClick.bind(this, 4)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={CompanyIcon}
              alt="company icon"
            />
          </ListItemIcon>
          <ListItemText primary="Company" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/dclass"
          selected={props.selected === 5}
          onClick={props.handleListItemClick.bind(this, 5)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={DClassIcon}
              alt="disease class icon"
            />
          </ListItemIcon>
          <ListItemText primary="Disease Class" />
        </ListItem>
        <Divider />

        <ListItem
          button
          component={Link}
          to="/plant"
          selected={props.selected === 6}
          onClick={props.handleListItemClick.bind(this, 6)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={PlantIcon}
              alt="plant icon"
            />
          </ListItemIcon>
          <ListItemText primary="Plant" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/crudedrug"
          selected={props.selected === 7}
          onClick={props.handleListItemClick.bind(this, 7)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={CrudeIcon}
              alt="crude icon"
            />
          </ListItemIcon>
          <ListItemText primary="Crude Drug" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/plantethnic"
          selected={props.selected === 8}
          onClick={props.handleListItemClick.bind(this, 8)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={PlantethnicIcon}
              alt="plant ethnic icon"
            />
          </ListItemIcon>
          <ListItemText primary="Plant Ethnic" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/ethnic"
          selected={props.selected === 9}
          onClick={props.handleListItemClick.bind(this, 9)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={EthnicIcon}
              alt="ethnic icon"
            />
          </ListItemIcon>
          <ListItemText primary="Ethnic" />
        </ListItem>

        <Divider />

        <ListItem
          button
          component={Link}
          to="/compound"
          selected={props.selected === 10}
          onClick={props.handleListItemClick.bind(this, 10)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={CompoundIcon}
              alt="compound icon"
            />
          </ListItemIcon>
          <ListItemText primary="Compound" />
        </ListItem>

        <Divider />

        <ListItem
          button
          component={Link}
          to="/tacit"
          selected={props.selected === 11}
          onClick={props.handleListItemClick.bind(this, 11)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={TacitIcon}
              alt="tacit icon"
            />
          </ListItemIcon>
          <ListItemText primary="Tacit Knowledge" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/explicit"
          selected={props.selected === 12}
          onClick={props.handleListItemClick.bind(this, 12)}
        >
          <ListItemIcon>
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }}
              src={ExplicitIcon}
              alt="explicit icon"
            />
          </ListItemIcon>
          <ListItemText primary="Explicit Knowledge" />
        </ListItem>
      </List>
    </div>
  );
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      left: true,
      anchorEl: null,
      count: {},
      openHerbMed: false,
      index: 0
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  logout = event => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  handleClick() {
    this.setState({
      openHerbMed: !this.state.openHerbMed
    });
  }

  handleListItemClick(index) {
    this.setState({
      index: index
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let user = localStorage.getItem("user");
    user = JSON.parse(user);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(
            classes.appBar,
            this.state.left && classes.appBarShift
          )}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer("left", true)}
              className={clsx(
                classes.menuButton,
                this.state.left && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Admin KMS Jamu
            </Typography>
            {user ? (
              <div
                style={{
                  display: "flex"
                }}
              >
                <p>{user.data.name}</p>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                style={{
                  backgroundColor: "white"
                }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !this.state.left && classes.drawerPaperClose
            )
          }}
          open={this.state.left}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.toggleDrawer("left", false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListDrawer
              openHerbMed={this.state.openHerbMed}
              handleClick={this.handleClick}
              handleListItemClick={this.handleListItemClick}
              selected={this.state.index}
              classes={classes}
            />
          </List>
          <Divider />
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
