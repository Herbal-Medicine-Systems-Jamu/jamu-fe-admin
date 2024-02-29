import React from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "./components/navigation/NavigationCoba";

import Login from "./pages/LoginPage/Login";
import HerbMeds from "./pages/HerbmedPage/HerbMedPage";
import TableMedicineType from "./pages/MedtypePage/TableMedicineType";
import MaterialTableDemo from "./pages/CompanyPage/TableCompany";
import DclassPage from "./pages/DclassPage/DclassPage";
import TableEthnic from "./pages/EthnicPage/TableEthnic";
import TablePlantEthnic from "./pages/PlantethnicPage/TablePlantEthnic";
import Plant from "./pages/PlantPage/PlantPage";
import CrudeDrugPage from "./pages/CrudePage/CrudeDrugPage";
import Landing from "./pages/LandingPage/Landing";
import TableCompound from "./pages/CompoundPage/TableCompound";

import TacitPage from "./pages/TacitPage/TacitPage2";
import ExplicitPage from "./pages/ExplicitPage/ExplicitPage2";

import FormExplicit from "./pages/FormExplicitPage/FormExplicit";
import { ProtectedRoute } from "./protected.route";
import axios from "axios";

import "./App.css";
import FormTacit from "./pages/FormTacitPage/FormTacit";
//import CompoundPage from "./page/CompoundPage/CompoundPage";

// axios.defaults.baseURL = "http://localhost:3003";
axios.defaults.baseURL = "https://api.jamumedicine.com";

function App() {
  const path = window.location.pathname;

  if (path !== "/login" && path !== "/register") {
    return (
      <div>
        <Navigation>
          <Switch>
            <ProtectedRoute exact path="/" component={Landing} />

            {/* <ProtectedRoute exact path="/herbmeds" component={HerbMeds} /> */}

            <ProtectedRoute exact path="/herbmeds/:type" component={HerbMeds} />

            <ProtectedRoute
              exact
              path="/medtype"
              component={TableMedicineType}
            />
            <ProtectedRoute
              exact
              path="/company"
              component={MaterialTableDemo}
            />
            <ProtectedRoute exact path="/dclass" component={DclassPage} />

            <ProtectedRoute exact path="/plant" component={Plant} />
            <ProtectedRoute exact path="/crudedrug" component={CrudeDrugPage} />

            <ProtectedRoute exact path="/tacit" component={TacitPage} />
            <ProtectedRoute exact path="/form/tacit" component={FormTacit} />
            <ProtectedRoute
              exact
              path="/edit/tacit/:id"
              component={FormTacit}
            />
            <ProtectedRoute exact path="/explicit" component={ExplicitPage} />
            <ProtectedRoute
              exact
              path="/form/explicit"
              component={FormExplicit}
            />
            <ProtectedRoute exact path="/compound" component={TableCompound} />

            <ProtectedRoute
              exact
              path="/table/compound"
              component={TableCompound}
            />

            <ProtectedRoute exact path="/ethnic" component={TableEthnic} />
            <ProtectedRoute
              exact
              path="/plantethnic"
              component={TablePlantEthnic}
            />
          </Switch>
        </Navigation>
      </div>
    );
  }
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
