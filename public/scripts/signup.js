document.addEventListener('DOMContentLoaded', e => {
    $("html, body").delay(0).animate({scrollTop: $('#register-wrapper').offset().top }, 1500);
    window.toggleTeam = false;
    const TOKEN = localStorage.getItem('UserToken');
    if (!TOKEN) {
        document.getElementById('register-wrapper').innerHTML = `
            <button id="toggle-teammate"> Toggle this button if you have a partner or not! </button>
            <h5 class="col-12 login-heading" style = "height: auto; text-align: center; margin-bottom: 4vh">Personal Information:</h5>

            <section class="signuprow">
                <section id="primary" class="signupcolumn">
                    <form id="signup-personal-information-primary">
                        <label for="first-name-primary">First name</label><br>
                        <input type="text" id="first-name-primary" size="30" placeholder="i.e. John" required /><br>
                        <p id="primaryFirstName"></p>
                        
                        <label for="last-name-primary">Last name</label><br>
                        <input type="text" id="last-name-primary" size="30" placeholder="i.e. Smith" required /><br>
                        <p id="primaryLastName"></p>

                    </form>
                </section>
                <section id="secondary" class="signupcolumn">
                    <form id="signup-personal-information-secondary">
                        <label for="first-name-secondary">First name</label><br>
                        <input type="text" id="first-name-secondary" size="30" placeholder="i.e. John" required /><br>
                        <p id="secondaryFirstName"></p>

                        <label for="last-name-secondary">Last name</label><br>
                        <input type="text" id="last-name-secondary" size="30" placeholder="i.e. Smith" required /><br>
                        <p id="secondaryLastName"></p>

                    </form>
                </section>
                <form id="email-password-form">
                    <label for="signup-email">Email address</label><br>
                    <input type="email" id="signup-email" size="30" placeholder="i.e stemcomp.info@gmail.com" required /><br>
                    <p id="email-error"></p>

                    <label for="signup-password">Password (at least 6 characters long)</label><br>
                    <input type="password" id="signup-password" size="30" required /><br>
                    <p id="password-error"></p>

                    <label for="confirm-password">Confirm Password (at least 6 characters long)</label><br><br>                                    
                    <input type="password" id="confirm-password" size="30" required /><br>
                    <p id="confirmPassword"></p>

                </form>
            </section>

            <h5 class="col-12 login-heading" style = "height: auto; text-align: center; margin-bottom: 4vh">Shipping Address:</h5>

            <section class="signuprow">
                <section id="primary" class="signupcolumn">
                    <form id="signup-shipping-address-primary">
                        <label for="street-number-primary">Street Number</label><br>
                        <input type="text" id="street-number-primary" size="30" placeholder="i.e. 123" required /><br>
                        <p id="primaryStreetNumber"></p>

                        <label for="street-name-primary">Street Name</label><br>
                        <input type="text" id="street-name-primary" size="30" placeholder="i.e. Alphabet Road" required /><br>
                        <p id="primaryStreetName"></p>

                        <label for="apartment-number-primary">Apartment number (leave blank if not applicable)</label><br>
                        <input type="text" id="apartment-number-primary" size="30" /><br>
                        <p id="primaryApartmentNumber"></p>

                        <label for="postal-code-primary">Postal code</label><br>
                        <input type="text" id="postal-code-primary" size="30" required /><br>
                        <p id="primaryPostalCode"></p>

                        <label for="city-primary">City</label><br>
                        <input type="text" id="city-primary" size="30" required /><br>
                        <p id="primaryCity"></p>

                    </form>
                </section>
                <section id="secondary" class="signupcolumn">
                    <form id="signup-shipping-address-secondary">
                        <label for="street-number-secondary">Street Number</label><br>
                        <input type="text" id="street-number-secondary" size="30" placeholder="i.e. 123" required /><br>
                        <p id="secondaryStreetNumber"></p>

                        <label for="street-name-secondary">Street Name</label><br>
                        <input type="text" id="street-name-secondary" size="30" placeholder="i.e. Alphabet Road" required /><br>
                        <p id="secondaryStreetName"></p>

                        <label for="apartment-number-secondary">Apartment number (leave blank if not applicable)</label><br>
                        <input type="text" id="apartment-number-secondary" size="30" /><br>
                        <p id="secondaryApartmentNumber"></p>

                        <label for="postal-code-secondary">Postal code</label><br>
                        <input type="text" id="postal-code-secondary" size="30" required /><br>
                        <p id="secondaryPostalCode"></p>

                        <label for="city-secondary">City</label><br>
                        <input type="text" id="city-secondary" size="30" required /><br>
                        <p id="secondaryCity"></p>

                    </form>
                </section>
            </section>

            <h5 class="col-12 login-heading" style = "height: auto; text-align: center; margin-bottom: 4vh">Academic Information:</h5>

            <section class="signuprow">
                <section id="primary" class="signupcolumn">
                    <form id="signup-academic-information-primary">
                        <label for="grade-primary">Grade</label><br>
                        <select id="grade-primary">
                            <option value= "9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select><br>
                        <p id="primaryGrade"></p>

                        <label for="school-primary">School [No abbreviations]</label><br>
                        <input type="text" id="school-primary" size="30" placeholder="i.e Science Collegiate Institute" required /><br>
                        <p id="primarySchool"></p>

                    </form>
                </section>
                <section id="secondary" class="signupcolumn">
                    <form id="signup-academic-information-secondary">
                        <label for="grade-secondary">Grade</label><br>
                        <select id="grade-secondary">
                            <option value= "9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select><br>
                        <p id="secondaryGrade"></p>


                        <label for="school-secondary">School [No abbreviations]</label><br>
                        <input type="text" id="school-secondary" size="30" placeholder="i.e Science Collegiate Institute " required /><br>
                        <p id="secondarySchool"></p>

                    </form>
                </section>
            </section>

            <h6>Before you click "Sign up" please double check for typos and make sure all the information
                you entered is valid. You will not be able to change it after.</h6>
            <button id="signup-button" class="btn yellow darken-2 z-depth-0 fifteen-bot" style="font-size: 1.5vmax">Sign up</button>
        `

        document.getElementById('toggle-teammate').addEventListener('click', (e) => {
            console.log(window.toggleTeam);
            document.getElementById('email-error').innerText = '';
            document.getElementById('password-error').innerText = '';
            document.getElementById('confirmPassword').innerText = '';
            document.getElementById('primaryApartmentNumber').innerText = '';
            document.getElementById('primaryCity').innerText = '';
            document.getElementById('primaryFirstName').innerText = '';
            document.getElementById('primaryLastName').innerText = '';
            document.getElementById('primaryPostalCode').innerText = '';
            document.getElementById('primarySchool').innerText = '';
            document.getElementById('primaryStreetName').innerText = '';
            document.getElementById('primaryStreetNumber').innerText = '';
            document.getElementById('secondaryApartmentNumber').innerText = '';
            document.getElementById('secondaryCity').innerText = '';
            document.getElementById('secondaryFirstName').innerText = '';
            document.getElementById('secondaryLastName').innerText = '';
            document.getElementById('secondaryPostalCode').innerText = '';
            document.getElementById('secondarySchool').innerText = '';
            document.getElementById('secondaryStreetName').innerText = '';
            document.getElementById('secondaryStreetNumber').innerText = '';
            // console.log(window.toggleTeam);
            if (window.toggleTeam) {
                window.toggleTeam = false;
                document.querySelectorAll('.signupcolumn').forEach(item => item.style.width = "100%");
                document.querySelectorAll('#secondary').forEach(item => item.style.display = 'none');
            } else {
                window.toggleTeam = true;
                document.querySelectorAll('.signupcolumn').forEach(item => item.style.width = "50%");
                document.querySelectorAll('#secondary').forEach(item => item.style.display = 'block');
            }
        });

        document.getElementById('signup-button').addEventListener('click', e => {
            document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');
            if (window.toggleTeam) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
            
                var raw = JSON.stringify({
                    "email": document.getElementById('email-password-form')['signup-email'].value,
                    "password": document.getElementById('email-password-form')['signup-password'].value,
                    "confirmPassword": document.getElementById('email-password-form')['confirm-password'].value,
                    "toggleTeam": window.toggleTeam,
                    "primaryAccount":{
                        "firstname": document.getElementById('signup-personal-information-primary')['first-name-primary'].value,
                        "lastname": document.getElementById('signup-personal-information-primary')['last-name-primary'].value,
                        "streetnumber": document.getElementById('signup-shipping-address-primary')['street-number-primary'].value,
                        "streetname": document.getElementById('signup-shipping-address-primary')['street-name-primary'].value,
                        "apartmentnumber": document.getElementById('signup-shipping-address-primary')['apartment-number-primary'].value,
                        "postalcode": document.getElementById('signup-shipping-address-primary')['postal-code-primary'].value,
                        "city": document.getElementById('signup-shipping-address-primary')['city-primary'].value,
                        "grade": document.getElementById('signup-academic-information-primary')['grade-primary'].value,
                        "school": document.getElementById('signup-academic-information-primary')['school-primary'].value
                    },
                    "secondaryAccount":{
                        "firstname": document.getElementById('signup-personal-information-secondary')['first-name-secondary'].value,
                        "lastname": document.getElementById('signup-personal-information-secondary')['last-name-secondary'].value,
                        "streetnumber": document.getElementById('signup-shipping-address-secondary')['street-number-secondary'].value,
                        "streetname": document.getElementById('signup-shipping-address-secondary')['street-name-secondary'].value,
                        "apartmentnumber": document.getElementById('signup-shipping-address-secondary')['apartment-number-secondary'].value,
                        "postalcode": document.getElementById('signup-shipping-address-secondary')['postal-code-secondary'].value,
                        "city": document.getElementById('signup-shipping-address-secondary')['city-secondary'].value,
                        "grade": document.getElementById('signup-academic-information-secondary')['grade-secondary'].value,
                        "school": document.getElementById('signup-academic-information-secondary')['school-secondary'].value
                    }
                });
            
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
            
                fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/signup", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        result = JSON.parse(result);
                        document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                        if (result.token) {
                            document.getElementById('email-password-form').reset();
                            document.getElementById('signup-personal-information-secondary').reset();
                            document.getElementById('signup-shipping-address-secondary').reset();
                            document.getElementById('signup-academic-information-secondary').reset();
                            document.getElementById('signup-personal-information-primary').reset();
                            document.getElementById('signup-shipping-address-primary').reset();
                            document.getElementById('signup-academic-information-primary').reset();
                            localStorage.setItem('UserToken', result.token);
                        } else {
                            console.log(result);
                            if (result.email) {document.getElementById('email-error').innerText = result.email;}
                            else {document.getElementById('email-error').innerText = ''}
                            if (result.password) {document.getElementById('password-error').innerText = result.password;}
                            else {document.getElementById('password-error').innerText = ''}
                            if (result.confirmPassword) {document.getElementById('confirmPassword').innerText = result.confirmPassword;}
                            else {document.getElementById('confirmPassword').innerText = ''}
                            if (result.primaryCity) {document.getElementById('primaryCity').innerText = result.primaryCity;}
                            else {document.getElementById('primaryCity').innerText = ''}
                            if (result.primaryFirstName) {document.getElementById('primaryFirstName').innerText = result.primaryFirstName;}
                            else {document.getElementById('primaryFirstName').innerText = ''}
                            if (result.primaryLastName) {document.getElementById('primaryLastName').innerText = result.primaryLastName;}
                            else {document.getElementById('primaryLastName').innerText = ''}
                            if (result.primaryPostalCode) {document.getElementById('primaryPostalCode').innerText = result.primaryPostalCode;}
                            else {document.getElementById('primaryPostalCode').innerText = ''}
                            if (result.primarySchool) {document.getElementById('primarySchool').innerText = result.primarySchool;}
                            else {document.getElementById('primarySchool').innerText = ''}
                            if (result.primaryStreetName) {document.getElementById('primaryStreetName').innerText = result.primaryStreetName;}
                            else {document.getElementById('primaryStreetName').innerText = ''}
                            if (result.primaryStreetNumber) {document.getElementById('primaryStreetNumber').innerText = result.primaryStreetNumber;}
                            else {document.getElementById('primaryStreetNumber').innerText = ''}
                            if (result.secondaryCity) {document.getElementById('secondaryCity').innerText = result.secondaryCity;}
                            else {document.getElementById('secondaryCity').innerText = ''}
                            if (result.secondaryFirstName) {document.getElementById('secondaryFirstName').innerText = result.secondaryFirstName;}
                            else {document.getElementById('secondaryFirstName').innerText = ''}
                            if (result.secondaryLastName) {document.getElementById('secondaryLastName').innerText = result.secondaryLastName;}
                            else {document.getElementById('secondaryLastName').innerText = ''}
                            if (result.secondaryPostalCode) {document.getElementById('secondaryPostalCode').innerText = result.secondaryPostalCode;}
                            else {document.getElementById('secondaryPostalCode').innerText = ''}
                            if (result.secondarySchool) {document.getElementById('secondarySchool').innerText = result.secondarySchool;}
                            else {document.getElementById('secondarySchool').innerText = ''}
                            if (result.secondaryStreetName) {document.getElementById('secondaryStreetName').innerText = result.secondaryStreetName;}
                            else {document.getElementById('secondaryStreetName').innerText = ''}
                            if (result.secondaryStreetNumber) {document.getElementById('secondaryStreetNumber').innerText = result.secondaryStreetNumber;}
                            else {document.getElementById('secondaryStreetNumber').innerText = ''}
                            
                        }
                        
                    })
                    .catch(error => console.log('error', error));
            } else {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
            
                var raw = JSON.stringify({
                    "email": document.getElementById('email-password-form')['signup-email'].value,
                    "password": document.getElementById('email-password-form')['signup-password'].value,
                    "confirmPassword": document.getElementById('email-password-form')['confirm-password'].value,
                    "toggleTeam": window.toggleTeam,
                    "primaryAccount":{
                        "firstname": document.getElementById('signup-personal-information-primary')['first-name-primary'].value,
                        "lastname": document.getElementById('signup-personal-information-primary')['last-name-primary'].value,
                        "streetnumber": document.getElementById('signup-shipping-address-primary')['street-number-primary'].value,
                        "streetname": document.getElementById('signup-shipping-address-primary')['street-name-primary'].value,
                        "apartmentnumber": document.getElementById('signup-shipping-address-primary')['apartment-number-primary'].value,
                        "postalcode": document.getElementById('signup-shipping-address-primary')['postal-code-primary'].value,
                        "city": document.getElementById('signup-shipping-address-primary')['city-primary'].value,
                        "grade": document.getElementById('signup-academic-information-primary')['grade-primary'].value,
                        "school": document.getElementById('signup-academic-information-primary')['school-primary'].value
                    },
                    "secondaryAccount":{
                        "firstname": "",
                        "lastname": "",
                        "streetnumber": "",
                        "streetname": "",
                        "apartmentnumber": "",
                        "postalcode": "",
                        "city": "",
                        "grade": "",
                        "school": ""
                    }
                });
            
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
            
                fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/signup", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        result = JSON.parse(result);
                        document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                        if (result.token) {
                            document.getElementById('email-password-form').reset();
                            document.getElementById('signup-personal-information-secondary').reset();
                            document.getElementById('signup-shipping-address-secondary').reset();
                            document.getElementById('signup-academic-information-secondary').reset();
                            document.getElementById('signup-personal-information-primary').reset();
                            document.getElementById('signup-shipping-address-primary').reset();
                            document.getElementById('signup-academic-information-primary').reset();
                            localStorage.setItem('UserToken', result.token);
                            window.location.href = './dashboard.html';
                        } else {
                            
                            if (result.email) {document.getElementById('email-error').innerText = result.email;}
                            else {document.getElementById('email-error').innerText = ''}
                            if (result.password) {document.getElementById('password-error').innerText = result.password;}
                            else {document.getElementById('password-error').innerText = ''}
                            if (result.confirmPassword) {document.getElementById('confirmPassword').innerText = result.confirmPassword;}
                            else {document.getElementById('confirmPassword').innerText = ''}
                            if (result.primaryCity) {document.getElementById('primaryCity').innerText = result.primaryCity;}
                            else {document.getElementById('primaryCity').innerText = ''}
                            if (result.primaryFirstName) {document.getElementById('primaryFirstName').innerText = result.primaryFirstName;}
                            else {document.getElementById('primaryFirstName').innerText = ''}
                            if (result.primaryLastName) {document.getElementById('primaryLastName').innerText = result.primaryLastName;}
                            else {document.getElementById('primaryLastName').innerText = ''}
                            if (result.primaryPostalCode) {document.getElementById('primaryPostalCode').innerText = result.primaryPostalCode;}
                            else {document.getElementById('primaryPostalCode').innerText = ''}
                            if (result.primarySchool) {document.getElementById('primarySchool').innerText = result.primarySchool;}
                            else {document.getElementById('primarySchool').innerText = ''}
                            if (result.primaryStreetName) {document.getElementById('primaryStreetName').innerText = result.primaryStreetName;}
                            else {document.getElementById('primaryStreetName').innerText = ''}
                            if (result.primaryStreetNumber) {document.getElementById('primaryStreetNumber').innerText = result.primaryStreetNumber;}
                            else {document.getElementById('primaryStreetNumber').innerText = ''}
                            if (result.secondaryCity) {document.getElementById('secondaryCity').innerText = result.secondaryCity;}
                            else {document.getElementById('secondaryCity').innerText = ''}
                            if (result.secondaryFirstName) {document.getElementById('secondaryFirstName').innerText = result.secondaryFirstName;}
                            else {document.getElementById('secondaryFirstName').innerText = ''}
                            if (result.secondaryLastName) {document.getElementById('secondaryLastName').innerText = result.secondaryLastName;}
                            else {document.getElementById('secondaryLastName').innerText = ''}
                            if (result.secondaryPostalCode) {document.getElementById('secondaryPostalCode').innerText = result.secondaryPostalCode;}
                            else {document.getElementById('secondaryPostalCode').innerText = ''}
                            if (result.secondarySchool) {document.getElementById('secondarySchool').innerText = result.secondarySchool;}
                            else {document.getElementById('secondarySchool').innerText = ''}
                            if (result.secondaryStreetName) {document.getElementById('secondaryStreetName').innerText = result.secondaryStreetName;}
                            else {document.getElementById('secondaryStreetName').innerText = ''}
                            if (result.secondaryStreetNumber) {document.getElementById('secondaryStreetNumber').innerText = result.secondaryStreetNumber;}
                            else {document.getElementById('secondaryStreetNumber').innerText = ''}
                        }
                        
                    })
                    .catch(error => console.log('error', error));
            }
        })
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"token": localStorage.getItem('UserToken') });
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/validateAuthorization", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === "Authorized") {
                    window.location.href = './dashboard.html';
                } else if (result === "Unauthorized" || result === 'Token has expired') {
                    document.getElementById('register-wrapper').innerHTML = `
                        <button id="toggle-teammate"> Toggle this button if you have a partner or not! </button>
                        <h5 class="col-12 login-heading" style = "height: auto; text-align: center; margin-bottom: 4vh">Personal Information:</h5>
            
                        <section class="signuprow">
                            <section id="primary" class="signupcolumn">
                                <form id="signup-personal-information-primary">
                                    <label for="first-name-primary">First name</label><br>
                                    <input type="text" id="first-name-primary" size="30" placeholder="i.e. John" required /><br>
                                    <p id="primaryFirstName"></p>
                                    
                                    <label for="last-name-primary">Last name</label><br>
                                    <input type="text" id="last-name-primary" size="30" placeholder="i.e. Smith" required /><br>
                                    <p id="primaryLastName"></p>
            
                                </form>
                            </section>
                            <section id="secondary" class="signupcolumn">
                                <form id="signup-personal-information-secondary">
                                    <label for="first-name-secondary">First name</label><br>
                                    <input type="text" id="first-name-secondary" size="30" placeholder="i.e. John" required /><br>
                                    <p id="secondaryFirstName"></p>
            
                                    <label for="last-name-secondary">Last name</label><br>
                                    <input type="text" id="last-name-secondary" size="30" placeholder="i.e. Smith" required /><br>
                                    <p id="secondaryLastName"></p>
            
                                </form>
                            </section>
                            <form id="email-password-form">
                                <label for="signup-email">Email address</label><br>
                                <input type="email" id="signup-email" size="30" placeholder="i.e stemcomp.info@gmail.com" required /><br>
                                <p id="email-error"></p>
            
                                <label for="signup-password">Password (at least 6 characters long)</label><br>
                                <input type="password" id="signup-password" size="30" required /><br>
                                <p id="password-error"></p>
            
                                <label for="confirm-password">Confirm Password (at least 6 characters long)</label><br><br>                                    
                                <input type="password" id="confirm-password" size="30" required /><br>
                                <p id="confirmPassword"></p>

                            </form>
                        </section>
            
                        <h5 class="col-12 login-heading" style = "height: auto; text-align: center; margin-bottom: 4vh">Shipping Address:</h5>
            
                        <section class="signuprow">
                            <section id="primary" class="signupcolumn">
                                <form id="signup-shipping-address-primary">
                                    <label for="street-number-primary">Street Number</label><br>
                                    <input type="text" id="street-number-primary" size="30" placeholder="i.e. 123" required /><br>
                                    <p id="primaryStreetNumber"></p>
            
                                    <label for="street-name-primary">Street Name</label><br>
                                    <input type="text" id="street-name-primary" size="30" placeholder="i.e. Alphabet Road" required /><br>
                                    <p id="primaryStreetName"></p>
            
                                    <label for="apartment-number-primary">Apartment number (leave blank if not applicable)</label><br>
                                    <input type="text" id="apartment-number-primary" size="30" required /><br>
                                    <p id="primaryApartmentNumber"></p>
            
                                    <label for="postal-code-primary">Postal code</label><br>
                                    <input type="text" id="postal-code-primary" size="30" required /><br>
                                    <p id="primaryPostalCode"></p>
            
                                    <label for="city-primary">City</label><br>
                                    <input type="text" id="city-primary" size="30" required /><br>
                                    <p id="primaryCity"></p>

                                </form>
                            </section>
                            <section id="secondary" class="signupcolumn">
                                <form id="signup-shipping-address-secondary">
                                    <label for="street-number-secondary">Street Number</label><br>
                                    <input type="text" id="street-number-secondary" size="30" placeholder="i.e. 123" required /><br>
                                    <p id="secondaryStreetNumber"></p>
            
                                    <label for="street-name-secondary">Street Name</label><br>
                                    <input type="text" id="street-name-secondary" size="30" placeholder="i.e. Alphabet Road" required /><br>
                                    <p id="secondaryStreetName"></p>
            
                                    <label for="apartment-number-secondary">Apartment number (leave blank if not applicable)</label><br>
                                    <input type="text" id="apartment-number-secondary" size="30" required /><br>
                                    <p id="secondaryApartmentNumber"></p>
            
                                    <label for="postal-code-secondary">Postal code</label><br>
                                    <input type="text" id="postal-code-secondary" size="30" required /><br>
                                    <p id="secondaryPostalCode"></p>
            
                                    <label for="city-secondary">City</label><br>
                                    <input type="text" id="city-secondary" size="30" required /><br>
                                    <p id="secondaryCity"></p>

                                </form>
                            </section>
                        </section>
            
                        <h5 class="col-12 login-heading" style = "height: auto; text-align: center; margin-bottom: 4vh">Academic Information:</h5>
            
                        <section class="signuprow">
                            <section id="primary" class="signupcolumn">
                                <form id="signup-academic-information-primary">
                                    <label for="grade-primary">Grade</label><br>
                                    <select id="grade-primary">
                                        <option value= "9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select><br>
                                    <p id="primaryGrade"></p>
            
                                    <label for="school-primary">School [No abbreviations]</label><br>
                                    <input type="text" id="school-primary" size="30" placeholder="i.e Science Collegiate Institute" required /><br>
                                    <p id="primarySchool"></p>

                                </form>
                            </section>
                            <section id="secondary" class="signupcolumn">
                                <form id="signup-academic-information-secondary">
                                    <label for="grade-secondary">Grade</label><br>
                                    <select id="grade-secondary">
                                        <option value= "9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select><br>
                                    <p id="secondaryGrade"></p>

            
                                    <label for="school-secondary">School [No abbreviations]</label><br>
                                    <input type="text" id="school-secondary" size="30" placeholder="i.e Science Collegiate Institute " required /><br>
                                    <p id="secondarySchool"></p>

                                </form>
                            </section>
                        </section>
            
                        <h6>Before you click "Sign up" please double check for typos and make sure all the information
                            you entered is valid. You will not be able to change it after.</h6>
                        <button id="signup-button" class="btn yellow darken-2 z-depth-0 fifteen-bot" style="font-size: 1.5vmax">Sign up</button>
                    `
            
                    document.getElementById('toggle-teammate').addEventListener('click', (e) => {
                        document.getElementById('email-error').innerText = '';
                        document.getElementById('password-error').innerText = '';
                        document.getElementById('confirmPassword').innerText = '';
                        document.getElementById('primaryApartmentNumber').innerText = '';
                        document.getElementById('primaryCity').innerText = '';
                        document.getElementById('primaryFirstName').innerText = '';
                        document.getElementById('primaryLastName').innerText = '';
                        document.getElementById('primaryPostalCode').innerText = '';
                        document.getElementById('primarySchool').innerText = '';
                        document.getElementById('primaryStreetName').innerText = '';
                        document.getElementById('primaryStreetNumber').innerText = '';
                        document.getElementById('secondaryApartmentNumber').innerText = '';
                        document.getElementById('secondaryCity').innerText = '';
                        document.getElementById('secondaryFirstName').innerText = '';
                        document.getElementById('secondaryLastName').innerText = '';
                        document.getElementById('secondaryPostalCode').innerText = '';
                        document.getElementById('secondarySchool').innerText = '';
                        document.getElementById('secondaryStreetName').innerText = '';
                        document.getElementById('secondaryStreetNumber').innerText = '';
        
                        if (window.toggleTeam) {
                            window.toggleTeam = false;
                            document.querySelectorAll('.signupcolumn').forEach(item => item.style.width = "100%");
                            document.querySelectorAll('#secondary').forEach(item => item.style.display = 'none');
                        } else {
                            window.toggleTeam = true;
                            document.querySelectorAll('.signupcolumn').forEach(item => item.style.width = "50%");
                            document.querySelectorAll('#secondary').forEach(item => item.style.display = 'block');
                        }
                    });
            
                    document.getElementById('signup-button').addEventListener('click', e => {
                        document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');
                        if (window.toggleTeam) {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                        
                            var raw = JSON.stringify({
                                "email": document.getElementById('email-password-form')['signup-email'].value,
                                "password": document.getElementById('email-password-form')['signup-password'].value,
                                "confirmPassword": document.getElementById('email-password-form')['confirm-password'].value,
                                "toggleTeam": window.toggleTeam,
                                "primaryAccount":{
                                    "firstname": document.getElementById('signup-personal-information-primary')['first-name-primary'].value,
                                    "lastname": document.getElementById('signup-personal-information-primary')['last-name-primary'].value,
                                    "streetnumber": document.getElementById('signup-shipping-address-primary')['street-number-primary'].value,
                                    "streetname": document.getElementById('signup-shipping-address-primary')['street-name-primary'].value,
                                    "apartmentnumber": document.getElementById('signup-shipping-address-primary')['apartment-number-primary'].value,
                                    "postalcode": document.getElementById('signup-shipping-address-primary')['postal-code-primary'].value,
                                    "city": document.getElementById('signup-shipping-address-primary')['city-primary'].value,
                                    "grade": document.getElementById('signup-academic-information-primary')['grade-primary'].value,
                                    "school": document.getElementById('signup-academic-information-primary')['school-primary'].value
                                },
                                "secondaryAccount":{
                                    "firstname": document.getElementById('signup-personal-information-secondary')['first-name-secondary'].value,
                                    "lastname": document.getElementById('signup-personal-information-secondary')['last-name-secondary'].value,
                                    "streetnumber": document.getElementById('signup-shipping-address-secondary')['street-number-secondary'].value,
                                    "streetname": document.getElementById('signup-shipping-address-secondary')['street-name-secondary'].value,
                                    "apartmentnumber": document.getElementById('signup-shipping-address-secondary')['apartment-number-secondary'].value,
                                    "postalcode": document.getElementById('signup-shipping-address-secondary')['postal-code-secondary'].value,
                                    "city": document.getElementById('signup-shipping-address-secondary')['city-secondary'].value,
                                    "grade": document.getElementById('signup-academic-information-secondary')['grade-secondary'].value,
                                    "school": document.getElementById('signup-academic-information-secondary')['school-secondary'].value
                                }
                            });
                        
                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                        
                            fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/signup", requestOptions)
                                .then(response => response.text())
                                .then(result => {
                                    result = JSON.parse(result);
                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                    if (result.token) {
                                        document.getElementById('email-password-form').reset();
                                        document.getElementById('signup-personal-information-secondary').reset();
                                        document.getElementById('signup-shipping-address-secondary').reset();
                                        document.getElementById('signup-academic-information-secondary').reset();
                                        document.getElementById('signup-personal-information-primary').reset();
                                        document.getElementById('signup-shipping-address-primary').reset();
                                        document.getElementById('signup-academic-information-primary').reset();
                                        localStorage.setItem('UserToken', result.token);
                                    } else {
                                        if (result.email) {document.getElementById('email-error').innerText = result.email;}
                                        else {document.getElementById('email-error').innerText = ''}
                                        if (result.password) {document.getElementById('password-error').innerText = result.password;}
                                        else {document.getElementById('password-error').innerText = ''}
                                        if (result.confirmPassword) {document.getElementById('confirmPassword').innerText = result.confirmPassword;}
                                        else {document.getElementById('confirmPassword').innerText = ''}
                                        if (result.primaryApartmentNumber) {document.getElementById('primaryApartmentNumber').innerText = result.primaryApartmentNumber;}
                                        else {document.getElementById('primaryApartmentNumber').innerText = ''}
                                        if (result.primaryCity) {document.getElementById('primaryCity').innerText = result.primaryCity;}
                                        else {document.getElementById('primaryCity').innerText = ''}
                                        if (result.primaryFirstName) {document.getElementById('primaryFirstName').innerText = result.primaryFirstName;}
                                        else {document.getElementById('primaryFirstName').innerText = ''}
                                        if (result.primaryLastName) {document.getElementById('primaryLastName').innerText = result.primaryLastName;}
                                        else {document.getElementById('primaryLastName').innerText = ''}
                                        if (result.primaryPostalCode) {document.getElementById('primaryPostalCode').innerText = result.primaryPostalCode;}
                                        else {document.getElementById('primaryPostalCode').innerText = ''}
                                        if (result.primarySchool) {document.getElementById('primarySchool').innerText = result.primarySchool;}
                                        else {document.getElementById('primarySchool').innerText = ''}
                                        if (result.primaryStreetName) {document.getElementById('primaryStreetName').innerText = result.primaryStreetName;}
                                        else {document.getElementById('primaryStreetName').innerText = ''}
                                        if (result.primaryStreetNumber) {document.getElementById('primaryStreetNumber').innerText = result.primaryStreetNumber;}
                                        else {document.getElementById('primaryStreetNumber').innerText = ''}
                                        if (result.secondaryApartmentNumber) {document.getElementById('secondaryApartmentNumber').innerText = result.secondaryApartmentNumber;}
                                        else {document.getElementById('secondaryApartmentNumber').innerText = ''}
                                        if (result.secondaryCity) {document.getElementById('secondaryCity').innerText = result.secondaryCity;}
                                        else {document.getElementById('secondaryCity').innerText = ''}
                                        if (result.secondaryFirstName) {document.getElementById('secondaryFirstName').innerText = result.secondaryFirstName;}
                                        else {document.getElementById('secondaryFirstName').innerText = ''}
                                        if (result.secondaryLastName) {document.getElementById('secondaryLastName').innerText = result.secondaryLastName;}
                                        else {document.getElementById('secondaryLastName').innerText = ''}
                                        if (result.secondaryPostalCode) {document.getElementById('secondaryPostalCode').innerText = result.secondaryPostalCode;}
                                        else {document.getElementById('secondaryPostalCode').innerText = ''}
                                        if (result.secondarySchool) {document.getElementById('secondarySchool').innerText = result.secondarySchool;}
                                        else {document.getElementById('secondarySchool').innerText = ''}
                                        if (result.secondaryStreetName) {document.getElementById('secondaryStreetName').innerText = result.secondaryStreetName;}
                                        else {document.getElementById('secondaryStreetName').innerText = ''}
                                        if (result.secondaryStreetNumber) {document.getElementById('secondaryStreetNumber').innerText = result.secondaryStreetNumber;}
                                        else {document.getElementById('secondaryStreetNumber').innerText = ''}
                                    }
                                    
                                })
                                .catch(error => console.log('error', error));
                        } else {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                        
                            var raw = JSON.stringify({
                                "email": document.getElementById('email-password-form')['signup-email'].value,
                                "password": document.getElementById('email-password-form')['signup-password'].value,
                                "confirmPassword": document.getElementById('email-password-form')['confirm-password'].value,
                                "toggleTeam": window.toggleTeam,
                                "primaryAccount":{
                                    "firstname": document.getElementById('signup-personal-information-primary')['first-name-primary'].value,
                                    "lastname": document.getElementById('signup-personal-information-primary')['last-name-primary'].value,
                                    "streetnumber": document.getElementById('signup-shipping-address-primary')['street-number-primary'].value,
                                    "streetname": document.getElementById('signup-shipping-address-primary')['street-name-primary'].value,
                                    "apartmentnumber": document.getElementById('signup-shipping-address-primary')['apartment-number-primary'].value,
                                    "postalcode": document.getElementById('signup-shipping-address-primary')['postal-code-primary'].value,
                                    "city": document.getElementById('signup-shipping-address-primary')['city-primary'].value,
                                    "grade": document.getElementById('signup-academic-information-primary')['grade-primary'].value,
                                    "school": document.getElementById('signup-academic-information-primary')['school-primary'].value
                                },
                                "secondaryAccount":{
                                    "firstname": "",
                                    "lastname": "",
                                    "streetnumber": "",
                                    "streetname": "",
                                    "apartmentnumber": "",
                                    "postalcode": "",
                                    "city": "",
                                    "grade": "",
                                    "school": ""
                                }
                            });
                        
                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                        
                            fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/signup", requestOptions)
                                .then(response => response.text())
                                .then(result => {
                                    result = JSON.parse(result);
                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                    if (result.token) {
                                        document.getElementById('email-password-form').reset();
                                        document.getElementById('signup-personal-information-secondary').reset();
                                        document.getElementById('signup-shipping-address-secondary').reset();
                                        document.getElementById('signup-academic-information-secondary').reset();
                                        document.getElementById('signup-personal-information-primary').reset();
                                        document.getElementById('signup-shipping-address-primary').reset();
                                        document.getElementById('signup-academic-information-primary').reset();
                                        localStorage.setItem('UserToken', result.token);
                                        window.location.href = './dashboard.html';
                                    } else {
                                        if (result.email) {document.getElementById('email-error').innerText = result.email;}
                                        else {document.getElementById('email-error').innerText = ''}
                                        if (result.password) {document.getElementById('password-error').innerText = result.password;}
                                        else {document.getElementById('password-error').innerText = ''}
                                        if (result.confirmPassword) {document.getElementById('confirmPassword').innerText = result.confirmPassword;}
                                        else {document.getElementById('confirmPassword').innerText = ''}
                                        if (result.primaryCity) {document.getElementById('primaryCity').innerText = result.primaryCity;}
                                        else {document.getElementById('primaryCity').innerText = ''}
                                        if (result.primaryFirstName) {document.getElementById('primaryFirstName').innerText = result.primaryFirstName;}
                                        else {document.getElementById('primaryFirstName').innerText = ''}
                                        if (result.primaryLastName) {document.getElementById('primaryLastName').innerText = result.primaryLastName;}
                                        else {document.getElementById('primaryLastName').innerText = ''}
                                        if (result.primaryPostalCode) {document.getElementById('primaryPostalCode').innerText = result.primaryPostalCode;}
                                        else {document.getElementById('primaryPostalCode').innerText = ''}
                                        if (result.primarySchool) {document.getElementById('primarySchool').innerText = result.primarySchool;}
                                        else {document.getElementById('primarySchool').innerText = ''}
                                        if (result.primaryStreetName) {document.getElementById('primaryStreetName').innerText = result.primaryStreetName;}
                                        else {document.getElementById('primaryStreetName').innerText = ''}
                                        if (result.primaryStreetNumber) {document.getElementById('primaryStreetNumber').innerText = result.primaryStreetNumber;}
                                        else {document.getElementById('primaryStreetNumber').innerText = ''}
                                        if (result.secondaryCity) {document.getElementById('secondaryCity').innerText = result.secondaryCity;}
                                        else {document.getElementById('secondaryCity').innerText = ''}
                                        if (result.secondaryFirstName) {document.getElementById('secondaryFirstName').innerText = result.secondaryFirstName;}
                                        else {document.getElementById('secondaryFirstName').innerText = ''}
                                        if (result.secondaryLastName) {document.getElementById('secondaryLastName').innerText = result.secondaryLastName;}
                                        else {document.getElementById('secondaryLastName').innerText = ''}
                                        if (result.secondaryPostalCode) {document.getElementById('secondaryPostalCode').innerText = result.secondaryPostalCode;}
                                        else {document.getElementById('secondaryPostalCode').innerText = ''}
                                        if (result.secondarySchool) {document.getElementById('secondarySchool').innerText = result.secondarySchool;}
                                        else {document.getElementById('secondarySchool').innerText = ''}
                                        if (result.secondaryStreetName) {document.getElementById('secondaryStreetName').innerText = result.secondaryStreetName;}
                                        else {document.getElementById('secondaryStreetName').innerText = ''}
                                        if (result.secondaryStreetNumber) {document.getElementById('secondaryStreetNumber').innerText = result.secondaryStreetNumber;}
                                        else {document.getElementById('secondaryStreetNumber').innerText = ''}
                                    }
                                    
                                })
                                .catch(error => console.log('error', error));
                        }
                    })
                } else {
                   
                }
            })
            .catch(error => console.log('error', error));
    }
})
