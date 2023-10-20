import { Component } from "react";
import EmployeeDataService from "../service/EmployeeDataService";
import { Navigate } from "react-router-dom";
import { router } from "./EmployeeApp";


class ListEmployeesComponent extends Component {
    constructor(props) {
        super(props);
        this.refreshEmployees = this.refreshEmployees.bind(this);
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this);
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this);
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this);
        this.state = {
            employees: [],
            message: null
        };

    }

    componentDidMount() {
        this.refreshEmployees();
    }

    refreshEmployees() {
        EmployeeDataService.retrieveAllEmployees()
            .then(response => {
                console.log(response);
                this.setState({ employees: response.data });
            })
    }

    deleteEmployeeClicked(id) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                response => {
                    this.setState({ message: `Successfully deleted employee ${id}` });
                    this.refreshEmployees();
                }
            );
    }

    updateEmployeeClicked(id) {
        console.log('update ' + id);
        // history.push(`/employees/${id}`);
        // this.setState({update: true});
        router.navigate(`/employees/${id}`, {replace: true});
    }

    addEmployeeClicked() {
        // this.setState({update: true, id:-1});
        router.navigate(`/employees/-1`, {replace: true});
    }

    render() {
        return (
            <div className="container">
                <h3>All Employees</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateEmployeeClicked(employee.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteEmployeeClicked(employee.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addEmployeeClicked}>Add</button>
                </div>
            </div>
        );
    }
}

export default ListEmployeesComponent;