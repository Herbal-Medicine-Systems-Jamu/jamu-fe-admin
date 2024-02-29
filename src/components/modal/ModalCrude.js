import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from 'react-select';

import LinearProgress from '../linear-progress/LinearProgress'

import Axios from 'axios'

const List = (props) => {
  if(props.item.sname !== ''){
    return <li>{props.item.label} <button id={props.item.value} onClick={props.delete}>delete</button></li>
  }

  return null;
}

const ModalRefPlant = (props) => {
  return (
    <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Select Reference Plant :</DialogTitle>
          <DialogContent
          style={{
            height:"200px"
          }}
          >
            <Select
              onChange={props.handleChange('addPlant')}
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
  )
}
class ModalCrude extends Component {
    constructor(props) {
        super(props);
        this.state = {
          openModalPlant: false,
          addPlant: null,
          loading: false,
          _id: '',
          idcrude:'',
          sname: '',
          name_en: '',
          name_loc1: '',
          name_loc2: '',
          gname: '',
          position: '',
          effect: '',
          effect_loc: '',
          comment: '',
          ref: '',
          refPlant: []
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.handleAddPlant = this.handleAddPlant.bind(this);
        this.handleDeletePlant = this.handleDeletePlant.bind(this);
      }

      async componentDidMount() {
        if( this.props.modal.mode === 'update' || this.props.modal.mode === 'detail' || this.props.modal.mode === 'delete'){
            
          let dataPlant =  await this.props.data.refPlant.map(dt => {
            return {label:dt.sname,value:dt._id}
          });
            
            this.setState({
                _id: this.props.data._id,
                idcrude: this.props.data.idcrude,
                sname: this.props.data.sname,
                name_en: this.props.data.name_en,
                name_loc1: this.props.data.name_loc1,
                name_loc2: this.props.data.name_loc2,
                gname: this.props.data.gname,
                position: this.props.data.position,
                effect: this.props.data.effect,
                effect_loc: this.props.data.effect_loc,
                comment: this.props.data.comment,
                ref: this.props.data.ref,
                refPlant: dataPlant
            })

           
        }
      }

      handleAddPlant = () => {
        let newData = this.state.refPlant.concat(this.state.addPlant);
        this.setState({
          refPlant: newData,
          addPlant: null
        });
        this.togglePopup();
      }

      handleDeletePlant = (e) => {
        console.log(e.target.id)
        let newData = this.state.refPlant.filter(dt => dt.value !== e.target.id);
        this.setState({
          refPlant: newData
        });
      }

      togglePopup = () => {
        this.setState({
          openModalPlant: !this.state.openModalPlant
        });
      }

      handleChange = name => value => {
        this.setState({
          [name]: value,
        });
        console.log(this.state)
      };

      valueChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      onChange(e) {
        this.setState({img:e.target.files[0]})
      }

      handleSubmitUpdate = event => {
        this.setState({
          loading: true
        })
        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                }
            };
            
        let url = '/jamu/api/crudedrug/update/' + this.state.idcrude
        let refPlant = this.state.refPlant.map(data => data.value)
      Axios.patch( url,{
        idcrude: this.state.idcrude,
        sname: this.state.sname,
        name_en: this.state.name_en,
        name_loc1: this.state.name_loc1,
        name_loc2: this.state.name_loc2,
        gname: this.state.gname,
        position: this.state.position,
        effect: this.state.effect,
        effect_loc: this.state.effect_loc,
        comment: this.state.comment,
        ref: this.state.ref,
        refPlant: refPlant
      },axiosConfig)
        .then(data => {
          const res = data.data;
          this.props.afterUpdate(res.success, res.message);
          this.setState({
            loading: false
          })
        })
        .catch(err => {
          if (err.response.data.message) {
            this.props.afterUpdate(false, err.response.data.message);
            this.setState({
              loading: false
            })
          }else{
            this.props.afterUpdate(false, err.message);
            this.setState({
              loading: false
            })
          }
        });
    }

    handleSubmitAdd = event => {
      this.setState({
        loading: true
      })
      let user = localStorage.getItem("user")
      user = JSON.parse(user)
      let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': user.token
              }
          };
          
      let url = '/jamu/api/crudedrug/add';
      let refPlant = this.state.refPlant.map(data => data.value)
      Axios.post( url,{
        idcrude: this.state.idcrude,
        sname: this.state.sname,
        name_en: this.state.name_en,
        name_loc1: this.state.name_loc1,
        name_loc2: this.state.name_loc2,
        gname: this.state.gname,
        position: this.state.position,
        effect: this.state.effect,
        effect_loc: this.state.effect_loc,
        comment: this.state.comment,
        ref: this.state.ref,
        refPlant: refPlant
      },axiosConfig)
        .then(data => {
          const res = data.data;
          this.props.afterUpdate(res.success, res.message);
          this.setState({
            loading: false
          })
        })
        .catch(err => {
          if (err.response.data.message) {
            this.props.afterUpdate(false, err.response.data.message);
            this.setState({
              loading: false
            })
          }else{
            this.props.afterUpdate(false, err.message);
            this.setState({
              loading: false
            })
          }
        });
    }

    handleSubmitDelete = event => {
      this.setState({
        loading: true
      })
        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        let axiosConfig = {
                headers: {
                    'Authorization': user.token
                }
            };
            
        let url = '/jamu/api/crudedrug/delete/' + this.state.idcrude
      Axios.delete( url,axiosConfig)
        .then(data => {
          const res = data.data;
          this.props.afterUpdate(res.success, res.message);
          this.setState({
            loading: false
          })
        })
        .catch(err => {
          if (err.response.data.message) {
            this.props.afterUpdate(false, err.response.data.message);
            this.setState({
              loading: false
            })
          }else{
            this.props.afterUpdate(false, err.message);
            this.setState({
              loading: false
            })
          }
        })
    }

