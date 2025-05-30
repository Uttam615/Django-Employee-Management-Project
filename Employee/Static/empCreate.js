// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const form = document.getElementById('empForm');
    const messageDiv = document.getElementById('message');
    const errorDiv = document.getElementById('error');

    // Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Clear previous messages
        messageDiv.innerText = '';
        errorDiv.innerText = '';

        // Collect form data
        const data = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            location: document.getElementById('location').value.trim(),
            position: document.getElementById('position').value.trim(),
            department_id: document.getElementById('department').value.trim(),
            mobile_number: document.getElementById('mobile_number').value.trim(),
            salary: document.getElementById('salary').value.trim(),
            joining_date: document.getElementById('joining_date').value.trim()
        };

        // Perform frontend validation
        const errors = [];
        if (!data.name) errors.push("Name is required");
        if (!data.email) errors.push("Email is required");
        if (!data.department_id) errors.push("Department ID is required");
        if (!data.mobile_number) errors.push("Mobile number is required");
        if (!data.salary) errors.push("Salary is required");
        if (!data.joining_date) errors.push("Joining date is required");

        // Display validation errors and stop if any
        if (errors.length > 0) {
            errorDiv.innerText = errors.join("\n");
            return;
        }

        // Submit form data to backend
        try {
            const res = await fetch('/api/emp-create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                // Show success message and reset form
                messageDiv.innerText = `${result.message} (ID: ${result.id})\n Processing`;
                form.reset();

                // Redirect after 5 seconds
                setTimeout(() => {
                    window.location.href = '/employees/';
                }, 5000);
            } else {
                // Display backend validation errors
                const errorMessages = Object.entries(result.errors || {}).map(
                    ([key, msg]) => `${key}: ${msg}`
                );
                errorDiv.innerText = errorMessages.join("\n");
            }
        } catch (error) {
            // Handle network or unexpected errors
            errorDiv.innerText = "Something went wrong. Please try again.";
        }
    });
});
