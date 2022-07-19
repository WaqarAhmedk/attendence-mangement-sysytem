const jwt = require('jsonwebtoken');
const jwtsecret = "adminsecret";

const fetchadmin = (req, res, next) => {

    const authtoken = req.header("AdminAuthToken");
    try {
        if (!authtoken) {
           res.send("No Token is Provided");

        } else {

            const data = jwt.verify(authtoken, jwtsecret);

            if (!data) {
              
                res.status(401).send("Invalid Auth Token");

            } else {
                req.adminuser = data.user;

            }


        }
    } catch (error) {
      
        res.send("There is a problem in verftying a token" + error);
    }
    next();




}

module.exports=fetchadmin;