import { Component } from "react";
import EmployeeDataService from "../service/EmployeeDataService";
import { Formik } from "formik";
import { Navigate } from "react-router-dom";
import { router } from "./EmployeeApp";

class EmployeeComponent extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        let employeeId = parseInt(window.location.href.split('/').pop());
        this.state = {
            id: employeeId,
            firstName: '',
            lastName: '',
            emailId: ''
        }
    }

    componentDidMount() {
        console.log(this.state.id);
        if (this.state.id == -1) {
            return;
        }

        EmployeeDataService.retrieveEmployee(this.state.id)
            .then(response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                emailId: response.data.emailId
            }));
    }

    onSubmit(values) {
        let employee = {
            firstName: values.firstName,
            lastName: values.lastName,
            emailId: values.emailId
        };
        if (values.id == -1) {
            EmployeeDataService.createEmployee(employee).then(response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                emailId: response.data.emailId,
                id: response.data.id
            }));
        } else {
            employee.id = values.id;
            console.log("employee: ", employee);
            EmployeeDataService.updateEmployee(employee.id, employee).then(response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                emailId: response.data.emailId,
                id: response.data.id
            }));
        }
        router.navigate("/employees", {replace:true});
    }

    render() {

        console.log(this.state);

        return (
            <div>
                <h3>Employee</h3>
                <div className="container">
                    <Formik
                        initialValues={this.state}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <fieldset className="form-group">
                                    <label htmlFor="id">ID</label>
                                    <input
                                        id="id"
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        {...formik.getFieldProps('id')}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="form-control"
                                        {...formik.getFieldProps('firstName')}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div>{formik.errors.firstName}</div>
                                    ) : null}
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="form-control"
                                        {...formik.getFieldProps('lastName')}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div>{formik.errors.lastName}</div>
                                    ) : null}
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="emailId">Email Address</label>
                                    <input id="emailId" type="email" className="form-control" {...formik.getFieldProps('emailId')} />
                                    {formik.touched.emailId && formik.errors.emailId ? (
                                        <div>{formik.errors.emailId}</div>
                                    ) : null}
                                </fieldset>

                                <button className="btn btn-success" type="submit">Submit</button>
                            </form>

                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

export default EmployeeComponent;