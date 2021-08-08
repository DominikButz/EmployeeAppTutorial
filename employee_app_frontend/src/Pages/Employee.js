import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { getEmployees, deleteEmployee } from '../actions/employees';
import { getDeps } from '../actions/departments';
import EditEmployeeModal from '../Components/EditEmployeeModal';

export class Employee extends Component {

    constructor(props) {
        super(props)
        this.state = {addModalShow: false, editModalShow: ''}
        
    }

    componentDidMount() {
        this.props.getDeps()
        this.props.getEmployees()
    }

    departmentNameFor(id) {
        const deps = this.props.deps
        const selectedDeps = deps.filter(dep => dep.id === id)
        if (selectedDeps.length === 0) {
            return id
        }
        return selectedDeps[0].name

    }


    // componentDidUpdate() {
    //    this.refreshList()
    // }


    // async refreshList() {
    //     const response =  await fetch(process.env.REACT_APP_API+'employee')
    //     const data = await response.json()
    //     console.log(data)
    //     this.setState({employees:data})
    // }

    async deleteEmployee(id) {
        if(window.confirm('Are you sure?')) {
            this.props.delete(id)
            // const response = await fetch(process.env.REACT_APP_API + 'employee/' + id, {
            //     method: 'DELETE',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     }
            // })
            // const result = await response.json()
            // alert(result)
            // this.refreshList()
        }
    }

    render() {
   
        let modalClose=()=>{
            this.setState({addModalShow: false, editModalShow:''})
            this.props.getEmployees()
        }
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>Options</th>

                        </tr>
                       
                    </thead>
                    <tbody>
                        {this.props.employees.map(employee => 
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{this.departmentNameFor(employee.department)}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=> this.setState({employee:employee, editModalShow: employee.id})}>Edit</Button>
                                        <Button className="mr-2" variant="danger" onClick={()=> this.deleteEmployee(employee.id) }>Delete</Button>
                                    </ButtonToolbar>
                                    <EditEmployeeModal show={this.state.editModalShow === employee.id} onHide={modalClose} employee={employee} />
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=> this.setState({...this.state, addModalShow: true})}>
                            Add Employee
                    </Button>
                    <EditEmployeeModal show={this.state.addModalShow} onHide={modalClose}/>
                </ButtonToolbar>
               
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employees: state.employees.employees,
    deps: state.deps.deps
});

export default connect(mapStateToProps, {getDeps, getEmployees, deleteEmployee})(Employee)

