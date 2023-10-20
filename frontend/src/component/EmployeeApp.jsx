import React, { Component } from 'react';
import ListEmployeesComponent from './ListEmployeesComponent';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import EmployeeComponent from './EmployeeComponent';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <ListEmployeesComponent />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/employees",
        element: <ListEmployeesComponent />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/employees/:id",
        element: <EmployeeComponent />,
        errorElement: <ErrorPage />,
    },
]);

class EmployeeApp extends Component {
    render() {
        return (
            <>
                <br />
                <br />
                <h1 style={{ textAlign: "center" }}>Employee Application</h1>
                <br />
                <br />
                <RouterProvider router={router} />
            </>
        );
    }
}

export { router };

export default EmployeeApp;