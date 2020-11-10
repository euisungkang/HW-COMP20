$(document).ready(() => {
    $.ajax({
        url: "http://dummy.restapiexample.com/api/v1/employees",
        type: 'GET',
        dataType: 'json',
        success: res => {
            console.log(res.data);
            let dest = $("#return")
            var buffer = '';
            for (var i = 0; i < res.data.length; i++) {
                buffer += '<div name = "employee"><p> Name: ' + res.data[i].employee_name
                       + '<br/>Age: ' + res.data[i].employee_age + '<br/>Salary: '
                       + res.data[i].employee_salary;
            }
            dest.append(buffer);
        }
    })
})