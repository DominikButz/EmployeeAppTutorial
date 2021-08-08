import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addEmployee, updateEmployee} from '../actions/employees';
import { getDeps } from '../actions/departments';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';



export class EditEmployeeModal extends Component {

    photoFilename = "anonymous.png"
 

    constructor(props) {
        super(props)
        console.log('calling constructor')
        this.handleSubmit = this.handleSubmit.bind(this); // necessary, otherwise this... can't be accessed in handle submit func!
        this.onDepSelectionChange = this.onDepSelectionChange.bind(this);
        this.handlePhotoFileSelected = this.handlePhotoFileSelected.bind(this);
        this.state = { emid: '', emName: '' , emDep: '', imagesrc: process.env.REACT_APP_PHOTOPATH+this.photoFilename}
        if (props !== undefined && props.employee !== undefined) {
            const employee = props.employee 
            console.log(`photo: ${employee.photo}`)
            this.state = {...this.state, emid: employee.id , emName: employee.name , emDep: employee.department}
            if (employee.photo !== undefined && employee.photo !== '') {
                this.state['imagesrc'] =  process.env.REACT_APP_PHOTOPATH + employee.photo
                this.photoFilename = employee.photo
            }
        } 
    }

    componentDidMount() {
        this.props.getDeps()
       
    }

    handleSubmit(event) {
        console.log('handle submit called')
        console.log(`value: ${event.target.emName.value}`)

        event.preventDefault()
        var body = {name: event.target.emName.value, department:event.target.emDep.value, photo:this.photoFilename}
    
        if (this.state.emid !== '') {
            body['id'] = this.state.emid
            this.props.updateEmployee(body)
        } else {
            this.props.addEmployee(body)
        }
        this.props.onHide()
    }


 

    async handlePhotoFileSelected(event) {
        event.preventDefault()
       
        const formData = new FormData()
        formData.append(
            "photo",
            event.target.files[0],
            event.target.files[0].name
        )
        try {
            const response = await fetch(process.env.REACT_APP_API+'employee/saveImage', {
                method: 'POST',
                body: formData
            })
            const result = await response.json()
            const filename = result["fileName"]
            this.photoFilename = filename
            this.setState({imagesrc: process.env.REACT_APP_PHOTOPATH+filename})
            console.log(`image path set: ${this.state.imagesrc}`)
         } catch(error) {
             alert(`failed: ${error}`)
         }

    }

    onDepSelectionChange(event) {
        console.log(`setting to ${event.target.value}`)
        this.setState({emDep:event.target.value})
    }



    render() {

        const {emid, emName, emDep} = this.state
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {emid !== '' ? 'Edit Employee' : 'Add Employee'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="emName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control value={emName} onChange={(event)=> this.setState({emName:event.target.value })} type="text" name="emName" required placeholder="Employee Name"/>
                                    </Form.Group>
                                    <Form.Group controlId="emDepartment">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as='select' aria-label='Department Selection' name="emDep" onChange={this.onDepSelectionChange}>
                                            <option value='' selected={emDep === ''}>None</option>
                                            {this.props.deps.map(dep => 
                                                <option value={dep.id} selected={emDep === dep.id}>{dep.name}</option>
                                            )}

                                        </Form.Control>
                                    </Form.Group>
                
                                    <Form.Group style={{marginTop: 10}}>
                                        <Button variant="primary" type="submit"> 
                                        {emid !== '' ? 'Update Employee' : 'Add Employee'}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.state.imagesrc}/>
                                <input type="file" onChange={this.handlePhotoFileSelected}/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    deps: state.deps.deps
  });


export default connect(mapStateToProps, {addEmployee, updateEmployee, getDeps})(EditEmployeeModal)
