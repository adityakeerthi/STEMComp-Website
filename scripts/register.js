// // Changing the UI of Register Page if they succesfully registered
// const registerContent = document.getElementById('register-content');
// const registerNav = document.getElementById('register-navbar');
// // Listening for auth status changes
// auth.onAuthStateChanged(user => {
//     if(user) {
//         window.location.href = "./index.html";


//         // });
//         if (registerNav) {
//             registerNav.innerHTML = `
            
//             <li class="nav-item">
//                 <a href="index.html"><button id="about-btn" class="home-button">Home</button></a>
//             </li>
//             <li class="nav-item">
//                 <a href="index.html"><button id="about-btn" class="home-button">Dashboard</button></a>
//             </li>
            
//             `
//         }

//         if (registerContent) {
//             registerContent.innerHTML = `
            
//             <div class="register-block" id="title">

//                 <div class="container-fluid" height="inherit">

//                     <div class="row">
//                         <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
                        
//                         <div class="registered-page">
//                             <h5 class="form-heading"> You are already logged in with the email <b>${user.email}<b> </h5>
//                             <h5 class="form-heading"> Choose to logout? <b> </h5>
//                         </div>
                
//                     </div>
//                 </div>
//             </div>        
            
//             `

//         }


//         // setTimeout(() => {
//         //     window.location.href = "./index.html";
//         // }, 5000);

//     } else {

//         // if (registerContent) {
//         //     registerContent.innerHTML = `
                    

//         //     `
//         // }

//         if (registerNav) {
//             registerNav.innerHTML = `
            
//             <li class="nav-item">
//                 <a href="index.html"><button id="about-btn" class="home-button">Home</button></a>
//             </li>
            
//             `
//         }

//         // Signup
//         const signupForm = document.querySelector('#signup-form');

//         if (signupForm) {
//             signupForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 console.log(signupForm['grade']);
//                 // get user info
//                 const email = signupForm['signup-email'].value;
//                 const password = signupForm['signup-password'].value;

//                 // sign up the user
//                 auth.createUserWithEmailAndPassword(email, password).then(cred => {
//                     let id = signupForm['signup-email'].value;
//                     return db.collection('users').doc(id).set({
//                         firstname: signupForm[ 'first-name'].value,
//                         lastname: signupForm['last-name'].value,
//                         streetnumber: signupForm['street-number'].value,
//                         streetname: signupForm['street-name'].value,
//                         apartmentnumber: signupForm['apartment-number'].value,
//                         postalcode: signupForm['postal-code'].value,
//                         city: signupForm['city'].value,
//                         grade: signupForm['grade'].value,
//                         school: signupForm['school'].value,
//                         submitted: false,
//                         votescasted: []
//                     });

//                 }).then(() => {
//                     // close the signup modal & reset form
//                     signupForm.reset();

//                     // changing the html
//                     const registerContent = document.getElementById('register-content');
//                     const loginContent = document.getElementById('login-content');

//                     if (registerContent) {
//                         registerContent.innerHTML = `
//                         <div class="register-block" id="title">

//                             <div class="container-fluid" height="inherit">

//                                 <div class="row">
//                                     <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
                                    
//                                     <div class="registered-page">
//                                         <h5 class="form-heading"> You are already logged in with the email <b>${user.email}<b> </h5>
//                                         <h5 class="form-heading"> Choose to logout? <b> </h5>
//                                     </div>
                            
//                                 </div>
//                             </div>
//                         </div>      
//                         `
//                     } 

//                     if (loginContent) {
//                         loginContent.innerHTML = `
//                         <div class="register-block" id="title">
//                             <div class="container-fluid" height="inherit">
//                                 <div class="row">
//                                     <div class="col-12 sixty-top" style="height:auto; margin-top: 42vmin; text-align: center"></div>
                                    
//                                     <div class="registered-page">
//                                         <h5 class="form-heading"> You are already logged in with the email <b>${user}<b> </h5>
//                                     </div>
                            
//                                 </div>
//                             </div>
//                         </div>
//                         `
//                     }

//                     window.location.href = "./index.html";
//                 })
//             });
//         }

//         // setupProjectLists([]);
//         // setupUI();



//     }
// })

auth.onAuthStateChanged(user => {
    const signupForm = document.querySelector("#signup-form");
    if (user ) {
        console.log(signupForm)
        // window.location.href = "./index.html";
        if (signupForm) {
            setTimeout(() => {
                window.location.href= "./index.html"
            }, 1000)           
            
        }
        
    } else {
        
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log(signupForm['grade']);
                // get user info
                const email = signupForm['signup-email'].value;
                const password = signupForm['signup-password'].value;

                // sign up the user
                auth.createUserWithEmailAndPassword(email, password).then(cred => {
                    return db.collection('users').doc(email).set({
                        firstname: signupForm[ 'first-name'].value,
                        lastname: signupForm['last-name'].value,
                        streetnumber: signupForm['street-number'].value,
                        streetname: signupForm['street-name'].value,
                        apartmentnumber: signupForm['apartment-number'].value,
                        postalcode: signupForm['postal-code'].value,
                        city: signupForm['city'].value,
                        grade: signupForm['grade'].value,
                        school: signupForm['school'].value,
                        submitted: false,
                        votescasted: []
                    }).then(() => {window.location.href = "./index.html"});

                }).then(() => {
                    signupForm.reset();
                    
                    // changing the html
                    const registerContent = document.getElementById('register-content');
                    const loginContent = document.getElementById('login-content');
                    // window.location.href = "./index.html";
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


                })
            })
        }
        // signup form end   
    }
        
});