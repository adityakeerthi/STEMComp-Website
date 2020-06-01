document.addEventListener('DOMContentLoaded', e => {
    document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');
    const TOKEN = localStorage.getItem('UserToken');

    if (!TOKEN) {
        document.getElementById('title-btn').innerHTML = `
            <a href="./pages/register.html"><button style="font-weight: bold;" id="register-button" class="register-button"> Register </button></a>
        `
        document.getElementById('index-navbar').innerHTML = `
            <li class="nav-item">
                <a href="./pages/register.html"><button id="reg-btn" class="login-button">Register</button></a>
            </li>
            <li class="nav-item">
                <a href="./pages/login.html"><button id="log-btn" class="login-button">Log in</button></a>
            </li>
        `
        document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
    } else {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"token": localStorage.getItem('UserToken')});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/validateAuthorization", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === 'Authorized') {
                    document.getElementById('title-btn').innerHTML = `
                        <a href='./pages/dashboard.html' ><button style="font-weight: bold;" id="register-button" class="register-button"> Dashboard </button></a>
                    `
                    
                    document.getElementById('index-navbar').innerHTML = `
                        <li class="nav-item">
                            <a href="./pages/dashboard.html"><button id="log-btn" class="login-button"> Dashboard </button></a>
                        </li>
                        <li class="nav-item">
                            <a id="logout-button" href="#" id="logout"><button id="log-btn" class="login-button"> Log Out </button></a>
                        </li>
                    `
                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                    document.getElementById('logout-button').addEventListener('click', e => {
                        localStorage.removeItem('UserToken');
                        window.location.reload();
                    })
                    
                } else if (result === 'Unauthorized' || result === 'Token has expired') {
                    document.getElementById('title-btn').innerHTML = `
                        <a href="./pages/register.html"><button style="font-weight: bold;" id="register-button" class="register-button"> Register </button></a>
                    `
                    document.getElementById('index-navbar').innerHTML = `
                        <li class="nav-item">
                            <a href="./pages/register.html"><button id="reg-btn" class="login-button">Register</button></a>
                        </li>
                        <li class="nav-item">
                            <a href="./pages/login.html"><button id="log-btn" class="login-button">Log in</button></a>
                        </li>
                    `
                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');

                } else {
                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                }
            })
            .catch(error => console.log('error', error));
    }
})