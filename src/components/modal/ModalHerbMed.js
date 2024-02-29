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

const ModalRefCrude = (props) => {
  return (
    <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">You update herbal medicine with</DialogTitle>
          <DialogContent style={{
            height:"200px"
          }}>
            <Select
              onChange={props.handleChange('addCrude')}
              options={props.baseCrude}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={props.handleAddCrude} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
  )
}
class ModalHerbMed extends Component {
    constructor(props) {
        super(props);
        this.state = {
          openModalCrude: false,
          addCrude: null,
          loading: false,
          _id: '',
          idherbsmed:'',
          name: '',
          nameloc1: '',
          nameloc2: '',
          efficacy: '',
          efficacyloc: '',
          ref: '',
          idclass: '',
          idcompany: '',
          idtype: '',
          img: '',
          __v: null,
          refMedtype: null,
          refCompany: null,
          refDclass: null,
          refCrude: [],
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.handleAddCrude = this.handleAddCrude.bind(this);
        this.handleDeleteCrude = this.handleDeleteCrude.bind(this);
      }

      async componentDidMount() {
        if( this.props.modal.mode === 'update' || this.props.modal.mode === 'detail' || this.props.modal.mode === 'delete'){
            
          let dataCrude =  await this.props.data.refCrude.map(dt => {
            return {label:dt.sname,value:dt._id}
          });
          let refMedtype =  this.props.data.refMedtype !== null ? await this.props.baseMedtype.find(dt => dt.value === this.props.data.refMedtype._id) : null;
          let refCompany =  this.props.data.refCompany !== null ? await this.props.baseCompany.find(dt => dt.value === this.props.data.refCompany._id) : null;
          let refDclass =  this.props.data.refDclass !== null ? await this.props.baseDclass.find(dt => dt.value === this.props.data.refDclass._id) : null;
            
            this.setState({
                _id: this.props.data._id,
                idherbsmed:this.props.data.idherbsmed,
                name: this.props.data.name,
                nameloc1: this.props.data.nameloc1,
                nameloc2: this.props.data.nameloc2,
                efficacy: this.props.data.efficacy,
                efficacyloc: this.props.data.efficacyloc,
                ref: this.props.data.ref,
                idclass: this.props.data.idclass,
                idcompany: this.props.data.idcompany,
                idtype: this.props.data.idtype,
                img: this.props.data.img,
                __v: this.props.data.__v,
                refMedtype: refMedtype === undefined ? null : refMedtype,
                refCompany: refCompany === undefined ? null : refCompany,
                refDclass: refDclass === undefined ? null : refDclass,
                refCrude: dataCrude
            })

           
        }
      }

      handleAddCrude = () => {
        let newData = this.state.refCrude.concat(this.state.addCrude);
        this.setState({
          refCrude: newData,
          addCrude: null
        });
        this.togglePopup();
      }

      handleDeleteCrude = (e) => {
        console.log(e.target.id)
        let newData = this.state.refCrude.filter(dt => dt.value !== e.target.id);
        this.setState({
          refCrude: newData
        });
      }

      togglePopup = () => {
        this.setState({
          openModalCrude: !this.state.openModalCrude
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
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': user.token
                }
            };
            
        let url = '/jamu/api/herbsmed/update/' + this.state.idherbsmed

        const formData = new FormData();
      formData.append('_id',this.state._id);
      formData.append('idherbsmed',this.state.idherbsmed);
      formData.append('name',this.state.name);
      formData.append('nameloc1',this.state.nameloc1);
      formData.append('nameloc2',this.state.nameloc2);
      formData.append('efficacy',this.state.efficacy);
      formData.append('efficacyloc',this.state.efficacyloc);
      formData.append('ref',this.state.ref);
      formData.append('idclass',this.state.idclass);
      formData.append('idcompany',this.state.idcompany);
      formData.append('idtype',this.state.idtype);
      formData.append('img',this.state.img);
      formData.append('refMedtype',this.state.refMedtype !== null ? this.state.refMedtype.value : '');
      formData.append('refCompany',this.state.refCompany !== null ? this.state.refCompany.value : '');
      formData.append('refDclass',this.state.refDclass !== null ? this.state.refDclass.value : '');
      this.state.refCrude.forEach(item =>{
        formData.append('refCrude',item.value);
      })
      console.log(formData)
      Axios.patch( url,formData ,axiosConfig)
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
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': user.token
              }
          };
          
