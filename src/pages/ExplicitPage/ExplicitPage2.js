import React, { Component, Fragment } from 'react'
import Axios from 'axios'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link2 from '@material-ui/core/Link';
import Spinner from '../../components/spinner/Spinner'

import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Pagination from "material-ui-flat-pagination";

import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import SnackBar from '../../components/snackbar/SnackBar'
import ErorPage from '../ErrorPage/ErorPage'

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import ModalExplicit from '../../components/modal/ModalExplicit';
import Icon from "@material-ui/core/Icon";

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  formControl: {
    margin: 24,
  },
  group: {
    margin: 8,
  },
};

function ListExplicit (props) {
  const id = props.id 
    return (
        <div style={{
            marginTop: "0",
            marginBottom: "26px",
            maxWidth: "85%"
        }}> 
        <h1 style={{
          color: "#0071bc",
          fontWeight: "500",
          fontSize: "1.5em"
        }}>
          {props.title}
        </h1>
        <Typography variant="caption" >
             <Person /> {props.name}
        </Typography >
        <Typography variant="caption" >
             <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
        </Typography>
        <p className="block-with-text">
            {props.abstract}
        </p>

        <Button onClick={props.update.bind(this, id)} >
          Update <Icon>edit</Icon>
        </Button>

        <Button onClick={props.delete.bind(this, id)} >
          Delete <Icon>delete</Icon>
        </Button>
        <Divider light />
       </div>
    )
}


