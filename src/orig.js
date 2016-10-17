import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {

    state = {
        fname: "",
        lname: "",
        email: "",
        location: "",
        movies: [],
        gender: "",
        suggestion:"",
        records:[],
        show: false,
        selectedfname: "",
        selectedlname: "",
        selectedemail: "",
        selectedlocation: "",
        selectedmovies: [],
        selectedgender: "",
        selectedsuggestion: "",
        seledtedId: ""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data.reverse()
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

/* edited codes -------------------*/
                    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

/* edited codes -------------------*/







    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


/* edited codes -------------------*/

 modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };
/* edited codes -------------------*/






    saveSurvey = ()=> {

        var data = this.state;
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };

/* edited codes -------------------*/
editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.fname,
                        location: data.location
                    })
                }).catch((error)=>{
                    
                });
        };
    };

/* edited codes -------------------*/

 openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedfname: data.fname,
                        selectedlname: data.lname,
                        selectedemail: data.email,
                        selectedlocation: data.location,
                        selectedmovies: data.movies,
                        selectedgender: data.gender,
                        selectedsuggestion: data.suggestion,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

/* edited codes -------------------*/


saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {
                
        fname: this.state.selectedfname,
        lname: this.state.selectedlname,
        email: this.state.selectedemail,
        location: this.state.selectedlocation,
        movies: this.state.selectedmovies,
        gender: this.state.selectedgender,
        suggestion: this.state.selectedsuggestion};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,

        selectedfname: "",
        selectedlname: "",
        selectedemail: "",
        selectedlocation: "",
        selectedmovies: [],
        selectedgender: "",
        selectedsuggestion: ""
            });
        }
    };

/* edited codes -------------------*/






    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>
                     <Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>remove</Button>
                     <Button bsSize="xsmall" bsStyle="primary" onClick={this.openModal(item.id)}>Edit</Button>
                     
                     </td>
                     <td>{item.id}</td>
                     <td className="textfieldarea">{item.fname}</td>
                     <td className="textfieldarea">{item.lname}</td>
                     <td className="textfieldarea">{item.email}</td>
                     <td>{item.location}</td>
                     <td>{item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td>{item.gender}</td>
                     <td className="textfieldarea">{item.suggestion}</td>
                </tr>
            );
        });

