import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LinearProgress from '../linear-progress/LinearProgress'

import Axios from 'axios'

class ModalCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          _id: '',
          idcompany:'',
          cname: '',
          address: '',
          city: '',
          country: '',
          postcode: '',
          contact: '',
          url: ''
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.onChange = this.onChange.bind(this);
      }

      async componentDidMount() {
        if( this.props.modal.mode === 'update' || this.props.modal.mode === 'detail' || this.props.modal.mode === 'delete'){
            this.setState({
                _id: this.props.data._id,
                idcompany:this.props.data.idcompany,
                cname: this.props.data.cname,
                address: this.props.data.address,
                city: this.props.data.city,
                country: this.props.data.country,
                postcode: this.props.data.postcode,
                contact: this.props.data.contact,
                url: this.props.data.url
            })

           
        }
      }

      valueChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      onChange(e) {
        this.setState({url:e.target.files[0]})
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
            
        let url = '/jamu/api/company/update/' + this.state.idcompany

      Axios.patch( url,{
        cname: this.state.cname,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postcode: this.state.postcode,
        contact: this.state.contact,
        url: this.state.url,
        } ,axiosConfig)
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
            
        let url = '/jamu/api/company/add'
      Axios.post( url, {
        idcompany: this.state.idcompany,
        cname: this.state.cname,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postcode: this.state.postcode,
        contact: this.state.contact,
        url: this.state.url,
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
        })
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
            
        let url = '/jamu/api/company/delete/' + this.state.idcompany
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
          <DialogTitle id="form-dialog-title">You update company with id {this.state.idcompany} and name is {this.state.cname} :</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="cname"
              label="Company Name"
              name="cname"
              type="text"
              value={this.state.cname}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="address"
              label="Address"
              name="address"
              type="text"
              value={this.state.address}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="city"
              label="City"
              name="city"
              type="text"
              value={this.state.city}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="country"
              label="Country"
              name="country"
              type="text"
              value={this.state.country}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="postcode"
              label="Post Code"
              name="postcode"
              type="text"
              value={this.state.postcode}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="contact"
              label="Contact"
              name="contact"
              type="text"
              value={this.state.contact}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="url"
              label="Url"
              name="url"
              type="text"
              value={this.state.url}
              fullWidth
              onChange={this.valueChange}
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
          You want delete company with id {this.state.idcompany} and name is {this.state.cname} :
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
          <DialogTitle id="form-dialog-title">Create Data Record Company :</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="idcompany"
              label="ID Company"
              name="idcompany"
              type="text"
              value={this.state.idcompany}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="cname"
              label="Company Name"
              name="cname"
              type="text"
              value={this.state.cname}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="address"
              label="Address"
              name="address"
              type="text"
              value={this.state.address}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="city"
              label="City"
              name="city"
              type="text"
              value={this.state.city}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="country"
              label="Country"
              name="country"
              type="text"
              value={this.state.country}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="postcode"
              label="Post Code"
              name="postcode"
              type="text"
              value={this.state.postcode}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="contact"
              label="Contact"
              name="contact"
              type="text"
              value={this.state.contact}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="url"
              label="Url"
              name="url"
              type="text"
              value={this.state.url}
              fullWidth
              onChange={this.valueChange}
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
    )
  }
    }
}

export default ModalCompany;