render() {
  if(this.props.modal.mode === 'update'){
    return (
      <div>
        <Dialog open={this.props.modal.open} onClose={this.props.close} aria-labelledby="form-dialog-title">
        {this.state.loading ? 
              <LinearProgress />
                        : 
                        null
              }
          <DialogTitle id="form-dialog-title">You update Crude Drug with id {this.state.idcrude} and name is {this.state.sname}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idcrude}
            </DialogContentText> */}
            {/* <TextField
              autoFocus
              margin="dense"
              id="idcrude"
              label="ID for Crude Drug"
              name="idcrude"
              type="text"
              value={this.state.idcrude}
              fullWidth
              onChange={this.valueChange}
            /> */}
            <TextField
              margin="dense"
              id="sname"
              label="sname"
              name="sname"
              type="text"
              value={this.state.sname}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="name_en"
              label="name in english"
              name="name_en"
              type="text"
              value={this.state.name_en}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name_loc1"
              label="Name Location 1"
              name="name_loc1"
              type="text"
              value={this.state.name_loc1}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name_loc2"
              label="Name Location 2"
              name="name_loc2"
              type="text"
              value={this.state.name_loc2}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="gname"
              label="GLobal Name"
              name="gname"
              type="text"
              value={this.state.gname}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="effect"
              label="Effect"
              name="effect"
              type="text"
              value={this.state.effect}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="effect_loc"
              label="Location of Effect"
              name="effect_loc"
              type="text"
              value={this.state.effect_loc}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              multiline rows={10}
              margin="dense"
              id="comment"
              label="Comment"
              name="comment"
              type="text"
              value={this.state.comment}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              multiline rows={10}
              margin="dense"
              id="ref"
              label="Refren"
              name="ref"
              type="text"
              value={this.state.ref}
              fullWidth
              onChange={this.valueChange}
            />
            <label style={{
               color:"grey",
               fontWeight:"lighter",
               fontSize:"13px",
               display:"block",
               marginTop:"10px",
               marginBottom:"5px"
             }}>
              Reference Plant : 
            </label>
            <Button onClick={this.togglePopup} color="primary">
              Add Refren Plant
            </Button>
            {this.state.openModalPlant === true ? <ModalRefPlant basePlant={this.props.basePlant} handleChange={this.handleChange} handleAddPlant={this.handleAddPlant} close={this.togglePopup} open={this.state.openModalPlant} />
              : 
              null
              }
            <ul className="reff">
                 {this.state.refPlant.map( item => (
                    <List item = { item } delete={this.handleDeletePlant} />
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
  }else if(this.props.modal.mode === 'delete') {
    return (
      <Dialog
        open={this.props.modal.open}
        onClose={this.props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {this.state.loading ? 
              <LinearProgress />
                        : 
                        null
              }
        <DialogTitle id="alert-dialog-title">{"You want delete ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You want delete crude drug record data with id {this.state.idcrude} and name {this.state.sname}
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
    )
  }else if(this.props.modal.mode === 'detail') {

  }else if(this.props.modal.mode === 'add') {
    return (
      <Dialog open={this.props.modal.open} onClose={this.props.close} aria-labelledby="form-dialog-title">
          {this.state.loading ? 
              <LinearProgress />
                        : 
                        null
              }
          <DialogTitle id="form-dialog-title">Create Record Data Crude Drug :</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idcrude}
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="idcrude"
              label="ID for Crude Drug"
              name="idcrude"
              type="text"
              value={this.state.idcrude}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="sname"
              label="sname"
              name="sname"
              type="text"
              value={this.state.sname}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="name_en"
              label="name in english"
              name="name_en"
              type="text"
              value={this.state.name_en}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name_loc1"
              label="Name Location 1"
              name="name_loc1"
              type="text"
              value={this.state.name_loc1}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name_loc2"
              label="Name Location 2"
              name="name_loc2"
              type="text"
              value={this.state.name_loc2}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="gname"
              label="GLobal Name"
              name="gname"
              type="text"
              value={this.state.gname}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="effect"
              label="Effect"
              name="effect"
              type="text"
              value={this.state.effect}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="effect_loc"
              label="Location of Effect"
              name="effect_loc"
              type="text"
              value={this.state.effect_loc}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              multiline rows={10}
              margin="dense"
              id="comment"
              label="Comment"
              name="comment"
              type="text"
              value={this.state.comment}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              multiline rows={10}
              margin="dense"
              id="ref"
              label="Refren"
              name="ref"
              type="text"
              value={this.state.ref}
              fullWidth
              onChange={this.valueChange}
            />
             <label style={{
               color:"grey",
               fontWeight:"lighter",
               fontSize:"13px",
               display:"block",
               marginTop:"10px",
               marginBottom:"5px"
             }}>
              Reference Plant : 
            </label>
            <Button onClick={this.togglePopup} color="primary">
              Add Refren Plant
            </Button>
            {this.state.openModalPlant === true ? <ModalRefPlant basePlant={this.props.basePlant} handleChange={this.handleChange} handleAddPlant={this.handleAddPlant} close={this.togglePopup} open={this.state.openModalPlant} />
              : 
              null
              }
            <ul className="reff">
                 {this.state.refPlant.map( item => (
                    <List item = { item } delete={this.handleDeletePlant} />
                ))} 
            
          </ul>
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
    )
  }
    }
}

export default ModalCrude;