/* edited codes -------------------*/
let close = () => this.setState({ show: false })
/* edited codes -------------------*/
        return (
            <div className="wrap">
                <div className="newer"> 
                <ControlLabel>House Plans.inc</ControlLabel>          
                </div>
                <div className="wraps">
                <div className="wraps2">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <Form>
                                    <FormGroup>
                                        <ControlLabel>First Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="John, Philip, Van"
                                            value={this.state.fname}
                                            onChange={this.onChange('fname')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="John, Philip, Van"
                                            value={this.state.lname}
                                            onChange={this.onChange('lname')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="youremail@houseplans.com"
                                            value={this.state.email}
                                            onChange={this.onChange('email')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Particular location you live in</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Location. ."
                                                     value={this.state.location}
                                                     onChange={this.onChange('location')}
                                            >
                                            <option value="Anda">Anda</option>
                                            <option value="Antiquera">Antiquera</option>
                                            <option value="Albur">Albur</option>
                                            <option value="Bilar">Bilar</option>
                                            <option value="Batuan">Batuan</option>
                                            <option value="Carmen">Carmen</option>
                                            <option value="Duero">Duero</option>
                                            <option value="Dauis">Dauis</option>
                                            <option value="Dimiao">Dimiao</option>
                                            <option value="Valencia">Valencia</option>
                                            <option value="Garcia">Garcia</option>
                                            <option value="Jagna">Jagna</option>
                                            <option value="Pilar">Pilar</option>
                                            <option value="Tagbilaran">Tagbilarane</option>
                                            <option value="Maribojoc">Maribojoc</option>
                                        </FormControl>
                                        <HelpBlock>Tell us your favorite color</HelpBlock>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Favorite Movies </ControlLabel>
                                        <Checkbox value="Harry Potter"
                                                  checked={this.state.movies.indexOf('Harry Potter')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Harry Potter
                                        </Checkbox>
                                        <Checkbox value="Lord of the Rings"
                                                  checked={this.state.movies.indexOf('Lord of the Rings')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Lord of the Rings
                                        </Checkbox>
                                        <Checkbox value="Twilight"
                                                  checked={this.state.movies.indexOf('Twilight')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Twilight
                                        </Checkbox>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="gender" value="M"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="F"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Any comments or suggestions? Feel free to tell us</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Tell us what you think..."
                                            value={this.state.suggestion}
                                            onChange={this.onChange('suggestion')}
                                            cols = "59"
                                            rows = "6"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveSurvey}>Save Survey</Button>

                                    </ButtonGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>


 <div className="tabs1">
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Location</th>
                                        <th>Fav. Movie</th>
                                        <th>Gender</th>
                                        <th>Other Information</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                           
                           
    /* edited codes -------------------*/                       
                           
                           </div>
                 <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                                <FormGroup>
                                        <ControlLabel>First Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="John, Philip, Van"
                                            value={this.state.selectedfname}
                                            onChange={this.modalonChange('selectedfname')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="John, Philip, Van"
                                            value={this.state.selectedlname}
                                            onChange={this.modalonChange('selectedlname')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="youremail@houseplans.com"
                                            value={this.state.selectedemail}
                                            onChange={this.modalonChange('selectedemail')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Particular location you live in</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Location. ."
                                                     value={this.state.selectedlocation}
                                                     onChange={this.modalonChange('selectedlocation')}
                                            >
                                            <option value="Anda">Anda</option>
                                            <option value="Antiquera">Antiquera</option>
                                            <option value="Albur">Albur</option>
                                            <option value="Bilar">Bilar</option>
                                            <option value="Batuan">Batuan</option>
                                            <option value="Carmen">Carmen</option>
                                            <option value="Duero">Duero</option>
                                            <option value="Dauis">Dauis</option>
                                            <option value="Dimiao">Dimiao</option>
                                            <option value="Valencia">Valencia</option>
                                            <option value="Garcia">Garcia</option>
                                            <option value="Jagna">Jagna</option>
                                            <option value="Pilar">Pilar</option>
                                            <option value="Tagbilaran">Tagbilarane</option>
                                            <option value="Maribojoc">Maribojoc</option>
                                        </FormControl>
                                        <HelpBlock>Tell us your favorite color</HelpBlock>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Favorite Movies </ControlLabel>
                                        <Checkbox value="Harry Potter"
                                                  checked={this.state.selectedmovies.indexOf('Harry Potter')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedmovies')}>
                                            Harry Potter
                                        </Checkbox>
                                        <Checkbox value="Lord of the Rings"
                                                  checked={this.state.selectedmovies.indexOf('Lord of the Rings')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedmovies')}>
                                            Lord of the Rings
                                        </Checkbox>
                                        <Checkbox value="Twilight"
                                                  checked={this.state.selectedmovies.indexOf('Twilight')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedmovies')}>
                                            Twilight
                                        </Checkbox>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="selectedgender" value="M" checked={this.state.selectedGender === "M" ? true : false}
                                               onChange={this.modalonChange('selectedgender')}>Male</Radio>
                                        <Radio name="selectedgender" value="F" checked={this.state.selectedGender === "F" ? true : false}
                                               onChange={this.modalonChange('selectedgender')}>Female</Radio>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Any comments or suggestions? Feel free to tell us</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Tell us what you think..."
                                            value={this.state.selectedsuggestion}
                                            onChange={this.onChange('selectedsuggestion')}
                                            cols = "59"
                                            rows = "6"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Save Survey</Button>

                                    </ButtonGroup>



                                </Form>
                            </Modal.Body>
                        </Modal>
                                                 
                           
                           
                           
                           
                           
                           
                           
                           
                            </div>
                     </div>
      );

    }
}
    


export default App;