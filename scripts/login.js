// // Changing the UI of Register Page if they succesfully registered
// const loginContent = document.getElementById('login-content');
// // const registerNav = document.getElementById('register-navbar');
// const user = sessionStorage.getItem('uid');
// // Listening for auth status changes
// // auth.onAuthStateChanged(user => {
// // sessionStorage.removeItem('uid');
// if(user) {
//     console.log(user);
//     // Get data from Firestore database
//     // db.collection('guides').onSnapshot(snapshot => {
//     //     console.log("in")
//     //     setupUI(user);
//     //     setupProjectLists(snapshot.docs);
//     //     setupVotes(user, snapshot.docs);
//     // }, err => {
//     //     console.log(err);

//     // });

//     // registerNav.innerHTML = `
    
//     // <li class="nav-item">
//     //     <a href="index.html"><button id="about-btn" class="home-button">Home</button></a>
//     // </li>
//     // <li class="nav-item">
//     //     <a href="index.html"><button id="about-btn" class="home-button">Dashboard</button></a>
//     // </li>
    
//     // `

//     loginContent.innerHTML = `
    
//     <div class="register-block" id="title">

//         <div class="container-fluid" height="inherit">

//         <div class="row">
//         <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
        
//         <div class="registered-page">
//             <h5 class="form-heading"> You are already logged in with the email <b>${user}<b> </h5>
//         </div>
    
//     </div>
//         </div>
//     </div>
    
//     `

//     sessionStorage.setItem('uid', user.email);

//     // setTimeout(() => {
//     //     window.location.href = "./index.html";
//     // }, 5000);

// } else {

//     loginContent.innerHTML = `
            
    // <div class="register-block" id="title">

    //     <div class="container-fluid" height="auto">

    //         <div class="row">
    //             <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin;"></div>
    //             <form id="login-form" class="signup-form">

    //                 <h5 class="col-12 login-heading" style = "height: auto; text-align: center;">Login:</h5>

    //                 <input type="text" id="login-email" size="30" required /><br>
    //                 <label for="login-email">Email</label><br>

    //                 <input type="text" id="login-password" size="30" required /><br>
    //                 <label for="login-password">Password</label><br>

    //                 <button class="btn yellow darken-2 z-depth-0">Sign in</button><br><br>
    //                 Or if you're new to STEMComp, 
    //                 <a href = "register.html">click here to register!</a><br><br><br>
    //             </form>
    //         </div>
    //     </div>
    // </div>
//     `

//     // registerNav.innerHTML = `
    
//     // <li class="nav-item">
//     //     <a href="index.html"><button id="about-btn" class="home-button">Home</button></a>
//     // </li>
    
//     // `

//     const loginForm = document.querySelector("#login-form");
//     loginForm.addEventListener('submit', (e) => {
//         e.preventDefault();
    
//         const email = loginForm['login-email'].value;
//         const password = loginForm['login-password'].value;
    
//         auth.signInWithEmailAndPassword(email, password).then(cred => {
    
//             // close the login modal and resetting the form
    
//             // const modal = document.querySelector('#modal-login');
    
//             // M.Modal.getInstance(modal).close();
//             loginForm.reset();
//             // sessionStorage.setItem('uid', email);
            
//         })
    
//     })

//     // setupProjectLists([]);
//     // setupUI();



// }
// // })

auth.onAuthStateChanged(user => {

    const loginForm = document.querySelector("#login-form");
    if (user) {
        const registerContent = document.getElementById('register-content');
        const loginContent = document.getElementById('login-content');
        // window.location.href = "./index.html";
        if (registerContent) {
            // window.location.href = "./index.html";
            registerContent.innerHTML = `
            <div class="register-block" id="title">
                <div class="container-fluid" height="inherit">
                    <div class="row">
                        <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
                    </div>
                </div>
            </div> 
            `
        }

        if (loginContent) {
            window.location.href = "./index.html";
            loginContent.innerHTML = `
            <div class="register-block" id="title">
                <div class="container-fluid" height="inherit">
                    <div class="row">
                        <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
                    </div>
                </div>
            </div> 
            `
        }
            

    }
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = loginForm['login-email'].value;
            const password = loginForm['login-password'].value;

            auth.signInWithEmailAndPassword(email, password).then(cred => {

                // resetting the form and changing the html to prevent people from viewing or registering when they are already logged in
                loginForm.reset();
                // window.location.href = "./index.html";
                // changing the html
                const registerContent = document.getElementById('register-content');
                const loginContent = document.getElementById('login-content');

                if (registerContent) {
                    registerContent.innerHTML = `
                    <div class="register-block" id="title">
                        <div class="container-fluid" height="inherit">
                            <div class="row">
                                <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
                            </div>
                        </div>
                    </div> 
                    `
                } 

                if (loginContent) {
                    console.log("HIhi")
                    loginContent.innerHTML = `
                    <div class="register-block" id="title">
                        <div class="container-fluid" height="inherit">
                            <div class="row">
                                <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
                            </div>
                        </div>
                    </div> 
                    `

                }

                // sessionStorage.setItem('uid', email);
                
            })

        })
    }


})