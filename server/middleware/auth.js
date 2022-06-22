import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
  
    const isCustomAuth = token.length < 500; //kenou akber men 500 rahou googleAuth

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // sub hiya teb3a lel google ID
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;