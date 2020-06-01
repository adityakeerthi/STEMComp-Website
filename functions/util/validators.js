const isEmpty = string => {
    if(String(string).trim() === '') return true;
    else return false;
}

const isEmail = email => {
    const emailRegEx = /[\w-]+@([\w-]+\.)+[\w-]+/;
    if (String(email).match(emailRegEx)) return true;
    else return false;
}

const isPostalCode = postalCode => {
    const postalCodeRegEx = /^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY][0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ] {0,1}[0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ][0-9]$/
    if (String(postalCode).match(postalCodeRegEx)) return true;
    else return false;
}

exports.validateSignupData = data => {
    let errors = {};
    const teamBool = data.toggleTeam;
    if (teamBool) {
        if (isEmpty(data.email)) {
            errors.email = 'Must not be empty';
        } else if (!isEmail(data.email)) {
            errors.email = 'Must be a valid email address';
        }
        if (isEmpty(data.password)) {
            errors.password = 'Must not be empty';
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }
        if (isEmpty(data.primaryAccount.postalcode)) {
            errors.primaryPostalCode = 'Must not be empty';
        } else if (!isPostalCode(data.primaryAccount.postalcode)) {
            errors.primaryPostalCode = 'Must be a valid postal code';
        }
        if (isEmpty(data.secondaryAccount.postalcode)) {
            errors.secondaryPostalCode = 'Must not be empty';
        } else if (!isPostalCode(data.secondaryAccount.postalcode)) {
            errors.secondaryPostalCode = 'Must be a valid postal code';
        }
        if (isEmpty(data.primaryAccount.firstname)) {
            errors.primaryFirstName = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.lastname)) {
            errors.primaryLastName = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.streetnumber)) {
            errors.primaryStreetNumber = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.streetname)) {
            errors.primaryStreetName = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.city)) {
            errors.primaryCity = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.grade)) {
            errors.primaryGrade = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.school)) {
            errors.primarySchool = 'Must not be empty'
        }
        // secondary
        if (isEmpty(data.secondaryAccount.firstname)) {
            errors.secondaryFirstName = 'Must not be empty'
        }
        if (isEmpty(data.secondaryAccount.lastname)) {
            errors.secondaryLastName = 'Must not be empty'
        }
        if (isEmpty(data.secondaryAccount.streetnumber)) {
            errors.secondaryStreetNumber = 'Must not be empty'
        }
        if (isEmpty(data.secondaryAccount.streetname)) {
            errors.secondaryStreetName = 'Must not be empty'
        }
        if (isEmpty(data.secondaryAccount.city)) {
            errors.secondaryCity = 'Must not be empty'
        }
        if (isEmpty(data.secondaryAccount.grade)) {
            errors.secondaryGrade = 'Must not be empty'
        }
        if (isEmpty(data.secondaryAccount.school)) {
            errors.secondarySchool = 'Must not be empty'
        }


    } else {
        if (isEmpty(data.email)) {
            errors.email = 'Must not be empty';
        } else if (!isEmail(data.email)) {
            errors.email = 'Must be a valid email address';
        }
        if (isEmpty(data.password)) {
            errors.password = 'Must not be empty';
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }
        if (isEmpty(data.primaryAccount.postalcode)) {
            errors.primaryPostalCode = 'Must not be empty';
        } else if (!isPostalCode(data.primaryAccount.postalcode)) {
            errors.primaryPostalCode = 'Must be a valid postal code';
        }
        if (isEmpty(data.primaryAccount.firstname)) {
            errors.primaryFirstName = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.lastname)) {
            errors.primaryLastName = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.streetnumber)) {
            errors.primaryStreetNumber = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.streetname)) {
            errors.primaryStreetName = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.city)) {
            errors.primaryCity = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.grade)) {
            errors.primaryGrade = 'Must not be empty'
        }
        if (isEmpty(data.primaryAccount.school)) {
            errors.primarySchool = 'Must not be empty'
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLoginData = data => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    }
    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}