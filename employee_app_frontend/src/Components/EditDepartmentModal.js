import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux';

import { addDep, updateDep } from '../actions/departments';

export class EditDepartmentModal extends Component {

    constructor(props) {
        super(props)
        console.log('calling constructor')
      
        this.handleSubmit = this.handleSubmit.bind(this); // necessary, otherwise this... can't be accessed in handle submit func!
        if (props !== undefined) {
            this.state = {depid: props.depid, depname: props.depname}
            console.log(this.state)
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        var body = {name: event.target.departmentName.value}
        if (this.state.depid !== undefined) {
            //update dep
            body['id'] = this.state.depid
            this.props.updateDep(body)
        }
        else {
            // add dep
            this.props.addDep(body)
            
        }
        this.props.onHide()

    }

    render() {

        const {depname, depid} = this.state
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="departmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control value={depname} onChange={(event)=> this.setState({depname:event.target.value })} type="text" name="departmentName" required placeholder="Department Name"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit"> 
                                        {depid !== undefined ? 'Update Department' : 'Add Department'}
                                        </Button>
                                    </Form.Group>
                                </Form>
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

export default connect(null, { addDep, updateDep })(EditDepartmentModal);

