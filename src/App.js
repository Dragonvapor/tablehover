import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
// import { rowData } from "./data";
import axios from 'axios'
import './styles/table.css';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      envdata: [{
        PropertyName: "",
        PropertyValue: "",
        Category: ""
      }]
      ,
      editbox: false,
      PropertyName: "",
      PropertyValue: "",
      Category: "",
      id: "",
      pname: "",
      pval: "",
      pcat: "",
      currentProperty: null,
      iconShow: null,
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/EnvironmentProperties`)
      .then(res => {
        this.setState({ envdata: res.data });
      })
  }
  handleDelete = (id, e) => {
    alert(JSON.stringify(id))
    axios.delete(`http://localhost:3001/EnvironmentProperties/${id}`)
      .then(resp => {
        console.log(resp.data)
        const envdata = this.state.envdata.filter(e => e.id !== id);
        this.setState({ envdata });
      }).catch(error => {
        console.log(error);
      });
  }
  handleEdit = (id, e) => {
    // this.setState({ editbox: true, id: e.id, PropertyName: e.PropertyName, PropertyValue: e.PropertyValue, Category: e.Category })
    alert(JSON.stringify(e))
    this.setState({ currentProperty: e })
  }

  onKeyUp(event) {
    if (event.key === "Enter") {
      axios.put(`http://localhost:3001/EnvironmentProperties/${this.state.id}`, {
        id: this.state.id,
        PropertyName: this.state.PropertyName,
        PropertyValue: this.state.PropertyValue,
        Category: this.state.Category
      })
        .then(response => {
          console.log(response.data)
          window.location.href = "/"
        })
        .catch(error => {
          console.log(error);
        });
      this.setState({ editbox: false })
    }
  }
  handleEditChange(value) {
    this.setState({ PropertyValue: value })
  }
  handleOnAdd(key, value) {
    if (key == 'pname') {
      this.setState({ pname: value })
    }
    if (key == 'pval') {
      this.setState({ pval: value })
    }
    if (key == 'pcat') {
      this.setState({ pcat: value })
    }
  }
  handleAdd = () => {
    axios.post(`http://localhost:3001/EnvironmentProperties`, {
      // id: 8,
      PropertyName: this.state.pname,
      PropertyValue: this.state.pval,
      Category: this.state.pcat
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  toggleHover(data) {
    this.setState({ iconShow: data })
  }
  render() {
    return (
      <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{ marginTop: "1%", marginLeft: "90%" }} >Add data</button>
        <Container>
          <Row>
            <Col>
              <Tabs defaultActiveKey="Home" id="controlled-tab-example">
                <Tab eventKey="Comman" title="Comman">
                  <table class="table " id="envdata" >
                    <thead>
                      <tr>
                        {/* <th scope="col" className="tabledata">Property Name</th>
                        <th scope="col" className="tabledata">Property Value</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.envdata.map((e, key) => {
                        return (
                          <tr class="iconvisible " onMouseEnter={(event) => this.toggleHover(e)}>
                            <td className="tabledata">{e.PropertyName}</td>
                            <td className="tabledata">{this.state.currentProperty && this.state.currentProperty.PropertyName === e.PropertyName ? <input type="text" class="form-control" onKeyPress={this.onKeyUp} onChange={(event) => this.handleEditChange(event.target.value)} /> : <div>{e.PropertyValue}</div>}</td>
                            {this.state.currentProperty && this.state.currentProperty.PropertyName === e.PropertyName ?
                              <div>
                                <div>
                                  <i class="fa fa-pencil " style={{ marginTop: "8%" }} aria-hidden="true" onClick={(event) => this.handleEdit(e.id, e)}></i>
                                  <i class="fa fa-trash " style={{ marginTop: "7%" }} aria-hidden="true" onClick={(event) => this.handleDelete(e.id, e)}></i>
                                </div></div> :
                              <div>
                                <i class="fa fa-pencil edit" aria-hidden="true" onClick={(event) => this.handleEdit(e.id, e)}></i>
                                <i class="fa fa-trash edit" aria-hidden="true" onClick={(event) => this.handleDelete(e.id, e)}></i>
                              </div>}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey="cfcm" title="CFCM">
                  <table class="table table-sm" style={{ width: "95%" }}>
                    <thead>
                      <tr>
                        <th scope="col">Property Name</th>
                        <th scope="col">Property Value</th>
                      </tr>
                    </thead>
                  </table>
                  {this.state.envdata.filter(e => e.Category === 'cfcm').map(e => (
                    <table class="table table-sm" >
                      <tbody>
                        <tr>
                          <th colspan="2">{e.PropertyName}</th>
                          <td colspan="2" style={{ width: "50%" }}>{e.PropertyValue}</td>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </tr>
                      </tbody>
                    </table>
                  ))}

                </Tab>
                <Tab eventKey="cfcm2" title="CFCM2">
                  <table class="table table-sm" style={{ width: "95%" }}>
                    <thead>
                      <tr>
                        <th scope="col">Property Name</th>
                        <th scope="col">Property Value</th>
                      </tr>
                    </thead>
                  </table>
                  {this.state.envdata.filter(e => e.Category === 'cfcm2').map(e => (
                    <table class="table table-sm" >
                      <tbody>
                        <tr>
                          <th colspan="2">{e.PropertyName}</th>
                          <td colspan="2" style={{ width: "50%" }}>{e.PropertyValue}</td>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </tr>
                      </tbody>
                    </table>
                  ))}

                </Tab>
                <Tab eventKey="cfcm3" title="CFCM3">
                  <table class="table table-sm" style={{ width: "95%" }}>
                    <thead>
                      <tr>
                        <th scope="col">Property Name</th>
                        <th scope="col">Property Value</th>
                      </tr>
                    </thead>
                  </table>
                  {this.state.envdata.filter(e => e.Category === 'cfcm3').map(e => (
                    <table class="table table-sm" >
                      <tbody>
                        <tr>
                          <th colspan="2">{e.PropertyName}</th>
                          <td colspan="2" style={{ width: "50%" }}>{e.PropertyValue}</td>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </tr>
                      </tbody>
                    </table>
                  ))}

                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
        {/* Modal for add data */}
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group row">
                    <label for="PropertyName" class="col-sm-4 col-form-label">PropertyName</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="PropertyName" placeholder="PropertyName" onChange={(event) => this.handleOnAdd('pname', event.target.value)} />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="PropertyValue" class="col-sm-4 col-form-label">PropertyValue</label>
                    <div class="col-sm-8">
                      <input type="PropertyValue" class="form-control" id="PropertyValue" placeholder="PropertyValue" onChange={(event) => this.handleOnAdd('pval', event.target.value)} />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="Category" class="col-sm-4 col-form-label">Category</label>
                    <div class="col-sm-8">
                      <input type="Category" class="form-control" id="Category" placeholder="Category" onChange={(event) => this.handleOnAdd('pcat', event.target.value)} />
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={(event) => this.handleAdd(event)}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