      let url = '/jamu/api/herbsmed/add';

      const formData = new FormData();
      formData.append('idherbsmed',this.state.idherbsmed);
      formData.append('name',this.state.name);
      formData.append('nameloc1',this.state.nameloc1);
      formData.append('nameloc2',this.state.nameloc2);
      formData.append('efficacy',this.state.efficacy);
      formData.append('efficacyloc',this.state.efficacyloc);
      formData.append('ref',this.state.ref);
      formData.append('idclass',this.state.idclass);
      formData.append('idcompany',this.state.idcompany);
      formData.append('idtype',this.state.idtype);
      formData.append('img',this.state.img);
      formData.append('refMedtype',this.state.refMedtype.value);
      formData.append('refCompany',this.state.refCompany.value);
      formData.append('refDclass',this.state.refDclass.value);
      this.state.refCrude.forEach(item => {
        formData.append('refCrude',item.value);
      })
      Axios.post( url,formData,axiosConfig)
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
            
        let url = '/jamu/api/herbsmed/delete/' + this.state.idherbsmed
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
          <DialogTitle id="form-dialog-title">You update herbal medicine with id {this.state.idherbsmed}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idherbsmed}
            </DialogContentText> */}
             <Button
              containerElement='imageherbmeds' // <-- Just add me!
              label="herbal medicine image">
              <input type="file" name="img" onChange={this.onChange} />
            </Button>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              type="text"
              value={this.state.name}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc1"
              label="Name Location 1"
              name="nameloc1"
              type="text"
              value={this.state.nameloc1}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc2"
              label="Name Location 2"
              name="nameloc2"
              type="text"
              value={this.state.nameloc2}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              multiline rows={10}
              margin="dense"
              id="efficacy"
              label="Efficacy"
              name="efficacy"
              type="text"
              value={this.state.efficacy}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name"
              label="Efficacy Location"
              name="efficacyloc"
              type="text"
              value={this.state.efficacyloc}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="ref"
              label="Refren"
              name="ref"
              type="text"
              value={this.state.ref}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idclass"
              label="Id Class"
              name="idclass"
              type="text"
              value={this.state.idclass}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idtype"
              label="Id Ttype"
              name="idtype"
              type="text"
              value={this.state.idtype}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idcompany"
              label="Id Company"
              name="idcompany"
              type="text"
              value={this.state.idcompany}
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
              referen medicine type
            </label>
            <Select
              value={this.state.refMedtype}
              onChange={this.handleChange('refMedtype')}
              options={this.props.baseMedtype}
            />
             <label style={{
               color:"grey",
               fontWeight:"lighter",
               fontSize:"13px",
               display:"block",
               marginTop:"10px",
               marginBottom:"5px"
             }}>
              referen company of herbal medicine
            </label>
            <Select
              value={this.state.refCompany}
              onChange={this.handleChange('refCompany')}
              options={this.props.baseCompany}
            />
             <label style={{
              color:"grey",
              fontWeight:"lighter",
              fontSize:"13px",
              display:"block",
              marginTop:"10px",
              marginBottom:"5px"
             }}>
              referen diseases class 
            </label>
            <Select
              value={this.state.refDclass}
              onChange={this.handleChange('refDclass')}
              options={this.props.baseDclass}
            />
            <label style={{
               color:"grey",
               fontWeight:"lighter",
               fontSize:"13px",
               display:"block",
               marginTop:"10px"
             }}>
              referen crude drug : 
            </label>
            <Button onClick={this.togglePopup} color="primary">
              Add Crude Drug
            </Button>
            {this.state.openModalCrude === true ? <ModalRefCrude baseCrude={this.props.baseCrude} handleChange={this.handleChange} handleAddCrude={this.handleAddCrude} close={this.togglePopup} open={this.state.openModalCrude} />
              : 
              null
              }
            <ul className="reff">
                 {this.state.refCrude.map( item => (
                    <List item = { item } delete={this.handleDeleteCrude} />
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
            You want delete herbal medicine record data with id {this.state.idherbsmed} and name {this.state.name}
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
          <DialogTitle id="form-dialog-title">Create Record data Herbal Medicine :</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idherbsmed}
            </DialogContentText> */}
            <Button
              containerElement='imageherbmeds' // <-- Just add me!
              label="herbal medicine image">
              <input type="file" name="img" onChange={this.onChange} />
            </Button>
            <TextField
              autoFocus
              margin="dense"
              id="idherbsmed"
              label="ID Herbal Medicine"
              name="idherbsmed"
              type="text"
              value={this.state.idherbsmed}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="name"
              label="Name"
              name="name"
              type="text"
              value={this.state.name}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc1"
              label="Name Location 1"
              name="nameloc1"
              type="text"
              value={this.state.nameloc1}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc2"
              label="Name Location 2"
              name="nameloc2"
              type="text"
              value={this.state.nameloc2}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              multiline rows={10}
              margin="dense"
              id="efficacy"
              label="Efficacy"
              name="efficacy"
              type="text"
              value={this.state.efficacy}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name"
              label="Efficacy Location"
              name="efficacyloc"
              type="text"
              value={this.state.efficacyloc}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="ref"
              label="Refren"
              name="ref"
              type="text"
              value={this.state.ref}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idclass"
              label="Id Class"
              name="idclass"
              type="text"
              value={this.state.idclass}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idtype"
              label="Id Ttype"
              name="idtype"
              type="text"
              value={this.state.idtype}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idcompany"
              label="Id Company"
              name="idcompany"
              type="text"
              value={this.state.idcompany}
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
              referen medicine type
            </label>
            <Select
              value={this.state.refMedtype}
              onChange={this.handleChange('refMedtype')}
              options={this.props.baseMedtype}
            />
            <label style={{
              color:"grey",
              fontWeight:"lighter",
              fontSize:"13px",
              display:"block",
              marginTop:"10px",
              marginBottom:"5px"
             }}>
              referen company of herbal medicine
            </label>
            <Select
              value={this.state.refCompany}
              onChange={this.handleChange('refCompany')}
              options={this.props.baseCompany}
            />
            <label style={{
              color:"grey",
              fontWeight:"lighter",
              fontSize:"13px",
              display:"block",
              marginTop:"10px",
              marginBottom:"5px"
             }}>
              referen diseases class 
            </label>
            <Select
              value={this.state.refDclass}
              onChange={this.handleChange('refDclass')}
              options={this.props.baseDclass}
            />
            <label style={{
               color:"grey",
               fontWeight:"lighter",
               fontSize:"13px",
               display:"block",
               marginTop:"10px"
             }}>
              referen crude drug : 
            </label>
            <Button onClick={this.togglePopup} color="primary">
              Add Crude Drug
            </Button>
            {this.state.openModalCrude === true ? <ModalRefCrude baseCrude={this.props.baseCrude} handleChange={this.handleChange} handleAddCrude={this.handleAddCrude} close={this.togglePopup} open={this.state.openModalCrude} />
              : 
              null
              }
            <ul className="reff">
                 {this.state.refCrude.map( item => (
                    <List item = { item } delete={this.handleDeleteCrude} />
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

export default ModalHerbMed;
