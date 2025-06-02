function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const deleteEmployee = () => {
    const empId = document.getElementById("empid").value;
    const respondMsg = document.getElementById("respondMsg");

    if (!empId) {
        respondMsg.textContent = "Please enter a valid ID.";
        respondMsg.style.color = 'red';
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    const csrftoken = getCookie('csrftoken');

    fetch(`/updateDelete/${empId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        credentials: 'same-origin',
    })
    .then(response => {
        if (response.status === 200) {
            respondMsg.textContent = "Employee deleted successfully.";
            respondMsg.style.color = 'green';
            setTimeout(() => {
                window.location.href = '/classEmpList/';
            }, 2000);
        } else if (response.status === 404) {
            respondMsg.textContent = "Employee not found.";
            respondMsg.style.color = 'red';
        } else {
            respondMsg.textContent = "Something went wrong.";
            respondMsg.style.color = 'red';
        }
    })
    .catch(error => {
        console.error("Error:", error);
        respondMsg.textContent = "Error deleting employee.";
        respondMsg.style.color = 'red';
    });
}
