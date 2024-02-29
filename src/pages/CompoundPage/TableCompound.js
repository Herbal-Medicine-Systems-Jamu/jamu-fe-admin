import React from "react";
import MaterialTable from "material-table";
import Axios from "axios";

import Spinner from "../../components/spinner/Spinner";
import SnackBar from "../../components/snackbar/SnackBar";

import ModalCompound from "../../components/modal/ModalCompound";

class TableCompound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      columns: [
        { title: "Compound ID", field: "compound_id" },
        { title: "Compound Name", field: "cname" },
        { title: "Effect Compound", field: "effect_compound" },
        { title: "Pubchem ID", field: "pubchem_ID" },
        { title: "Knapsack ID", field: "knapsack_ID" },
        { title: "Chemspider ID", field: "chemspider_ID" },
        { title: "Other ID", field: "other_ID" },
        { title: "note", field: "note" },
        { title: "reference Effect", field: "ref_effect" }
      ],
      data: [],
      modal: {
        open: false,
        mode: ""
      },
      snackbar: {
        open: false,
        success: false,
        message: ""
      },
      onSelect: null
    };
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    const urlPlant = "/jamu/api/plant/getlist";
    const resPlant = await Axios.get(urlPlant);
    let dataPlant = await resPlant.data.data.map(dt => {
      return { label: dt.sname, value: dt._id };
    });
    this.setState({
      plant: dataPlant
    });
    await this.getData();
  }

  async getData() {
    // this.setState({
    //   loading: true
    // });
    try {
      const url = "/jamu/api/compound/";
      const res = await Axios.get(url);
      const { data } = await res;

      this.setState({
        data: data.data,
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

  async afterUpdate(success, message) {
    this.getData();
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

  render() {
    return (
      <div style={{ padding: "15px" }}>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <MaterialTable
            title="Compound Management Table"
            columns={this.state.columns}
            data={this.state.data}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Compound",
                onClick: (event, rowData) => {
                  // let onSelect = this.state.compounds.find(c => {
                  //   return c._id === rowData._id;
                  // });
                  console.log(rowData);
                  this.setState({
                    onSelect: rowData,
                    modal: {
                      open: true,
                      mode: "update"
                    }
                  });
                }
              },
              {
                icon: "delete",
                tooltip: "Delete Company",
                onClick: (event, rowData) => {
                  this.setState({
                    onSelect: rowData,
                    modal: {
                      open: true,
                      mode: "delete"
                    }
                  });
                }
              },
              {
                icon: "add",
                tooltip: "Add Company",
                isFreeAction: true,
                onClick: (event, rowData) => {
                  this.setState({
                    modal: {
                      open: true,
                      mode: "add"
                    }
                  });
                }
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              pageSize: 10,
              headerStyle: {
                fontSize: "15px",
                backgroundColor: "#6c7ae0",
                color: "#FFF"
              },
              rowStyle: rowData => ({
                backgroundColor:
                  rowData.tableData.id % 2 === 0 ? "#fff" : "#f8f6ff"
              })
            }}
          />
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
      </div>
    );
  }
}

export default TableCompound;
