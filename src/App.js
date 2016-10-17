import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {
   state = {
        fname: "",
        
        Age: "",
        wish: [],
        gender: "",
        suggestion:"",
        records:[],
        show: false,
        selectedfname: "",
      
       
        selectedAge: "",
        selectedwish: [],
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

                    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };









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

            var state = this.state.selectedwish;
            state[fieldName] = targetArray;
            this.setState(state.selectedMwish);
        }
    };







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


editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.fname,
                        location: data.Age
                    })
                }).catch((error)=>{
                    
                });
        };
    };



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
                        selectedlocation: data.Age,
                        selectedmovies: data.wish,
                        selectedgender: data.gender,
                        selectedsuggestion: data.suggestion,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };




saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {
                
        fname: this.state.selectedfname,
        location: this.state.selectedAge,
        movies: this.state.selectedwish,
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
        selectedAge: "",
        selectedwish: [],
        selectedgender: "",
        selectedsuggestion: ""
            });
        }
    };








    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                   
                     
                     <td className="textfieldarea">{item.fname}</td>
                     <td>{item.gender}</td>
                     <td>{item.location}</td>
                     <td>{item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     
                     <td className="textfieldarea">{item.suggestion}</td>
                       <td>
                     
                     <Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Remove</Button>
                     <br/>
                     <Button bsSize="xsmall" bsStyle="primary" onClick={this.openModal(item.id)}>Edit</Button>
                     </td>
                </tr>
            );
        });


