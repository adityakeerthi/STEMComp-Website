// const UEMAIL = sessionStorage.getItem('uid');
// Changing the UI of Index html if they are logged in
const titleButton = document.getElementById('title-btn');
const indexNav = document.getElementById('index-navbar');
// sessionStorage.removeItem('uid');
// // Listening for auth status changes
// if(UEMAIL) {
//     titleButton.innerHTML = `
//     <a href="register.html"><button id="register-button" class="register-button"> Dashboard </button></a>
//     `
//     indexNav.innerHTML = `
//     <li class="nav-item">
//         <a href="dashboard.html"><button id="log-btn" class="login-button"> Dashboard </button></a>
//     </li>
//     <li class="nav-item">
//         <a href="#" id="logout"><button id="log-btn" class="login-button"> Log Out </button></a>
//     </li>
//     `

//     const logout = document.querySelector('#logout');
//     logout.addEventListener('click', (e) => {
//         e.preventDefault();
//         auth.signOut().then(() => {
//             console.log("LOGGED OUT")
//             sessionStorage.removeItem('uid');
//             window.location.reload();
//         })
    
//     })
    

// } else {
//     titleButton.innerHTML = `
//     <a href="register.html"><button id="register-button" class="register-button">Register to Compete</button></a>
//     `;

//     indexNav.innerHTML = `
//     <li class="nav-item">
//         <a href="register.html"><button id="reg-btn" class="login-button">Register</button></a>
//     </li>
//     <li class="nav-item">
//         <a href="login.html"><button id="log-btn" class="login-button">Log in</button></a>
//     </li>
//     `

// }

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email)
        titleButton.innerHTML = `
        <a href="./pages/register.html"><button id="register-button" class="register-button"> Dashboard </button></a>
        `
        indexNav.innerHTML = `
        <li class="nav-item">
            <a href="./pages/dashboard.html"><button id="log-btn" class="login-button"> Dashboard </button></a>
        </li>
        <li class="nav-item">
            <a href="#" id="logout"><button id="log-btn" class="login-button"> Log Out </button></a>
        </li>
        `
    
        const logout = document.querySelector('#logout');
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut().then(() => {
                console.log("LOGGED OUT")
                sessionStorage.removeItem('uid');
                window.location.reload();
            })
        
        })
    } else {
        console.log(user)
        titleButton.innerHTML = `
        <a href="./pages/register.html"><button id="register-button" class="register-button">Register to Compete</button></a>
        `;
    
        indexNav.innerHTML = `
        <li class="nav-item">
            <a href="./pages/register.html"><button id="reg-btn" class="login-button">Register</button></a>
        </li>
        <li class="nav-item">
            <a href="./pages/login.html"><button id="log-btn" class="login-button">Log in</button></a>
        </li>
        `
    }
})
