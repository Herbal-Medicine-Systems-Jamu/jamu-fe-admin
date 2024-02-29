import React from "react";
import MaterialTable from "material-table";
import Axios from "axios";

import Spinner from "../../components/spinner/Spinner";
import ModalEthnic from "../../components/modal/ModalEthnic";
import SnackBar from "../../components/snackbar/SnackBar";

class TableEthnic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      columns: [
        {
          title: "Name",
          field: "name"
        },
        {
          title: "Province",
          field: "refProvince.province_name"
        }
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
      baseProvince: [],
      basePlantethnic: []
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
    const urlProvince = "/jamu/api/province/getlist";
    const resProvince = await Axios.get(urlProvince);
    const baseProvince = await resProvince.data.data.map(dt => {
      return { label: dt.province_name, value: dt._id };
    });

    const urlPlantethnic = "/jamu/api/plantethnic/getlist";
    const resPlantethnic = await Axios.get(urlPlantethnic);
    const basePlantethnic = await resPlantethnic.data.data.map(dt => {
      return {
        label:
          (dt.name_ina !== "" ? dt.name_ina : dt.species) + " | " + dt.ethnic,
        value: dt._id
      };
    });

    this.setState({
      baseProvince: baseProvince,
      basePlantethnic: basePlantethnic
    });

    await this.getData();
  }

  async getData() {
    const url = "/jamu/api/ethnic";

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
            title="Ethnic Management Table"
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
          <ModalEthnic
            baseProvince={this.state.baseProvince}
            basePlantethnic={this.state.basePlantethnic}
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

export default TableEthnic;
