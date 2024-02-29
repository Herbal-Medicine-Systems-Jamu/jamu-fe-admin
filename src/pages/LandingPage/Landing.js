import React, { Component } from 'react'
import Axios from 'axios'

import PlantIcon from '../../icon/planticon.png'
import HerbMedIcon from '../../icon/herbmedicon.png'
import CompanyIcon from '../../icon/companyicon.png'
import CompoundIcon from '../../icon/compoundicon.png'
import CrudeIcon from '../../icon/crudeicon.png'
import DClassIcon from '../../icon/dclassicon.png'
import EthnicIcon from '../../icon/ethnicicon.png'
import ExplicitIcon from '../../icon/expliciticon.png'
import MedTypeIcon from '../../icon/medtypeicon.png'
import PlantethnicIcon from '../../icon/plantethnicicon.png'
import TacitIcon from '../../icon/taciticon.png'

import { Link } from "react-router-dom";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          count: {}
        }
      }

    async componentDidMount() {
        this.getData();
      }
    
      async getData(){
        const url = '/jamu/api/admin/dashbord';
        const res = await Axios.get(url);
        const { data } = await res;
        console.log(data.data)
        this.setState({
          count: data.data, 
          loading: false,
        })
      }

    render (){
        return (
            <div>
                 <div style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
                        gridGap: "2rem",
                        }}>

                          
                    <div style={{
                        height: "230px",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        display: "flex",
                        flexDirection:"column"
                        
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                        <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="herbal medicine icon" src={HerbMedIcon} />
                        <h2 style={{
                            margin: "0 10px"
                        }}> Herbal Medicine</h2>
                        </div>
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems :"center"
                        }}>
                            {/* <span 
                                style={{
                                    color:"grey",
                                    fontSize: "40px"
                                }}
                            >
                                {this.state.count.coutHerbsMed} 
                            </span> */}
                            <Link to="/herbmeds/jamu" style={{ textDecoration: 'none', color: 'grey'  }}> 
                            <span 
                                style={{
                                    color:"grey",
                                    fontSize: "40px"
                                }}
                            >
                                {`Jamu ${this.state.count.countJamu}`} 
                            </span>
                            </Link> 
                            <Link to="/herbmeds/kampo" style={{ textDecoration: 'none', color: 'grey'  }}> 
                            <span 
                                style={{
                                    color:"grey",
                                    fontSize: "40px"
                                }}
                            >
                                {`Kampo ${this.state.count.countKampo}`} 
                            </span>
                            </Link> 
                        </div>
                        
                    </div>
                   

                    <Link to="/plant" style={{ textDecoration: 'none', color: 'grey'  }}>  
                    <div style={{
                        height: "230px",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        display: "flex",
                        flexDirection:"column"
                        
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                        <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="plant icon" src={PlantIcon} />
                        <h2 style={{
                            margin: "0 10px"
                        }}> Plant</h2>
                        </div>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                            <span 
                                style={{
                                    color:"grey",
                                    fontSize: "100px"
                                }}
                            >
                                {this.state.count.countPlant} 
                            </span>
                        </div>
                    </div>
                    </Link>

                    <Link to="/compound" style={{ textDecoration: 'none', color: 'grey'  }}>  
                    <div style={{
                        height: "230px",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        display: "flex",
                        flexDirection:"column"
                        
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                            <img style={{
                                width: "40px",
                                height: "40px",
                                margin: "0"
                                }} alt="compound icon" src={CompoundIcon} />
                            <h2 style={{
                                margin: "0 10px"
                            }}> Compound </h2>
                        </div>
                        <div style={{
                            display:"flex",
                            justifyContent :"center"
                        }}>
                            <span 
                                style={{
                                    color:"grey",
                                    fontSize: "100px"
                                }}
                            >
                                {this.state.count.countCompound} 
                            </span>
                        </div>
                    </div>
                    </Link>
                </div>


                <div style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(13rem, 1fr))",
                        gridGap: "2rem",
                        }}>
                    <Link to="/ethnic" style={{ textDecoration: 'none'  }}>  
                    <div style={{
                        //backgroundImage: "linear-gradient(0deg,#3f51b5,#7684cf)",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="ethnic icon" src={EthnicIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Ethnic </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countEthnic}</h1>
                            </div>
                            
                    </div>
                    </Link>
                    
                    <Link to="/plantethnic" style={{ textDecoration: 'none'  }}> 
                    <div style={{
                        // backgroundColor: "#00bcd4",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="plant ethnic icon" src={PlantethnicIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Plant Ethnic </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countPlantethnic} </h1>
                            </div>
                    </div>
                    </Link>
                    
                    <Link to="/company" style={{ textDecoration: 'none'  }}> 
                    <div style={{
                        // backgroundColor: "#ff4081",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="company icon" src={CompanyIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Company </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countCompany}  </h1>
                            </div>
                    </div>
                    </Link>

                    <Link to="/dclass" style={{ textDecoration: 'none'  }}>
                    <div style={{
                        //  backgroundColor: "#ff9800",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="disease class icon" src={DClassIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Disease class </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countDclass}  </h1>
                            </div>
                    </div>
                    </Link>
                    
                    <Link to="/medtype" style={{ textDecoration: 'none'  }}>
                    <div style={{
                        // backgroundColor: "#20c997",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="medicine type icon" src={MedTypeIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Medicine Type </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countMedtype}  </h1>
                            </div>
                    </div>
                    </Link>

                    <Link to="/crudedrug" style={{ textDecoration: 'none'  }}>
                    <div style={{
                        // backgroundColor: "#dc3545",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="crude icon" src={CrudeIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Crude Drug </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countCrudeDrug}  </h1>
                            </div>
                    </div>
                    </Link>
                    
                    <Link to="/tacit" style={{ textDecoration: 'none'  }}>
                    <div style={{
                        // backgroundImage: "linear-gradient(90deg,#aa3c6d 0,#ff9800)",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="tacit icon" src={TacitIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Tacit Knowledge </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countTacit}  </h1>
                            </div>
                    </div>
                    </Link>
                    
                    <Link to="/explicit" style={{ textDecoration: 'none'  }}>
                    <div style={{
                        // backgroundImage: "linear-gradient(90deg,#3f51b5 0,#e91e63)",
                        // backgroundColor: "#007bff",
                        backgroundColor: "white",
                        height: "100px",
                        boxSizing: "border-box",
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
                        padding: "30px",
                        border: "0",
                        borderRadius: "0.375rem",
                        color:"grey",
                        display: "flex"
                    }}>
                         <img style={{
                            width: "40px",
                            height: "40px",
                            margin: "0"
                            }} alt="explicit icon" src={ExplicitIcon} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"center",
                                width: "80%"
                            }}> 
                                <h6 style={{
                                    margin: "0"
                                }}> Explicit Knowledge </h6>
                                <h1 style={{
                                    margin: "0"
                                }}> {this.state.count.countExplicit}  </h1>
                            </div>
                    </div>
                    </Link>
                    
                </div>

            </div>
        )
    }
}

export default Landing;