let close = () => this.setState({ show: false })

        return (
            <div className="wrap">
                <div className="newer"> 
                 Merry Christmas         
                </div>
                <div className="wraps">
                <div className="wraps2" >
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <Form>
                                   <table><tr><th> <FormGroup>
                                        <ControlLabel>What is Your Name??</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Your name...."
                                            value={this.state.fname}
                                            onChange={this.onChange('fname')}
                                            />
                                    </FormGroup>

                                        <FormGroup>
                                        <ControlLabel>What is Your Gender?? </ControlLabel>
                                        <Radio name="gender" value="M"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="F"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup></th></tr></table>
                                      

                                    <FormGroup>
                                        <ControlLabel>How Old Are You??</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Age. ."
                                                     value={this.state.Age}
                                                     onChange={this.onChange('Age')}
                                            >
                                            <option value="0" selected="1">Age</option>
                                            <option value="18 below">18 below</option>
                                            <option value="18-25">18-25</option>
                                            <option value="26-35">26-35</option>
                                            <option value="35-45">35-45</option>
                                            <option value="45 above">45 above</option>
                                            </FormControl>
                                    </FormGroup>
                                    <FormGroup>
                                      
									  <ControlLabel>Select Your Wish?? :</ControlLabel>
					
                            
									  <Table>
									  <tbody>
									    <tr>
										<td>
                                        <Checkbox value="Toys"
                                                  checked={this.state.wish.indexOf('Toys')>=0 ? true:false}
                                                  onChange={this.checkboxChange('wish')}>
                                            Toys
                                        </Checkbox>
										</td>
									    
										<td>
										<Checkbox value="Money"
                                                  checked={this.state.wish.indexOf('Money')>=0 ? true:false}
                                                  onChange={this.checkboxChange('wish')}>
                                            Money
                                        </Checkbox>
										</td>
										</tr>
										<tr>
										<td>
										<Checkbox value="House & Lot"
                                                  checked={this.state.wish.indexOf('House & Lot')>=0 ? true:false}
                                                  onChange={this.checkboxChange('wish')}>
                                            House & Lot
                                        </Checkbox>
										</td>
										<td>	
										
										<Checkbox value="Car"
                                                  checked={this.state.wish.indexOf('Car')>=0 ? true:false}
                                                  onChange={this.checkboxChange('wish')}>
                                            Car
                                        </Checkbox>
										</td>
										</tr>	
										<tr>
										<td>
									<Checkbox value="Boyfriend/Girlfriend"
                                                  checked={this.state.wish.indexOf('Boyfriend/Girlfriend')>=0 ? true:false}
                                                  onChange={this.checkboxChange('wish')}>
                                            Boyfriend/Girlfriend
                                        </Checkbox>
										</td>
										<td>
										<Checkbox value="Others"
                                                  checked={this.state.wish.indexOf('Others')>=0 ? true:false}
                                                  onChange={this.checkboxChange('wish')}>
                                            Others
                                        </Checkbox>
										</td>
										</tr>
										</tbody>	
										
                                    
                                    </Table>
                                
							
								
                        
                                        
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Write A Letter to Santa</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Dear Santa . . ."
                                            value={this.state.suggestion}
                                            onChange={this.onChange('suggestion')}
                                            cols="59"
                                            rows="6"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button  bsStyle="success" onClick={this.saveSurvey}>Send To Santa</Button>

                                    </ButtonGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>


 <div className="tabs1"> 
                                <Table condensed striped>
                                    <thead>
                                    <tr>
                                        
                                        
                                        <th>NickName</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>Gifts request</th>
                                        <th>Letter to Santa</th>
                                    <th></th>
                                       
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                           
                           
                     
                           
                           </div>
                 <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">External Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                                <FormGroup>
                                        <ControlLabel>What is Your Name??</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Your name"
                                            value={this.state.selectedfname}
                                            onChange={this.modalonChange('selectedfname')}
                                            />
                                    </FormGroup>

                                      <FormGroup>
                                        <ControlLabel>What is Your Gender?? </ControlLabel>
                                        <Radio name="selectedgender" value="M" 
                                               onChange={this.modalonChange('selectedgender')}>Male</Radio>
                                        <Radio name="selectedgender" value="F"
                                               onChange={this.modalonChange('selectedgender')}>Female</Radio>
                                    </FormGroup>

                                    
                                    <FormGroup>
                                        <ControlLabel>How Old Are You??</ControlLabel>
                                        <FormControl componentClass="select"
                                                     
                                                     value={this.state.selectedlocation}
                                                     onChange={this.modalonChange('selectedAge')}
                                            >
                                            <option value="0" selected="1">Age</option>
                                           <option value="18 below">18 below</option>
                                            <option value="18-25">18-25</option>
                                            <option value="26-35">26-35</option>
                                            <option value="35-45">35-45</option>
                                            <option value="45 above">45 above</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup>
									
                                        <ControlLabel>Select Your Wish</ControlLabel>
                                        <Table>
									  <tbody>
									    <tr>
										<td>
                                        <Checkbox value="Toys"
                                                  checked={this.state.selectedwish.indexOf('Toys')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedwish')}>
                                            Toys
                                        </Checkbox>
										</td>
									    
										<td>
										<Checkbox value="Money"
                                                  checked={this.state.selectedwish.indexOf('Money')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedwish')}>
                                        Money
                                        </Checkbox>
										</td>
										</tr>
										<tr>
										<td>
										<Checkbox value="House & Lot"
                                                  checked={this.state.selectedwish.indexOf('House & Lot')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedwish')}>
                                            House & Lot
                                        </Checkbox>
										</td>
										<td>	
										
										<Checkbox value="Car"
                                                  checked={this.state.selectedwish.indexOf('Car')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedwish')}>
                                            Car
                                        </Checkbox>
										</td>
										</tr>	
										<tr>
										<td>
										<Checkbox value="Boyfriend/Girlfriend"
                                                  checked={this.state.selectedwish.indexOf('Boyfriend/Girlfriend')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedwish')}>
                                            Boyfriend/Girlfriend
                                        </Checkbox>
										</td>
										<td>
										<Checkbox value="Others"
                                                  checked={this.state.selectedwish.indexOf('Others')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedwish')}>
                                            Others
                                        </Checkbox>
										</td>
										</tr>
										</tbody>	
										
                                    
                                    </Table>
                                
                                    </FormGroup>
                                 
                                    <FormGroup>
                                        <ControlLabel>Write A letter to Santa</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="ask us anything . . ."
                                            value={this.state.selectedsuggestion}
                                            onChange={this.onChange('selectedsuggestion')}
                                            cols="78"
                                            rows="6"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Save Edited Data</Button>

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