class ExplicitPage extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          onSearch: [],
          explicit : [],
          currentPage: 1,
          offset:5,
          pages: null,
          snackbar: {
            open: false,
            success: false,
            message: '',
          },
          inputSearch: '',
          name: '',
          type: '',
          modal: {
            open: false,
            mode: '',
          }
        }
        // this.onScroll = this.onScroll.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.closeBtn = this.closeBtn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataSearch = this.getDataSearch.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.updateBtn = this.updateBtn.bind(this);
        this.deleteBtn = this.deleteBtn.bind(this);
      }
    
      async componentDidMount() {
        // window.addEventListener('scroll', this.onScroll);
        this.getData();
      }
      
      async updateBtn(id) {
        let onSelect =  await this.state.explicit.find( c => {
          return c._id === id
        })
        this.setState({
          onSelect: onSelect,
          modal: {
            open: true,
            mode: 'update'
          }
        })
      }

      addBtn() {
        this.setState({
          modal: {
            open: true,
            mode: 'add'
          }
        })
      }

      async deleteBtn(id) {
        let onSelect =  await this.state.explicit.find( c => {
          return c._id === id
        })
        this.setState({
          onSelect: onSelect,
          modal: {
            open: true,
            mode: 'delete'
          }
        })
      }

      handleKeyDown (event) {
        if (event.key === 'Enter') {
          this.getDataSearch(event)
        }
      }
      
    async handleClick(offset,page) {
      console.log(page)
      await this.setState({ currentPage: page, offset });
      this.getData();
    }

      async getData(){
        try {const url = '/jamu/api/explicit/pages/' + this.state.currentPage;
        const res = await Axios.get(url);
        const { data } = await res;
        this.afterUpdate(data.success, data.message);
        this.setState({
          pages: data.pages,
          explicit: data.data, 
          loading: false
        })} catch (err){
          console.log(err.message)
          this.afterUpdate(false, err.message);
          this.setState({
            onEror: true,
            loading: false
          })
        }
      }
    

        async getDataSearch(){
          console.log(this.state.inputSearch)
          this.setState({
            loadData: true
          })
          const url = '/jamu/api/explicit/search/sort';
          let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
              }
            };
          const res =  await Axios.get(url,{
            params: {
              search: this.state.inputSearch
            }
          },axiosConfig);
          const { data } = await res;
          let newData = data.data;
          console.log(newData)
          this.setState({
            onSearch: newData, 
            loadData: false
          })
        }

        async changeFilter(event){

          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
          console.log(value)
          console.log(name)
          await this.setState({
            [name]: value
          });

          console.log(this.state.inputSearch)
          this.setState({
            loadData: true
          })
          const url = '/jamu/api/explicit/search/sort';
          let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
              }
            };
          const res =  await Axios.get(url,{
            params: {
              search: this.state.inputSearch,
              date: this.state.date,
              name: this.state.name,
            }
          },axiosConfig);
          const { data } = await res;
          let newData = data.data;
          console.log(newData)
          if (this.state.inputSearch === '' ){
            this.setState({
              explicit: newData, 
              loadData: false
            })
          }else {
            this.setState({
              onSearch: newData, 
              loadData: false
            })
          }
        }
    
        handleInputChange(event) {
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
          console.log(value)
          console.log(name)
          this.setState({
            [name]: value
          });
        }


        async afterUpdate (success, message){
          this.setState({
            snackbar: {
              open: true,
              success: success,
              message: message,
            }
          })
        }
    
        closeBtn() {
          this.setState({
            snackbar: {
              open: false,
              success: false,
              message: '',
            },
            onSelect: null,
            modal: {
              open: false,
              mode: ''
            }
          })
        }

    render (){
      const { classes } = this.props;
        return (
            <div style={{
                display:"flex",
                flexDirection:"column",
                margin: "auto",
                marginTop:"20px",
                width:"100%"
            }}>
              <div style={{
                width:"95%",
                display:"flex",
                flexDirection:"row",
                margin:"auto"
              }}>
                <div style={{
                  width:"50%",
                  display:"flex",
                  flexDirection:"row"
                }}>
                  <Breadcrumbs aria-label="Breadcrumb">
                    <Link2 color="inherit" href="/" >
                      KMS Jamu
                    </Link2>
                    <Link2 color="inherit" >
                      Explore
                    </Link2>
                    <Typography color="textPrimary">Explicit Knowledge</Typography>
                  </Breadcrumbs>
                </div>
                <div style={{
                  width:"50%",
                  display:"flex",
                  flexDirection:"row-reverse"
                }}>
                  <Paper className={classes.root} elevation={1}>
                      <InputBase className={classes.input} name="inputSearch" value={this.state.inputSearch} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder="Search here..." />
                      <IconButton className={classes.iconButton} onClick={this.getDataSearch} aria-label="Search">
                          <SearchIcon />
                      </IconButton>
                  </Paper>  
                </div>
              </div>
              {
                this.state.onEror ? <ErorPage />
                :
            this.state.loading ?
              <Spinner/>
              :
              <Fragment>
              
              <div style={{
                  display:"flex",
                  flexDirection:"row",
                  margin:"auto",
                  //border:"hsl(0,0%,80%) 1px solid",
                  width:"95%",
                  marginTop: "10px",
                  marginBottom: "10px"
              }}>
                  <div style={{
                      width:"20%",
                      //position: "fixed"
                      //border:"hsl(0,0%,80%) 1px solid"
                  }}> 
                    <div style={{
                      width:"20%",
                      position: "fixed"
                    }}>
                      <h1 style={{
                        margin :"0",
                      }}>FILTER :</h1>
                     <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Date :</FormLabel>
                      <RadioGroup
                        aria-label="Date"
                        name="date"
                        className={classes.group}
                        onChange={this.changeFilter}
                      >
                        <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                        <FormControlLabel value="desc" control={<Radio />} label="Descending" />
                      </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Name :</FormLabel>
                      <RadioGroup
                        aria-label="Name"
                        name="name"
                        className={classes.group}
                        onChange={this.changeFilter}
                      >
                        <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                        <FormControlLabel value="desc" control={<Radio />} label="Descending" />
                      </RadioGroup>
                    </FormControl>
                    </div>
                  </div>
                  <div style={{
                      width:"80%",
                      //border:"hsl(0,0%,80%) 1px solid",
                      padding: "25px",
                      minHeight:"500px",
                      backgroundColor: "#f1f1f1"
                  }}>
                    {
                      this.state.inputSearch !== '' && this.state.onSearch.length !== 0 
                      ?
                      this.state.onSearch.map(item =>
                        <ListExplicit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} update={this.updateBtn} delete={this.deleteBtn}/>
                      )
                      :
                      this.state.explicit.map(item =>
                        <ListExplicit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} update={this.updateBtn} delete={this.deleteBtn}/>
                      )
                  }
                    </div>
                </div>  
              <Pagination
                style={{
                  margin:"auto",
                  marginBottom: "10px"
                }}
                size='large'
                limit={10}
                offset={this.state.offset}
                total={this.state.onSearch.length === 0 ? 10 * this.state.pages : this.state.pages}
                onClick={(e,offset, page) => this.handleClick(offset,page)}
              />  
              <Fab style={{
                   position:"fixed",
                   width:"45px",
                   height:"45px",
                   bottom:"25px",
                   right:"25px"
                 }} color="primary" aria-label="Add" href={'/form/explicit'}>
                  <AddIcon />
                </Fab>
            </Fragment>
          }
           {this.state.snackbar.open === true ? <SnackBar data={this.state.snackbar} close={this.closeBtn}/>
              : 
              null
              }
              {this.state.modal.open === true ? <ModalExplicit data={this.state.onSelect} modal={this.state.modal} close={this.closeBtn}/>
                        : 
                        null
              }
            </div>
        );
    }
}

export default withStyles(styles)(ExplicitPage);
