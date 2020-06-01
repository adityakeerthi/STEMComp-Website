const db = {
    "accounts": [
        { // name of document is going to be the uid
            "email": "test@gmail.com",
            "password": "#HASHEDPASSWORD", // Bcrypt algorithm here
            "primaryAccount": {
                "firstname": "John",
                "lastname": "Smith",
                "streetnumber": "1234",
                "streetname": "Sesame Street",
                "apartmentnumber": "304",
                "postalcode": "Y7H 9T5",
                "city": "Toronto",
                "grade": "9"
            },
            "secondaryAccount": {
                "firstname": "Jane",
                "lastname": "Smith",
                "streetnumber": "321",
                "streetname": "Alphabet Road",
                "apartmentnumber": "304",
                "postalcode": "Y7H 9T5",
                "city": "Toronto",
                "grade": "9"
            },
            "votes": {
                "321314532da7c938": {
                    "difficulty": 100,
                    "impact": 23,
                    "interest": 78,
                    "sources": 100
                },
                "98ayhd2u17u82nkj": {
                    "difficulty": 89,
                    "impact": 24,
                    "interest": 100,
                    "sources": 59
                }
            },
            "assigned": [
                "321314532da7c938", // uid
                "98ayhd2u17u82nkj" // uid
            ],
            "submitted": true
        },
        {
            "email": "test2@gmail.com",
            "password": "#HASHEDPASSWORD", // Bcrypt algorithm here
            "primaryAccount": {
                "firstname": "John",
                "lastname": "Smith",
                "streetnumber": "1234",
                "streetname": "Sesame Street",
                "apartmentnumber": "304",
                "postalcode": "Y7H 9T5",
                "city": "Toronto",
                "grade": "9"
            },
            "secondaryAccount": {
                "firstname": "",
                "lastname": "",
                "streetnumber": "",
                "streetname": "",
                "apartmentnumber": "",
                "postalcode": "",
                "city": "",
                "grade": ""
            },
            "votes": {
                "321314532da7c938": {
                    "difficulty": 100,
                    "impact": 23,
                    "interest": 78,
                    "sources": 100
                },
                "98ayhd2u17u82nkj": {
                    "difficulty": 89,
                    "impact": 24,
                    "interest": 100,
                    "sources": 59
                }
            },
            "assigned": [
                "321314532da7c938", // uid
                "98ayhd2u17u82nkj" // uid
            ],
            "submitted": false
        }
    ],
    "projects": [
        { // name of document is going to be the uid
            "assigned": [
                "321314532da7c938",
                "98ayhd2u17u82nkj",
                "73897912heiuh98d"
            ],
            "assignedCount": 0,
            "category": "life-sciences",
            "description": "An experiment to predict the increase of cases of COVID-19 through Machine Learning",
            "email": "test@gmail.com",
            "uid": "321314532da7c938",
            "title": "Finding a way to stop COVID-19",
            "votes": {
                "test2@gmail.com": {
                    "difficulty": 89,
                    "impact": 24,
                    "interest": 100,
                    "sources": 59
                }
            },
            "youtubeURL": "https://www.youtube.com/watch?v=vVnDE8wSrVo"
        }
    ]
}