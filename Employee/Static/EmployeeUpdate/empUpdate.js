document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('empUpdateForm');
    const errorDiv = document.getElementById('errorMessages');
    const successDiv = document.getElementById('successMessage');

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === name + '=') {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
        errorDiv.innerHTML = '';
        successDiv.innerHTML = '';

        const emp_id = form.emp_id.value.trim();

        if (!emp_id) {
            errorDiv.textContent = "Employee ID is required to update.";
            errorDiv.style.display = 'block';
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

        // Simple field validation
        let errors = {};
        if (!data.name) errors.name = "Name is required.";
        if (!data.email) errors.email = "Email is required.";
        if (!data.department) errors.department = "Department ID is required.";
        if (!data.mobile_number) errors.mobile_number = "Mobile number is required.";
        if (!data.salary) errors.salary = "Salary is required.";
        if (!data.joining_date) errors.joining_date = "Joining date is required.";

        if (Object.keys(errors).length > 0) {
            errorDiv.innerHTML = Object.values(errors).map(err => `<p>${err}</p>`).join('');
            errorDiv.style.display = 'block';
            return;
        }

        const csrftoken = getCookie('csrftoken');

        try {
            const response = await fetch(`/updateDelete/${emp_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                successDiv.textContent = 'Employee updated successfully.';
                successDiv.style.display = 'block';
                form.reset();

                setTimeout(() => {
                    window.location.href = '/classEmpList/';
                }, 3000);
            } else {
                if (result.error) {
                    errorDiv.textContent = result.error;
                } else if (typeof result === 'object') {
                    errorDiv.innerHTML = Object.entries(result)
                        .map(([key, val]) => `<p>${key}: ${val}</p>`).join('');
                } else {
                    errorDiv.textContent = 'Update failed.';
                }
                errorDiv.style.display = 'block';
            }
        } catch (err) {
            errorDiv.textContent = 'Failed to connect to server.';
            errorDiv.style.display = 'block';
        }
    });
});
