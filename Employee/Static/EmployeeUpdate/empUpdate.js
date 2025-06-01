document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('empUpdateForm');
    const errorDiv = document.getElementById('errorMessages');
    const successDiv = document.getElementById('successMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorDiv.innerHTML = '';
        successDiv.innerHTML = '';

        const emp_id = form.emp_id.value.trim();
        if (!emp_id) {
            errorDiv.textContent = "Employee ID is required to update.";
            return;
        }

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            location: form.location.value.trim(),
            position: form.position.value.trim(),
            department: form.department.value.trim(),
            mobile_number: form.mobile_number.value.trim(),
            salary: form.salary.value.trim(),
            joining_date: form.joining_date.value.trim()
        };

        // Validate required fields for update (optional to allow partial updates)
        let errors = {};
        if (!data.name) errors.name = "Name is required.";
        if (!data.email) errors.email = "Email is required.";
        if (!data.department) errors.department = "Department ID is required.";
        if (!data.mobile_number) errors.mobile_number = "Mobile number is required.";
        if (!data.salary) errors.salary = "Salary is required.";
        if (!data.joining_date) errors.joining_date = "Joining date is required.";

        if (Object.keys(errors).length > 0) {
            errorDiv.innerHTML = Object.values(errors).map(err => `<p>${err}</p>`).join('');
            return;
        }

        try {
            const response = await fetch(`/updateDelete/${emp_id}/`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                successDiv.textContent = 'Employee updated successfully.';
                form.reset()

                setTimeout(()=>{
                    window.location.href='/classEmpList/'
                },7000)


            } else {
                if(result.error){
                    errorDiv.textContent = result.error;
                } else if(result.name){
                    // serializer errors
                    errorDiv.innerHTML = Object.entries(result)
                        .map(([key,val]) => `<p>${key}: ${val}</p>`).join('');
                } else {
                    errorDiv.textContent = 'Update failed.';
                }
            }
        } catch (err) {
            errorDiv.textContent = 'Failed to connect to server.';
        }
    });
});
