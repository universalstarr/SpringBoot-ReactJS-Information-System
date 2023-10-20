import axios from 'axios'

const EMPLOYEE_API_ADDR = 'http://localhost:8080'
const EMPLOYEE_API_URL = `${EMPLOYEE_API_ADDR}/api/employees`

class EmployeeDataService {
    retrieveAllEmployees() {
        console.log(EMPLOYEE_API_URL);
        return axios.get(`${EMPLOYEE_API_URL}`);
    }

    retrieveEmployee(id) {
        return axios.get(`${EMPLOYEE_API_URL}/${id}`);
    }

    deleteEmployee(id) {
        return axios.delete(`${EMPLOYEE_API_URL}/${id}`);
    }

    updateEmployee(id, employee) {
        return axios.put(`${EMPLOYEE_API_URL}/${id}`, employee);
    }

    createEmployee(employee) {
        return axios.post(`${EMPLOYEE_API_URL}`, employee);
    }
}

export default new EmployeeDataService();