import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getDeps, deleteDep } from '../actions/departments';
import EditDepartmentModal from '../Components/EditDepartmentModal';

export class Department extends Component {

    constructor(props) {
        super(props)
        this.state = {addModalShow: false, editModalShow: ''}
        
    }

    componentDidMount() {
        this.props.getDeps()
    }


    // componentDidUpdate() {
    //    this.refreshList()
    // }


    // async refreshList() {
    //     const response =  await fetch(process.env.REACT_APP_API+'department')
    //     const data = await response.json()
    //     console.log(data)
    //     this.setState({...this.state, deps:data})
    // }

    async deleteDepartment(id) {
        if(window.confirm('Are you sure?')) {
            // const response = await fetch(process.env.REACT_APP_API + 'department/' + id, {
            //     method: 'DELETE',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     }
            // })
            // const result = await response.json()
            this.props.deleteDep(id)

            // alert(result)
            // this.refreshList()
        }
    }

    render() {
  
        let modalClose=()=>{
            this.setState({...this.state, addModalShow: false, editModalShow:''})
            this.props.getDeps()
        }
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>

                        </tr>
                       
                    </thead>
                    <tbody>
                        {this.props.deps.map(dep => 
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=> this.setState({editModalShow: dep.id})}>Edit</Button>
                                        <Button className="mr-2" variant="danger" onClick={()=> this.deleteDepartment(dep.id) }>Delete</Button>
                                    </ButtonToolbar>
                                    <EditDepartmentModal show={this.state.editModalShow === dep.id} onHide={modalClose} depid={dep.id} depname={dep.name} />
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=> this.setState({...this.state, addModalShow: true})}>
                            Add Department
                    </Button>
                    <EditDepartmentModal show={this.state.addModalShow} onHide={modalClose}/>
                </ButtonToolbar>
               
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    deps: state.deps.deps
  });

  
export default connect(mapStateToProps, { getDeps, deleteDep })(Department);

// export default Department
