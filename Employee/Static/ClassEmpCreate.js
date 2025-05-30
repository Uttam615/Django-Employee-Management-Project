document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const successMessage = document.getElementById('message');
    const errorMessage = document.getElementById('error')

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        successMessage.innerText = "";
        errorMessage.innerText = ""

        const data = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            location: document.getElementById('location').value.trim(),
            position: document.getElementById('position').value.trim(),
            department_id: document.getElementById('department').value.trim(),
            mobile_number: document.getElementById('mobile_number').value.trim(),
            salary: document.getElementById('salary').value.trim(),
            joining_date: document.getElementById('joining_date').value.trim()

        }

        const errors = []
        if(!data.name) errors.push("Name Required");
        if (!data.email) errors.push("Email is required");
        if (!data.department_id) errors.push("Department ID is required");
        if (!data.mobile_number) errors.push("Mobile number is required");
        if (!data.salary) errors.push("Salary is required");
        if (!data.joining_date) errors.push("Joining date is required");
        
        if(errors.length>0){
            successMessage.innerText = errors.join('\n')
            return
        }

        const result = await fetch('class/api-create/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const res = await result.json();
        try{
            if(res.ok){
                successMessage.innerHTML = `${result.message} ID:${result.id} \nRedirecting to Home Page`;
                form.reset()
                setTimeout(() => {
                    window.location.href ='/classEmpList/'
                    
                }, 4000);
            }
            else{
                const messageError = Object.entries(result.errors|| {}).map(([key,msg])=>`${key}:${msg}`);
                errorMessage.innerText=messageError.join('\n')
            }
        }
        catch(error){
            errorMessage.innerText= 'something went Wrong'

        }


    });
});