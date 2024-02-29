import React from "react";
import MaterialTable from "material-table";
import Axios from "axios";

import ModalMedType from "../../components/modal/ModalMedicineType";

import Spinner from "../../components/spinner/Spinner";
import SnackBar from "../../components/snackbar/SnackBar";

class TableMedicineType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "ID Type of Medicine", field: "idtype" },
        { title: "Medicine Name", field: "medname" }
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
      onSelect: null,
      baseProvince: []
    };
    this.closeBtn = this.closeBtn.bind(this);
    this.getData = this.getData.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    // window.addEventListener('scroll', this.onScroll);
    this.getData();
  }

  async getData() {
    const url = "/jamu/api/medtype";
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      data: data.data,
      loading: false
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

  render() {
    return (
      <div style={{ padding: "15px" }}>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <MaterialTable
            title="Management Table Medicine Type"
            columns={this.state.columns}
            data={this.state.data}
            actions={[
              {
                icon: "edit",
                tooltip: "Save Company",
                onClick: (event, rowData) => {
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
                fontSize: "17px",
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
          <ModalMedType
            baseProvince={this.state.baseProvince}
            afterUpdate={this.afterUpdate}
            data={this.state.onSelect}
            modal={this.state.modal}
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

export default TableMedicineType;
