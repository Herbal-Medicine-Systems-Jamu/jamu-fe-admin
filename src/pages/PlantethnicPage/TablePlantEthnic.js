import React from "react";
import MaterialTable from "material-table";
import Axios from "axios";

import ModalPlantEthnic from "../../components/modal/ModalPlantEthnic";
import Spinner from "../../components/spinner/Spinner";
import SnackBar from "../../components/snackbar/SnackBar";

class TabelPlantEthnic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      columns: [
        { title: "Ethnic", field: "ethnic" },
        { title: "Disease in Bahasa", field: "disease_ina" },
        { title: "Disease in English", field: "disease_ing" },
        { title: "Name Plant in Bahasa", field: "name_ina" },
        { title: "Species", field: "species" },
        { title: "Family", field: "family" },
        { title: "Use Section in Bahasa", field: "section_ina" },
        { title: "Use Section in English", field: "section_ing" }
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
    this.closeBtn = this.closeBtn.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const urlPlant = "/jamu/api/plant/getlist";
    const resPlant = await Axios.get(urlPlant);
    let dataPlant = await resPlant.data.data;
    let basePlant = dataPlant.map(dt => {
      return {
        label: dt.sname,
        value: dt._id
      };
    });

    const urlEthnic = "/jamu/api/ethnic/getlist";
    const resEthnic = await Axios.get(urlEthnic);
    let dataEthnic = await resEthnic.data.data;
    let baseEthnic = dataEthnic.map(dt => {
      return {
        label: dt.name,
        value: dt._id
      };
    });

    const urlProvince = "/jamu/api/province/getlist";
    const resprovince = await Axios.get(urlProvince);
    let dataProvince = await resprovince.data.data;
    let baseProvince = dataProvince.map(dt => {
      return {
        label: dt.province_name,
        value: dt._id
      };
    });

    this.setState({
      baseEthnic: baseEthnic,
      basePlant: basePlant,
      baseProvince: baseProvince
    });

    await this.getData();
  }

  async getData() {
    const url = "/jamu/api/plantethnic/";
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
            title="Plant Ethnic Management Table"
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
          <ModalPlantEthnic
            data={this.state.onSelect}
            afterUpdate={this.afterUpdate}
            modal={this.state.modal}
            close={this.closeBtn}
            baseEthnic={this.state.baseEthnic}
            basePlant={this.state.basePlant}
            baseProvince={this.state.baseProvince}
          />
        ) : null}

        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}

export default TabelPlantEthnic;
