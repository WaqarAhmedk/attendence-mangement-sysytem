const jwt = require('jsonwebtoken');
const jwtsecret = "hello@";

const fetchuser = (req, res, next) => {

    try {
        const Authtoken = req.header("AuthToken");
     

        if (!Authtoken) {
           
           return res.send("PLease provide a AuthToken");
          
        }


        const data = jwt.verify(Authtoken, jwtsecret);
       
        if (!data) {
            return   res.send("Please provide a valid token")

        }
        else {
            req.user = data.user;
        }



    }


    catch (error) {
        res.send("There is a problem in verftying a token" + error);
    }
    next();

}

module.exports = fetchuser;