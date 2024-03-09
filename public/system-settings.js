document.getElementById('addUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    try {
        const response = await fetch('/system-settings/add-user', {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json' 
                },
            body: JSON.stringify(formDataObj),
        });
        const result = await response.json();
        alert(result.message); // Modify as needed for better UX
    } catch (error) {
        console.error('Failed to add user:', error);
    }
});



