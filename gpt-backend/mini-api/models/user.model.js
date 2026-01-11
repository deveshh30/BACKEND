/* 
    user model schema

    FIELDS : 
    nname - string
    email - string
    age - num
    createdAt - date()

    email {
        should be unique 
        lowercase
    }

    age {
        age > 7
    }

*/ 