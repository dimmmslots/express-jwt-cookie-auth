// submit prevent default
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    // get data from form
    const data = {
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value
    }
    // send data to server
    fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                window.location.href = '/protected/dashboard'
            } else {
                window.location.href = '/login'
            }
        })
})