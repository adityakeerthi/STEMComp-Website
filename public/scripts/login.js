document.addEventListener('DOMContentLoaded', e => {
    $("html, body").delay(0).animate({scrollTop: $('#login-wrapper').offset().top }, 1500);

    const TOKEN = localStorage.getItem('UserToken');
    if (!TOKEN) {
        
        document.getElementById('login-wrapper').innerHTML = `
                <form id="login-form" class="signup-form">
                                                
                    <h5 class="col-12 login-heading" style = "height: auto; text-align: center;">Login:</h5>
                    <label for="login-email">Email</label><br>
                    <input type="text" id="login-email" size="30" placeholder="i.e stemcomp.info@gmail.com"  /><br>

                    <p id="email-error"> </p>

                    <label for="login-password">Password</label><br>
                    <input type="password" id="login-password" size="30" /><br>
                    <p id="password-error"> </p>


                </form>
                <button id="sign-in-button" class="btn yellow darken-2 z-depth-0" style="font-size: 1.5vmax; margin-bottom: 1vh">Sign in</button><br><br>
                <p id="login-error"> </p>
                Or if you're new to STEMComp, 
                <a href="./register.html">click here to register!</a>
            `

            document.getElementById('sign-in-button').addEventListener('click', e => {
                e.preventDefault();

                document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({
                        "email": document.getElementById('login-form')['login-email'].value,
                        "password": document.getElementById('login-form')['login-password'].value
                    });
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/login", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        result = JSON.parse(result);

                        if (result.token) {
                            document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                            document.getElementById('login-form').reset();
                            localStorage.setItem('UserToken', result.token);
                            window.location.href = './dashboard.html';
                        } else {
                            document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                            if (result.error === "The email address is badly formatted.") {
                                document.getElementById('email-error').innerText = 'The email above is badly formatted, please enter a valid email.';
                            } else if (result.error === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                                document.getElementById('login-error').innerText = 'The credentials you have entered are incorrect, please try again with the correct credentials.';
                            }
                            
                            console.log(result);

                        }
                    })
                    .catch(error => console.log('error', error));
            })

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
                console.log(result);
                if (result === 'Authorized') {
                    window.location.href = './dashboard.html';
                } else if (result === 'Unauthorized' || result === 'Token has expired') {
                    console.log("NIO")
                    document.getElementById('login-wrapper').innerHTML = `
                        <form id="login-form" class="signup-form">
                                                        
                            <h5 class="col-12 login-heading" style = "height: auto; text-align: center;">Login:</h5>
                            <label for="login-email">Email</label><br>
                            <input type="text" id="login-email" size="30" placeholder="i.e stemcomp.info@gmail.com"  /><br>
                            <p id="email-error"> </p>
                            
                            <label for="login-password">Password</label><br>
                            <input type="password" id="login-password" size="30" /><br>
                            <p id="password-error"> </p>


                        </form>
                        <button id="sign-in-button" class="btn yellow darken-2 z-depth-0" style="font-size: 1.5vmax; margin-bottom: 1vh">Sign in</button><br><br>
                        <p id="login-error"> </p>
                        Or if you're new to STEMComp, 
                        <a href="./register.html">click here to register!</a>
                    `
    
                    document.getElementById('sign-in-button').addEventListener('click', e => {
                        e.preventDefault();
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');

                        var raw = JSON.stringify({
                                "email": document.getElementById('login-form')['login-email'].value,
                                "password": document.getElementById('login-form')['login-password'].value
                            });
                        
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };
                        
                        fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/login", requestOptions)
                            .then(response => response.text())
                            .then(result => {
                                result = JSON.parse(result);
        
                                if (result.token) {
                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                    document.getElementById('login-form').reset();
                                    window.location.href = './dashboard.html';
                                    localStorage.setItem('UserToken', result.token);
                                } else {
                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                    if (result.error === "The email address is badly formatted.") {
                                        document.getElementById('email-error').innerText = 'The email above is badly formatted, please enter a valid email.';
                                    } else if (result.error === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                                        document.getElementById('login-error').innerText = 'The credentials you have entered are incorrect, please try again with the correct credentials.';
                                    }
                                    console.log(result);
        
                                }
                            })
                            .catch(error => console.log('error', error));
            
                    })
                } else {
                    console.log('idk');
                }

            })
          .catch(error => console.log('error', error));

    }
})