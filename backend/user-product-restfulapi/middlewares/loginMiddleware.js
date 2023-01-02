const { requires } = require('consolidate');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token1=authHeader.split('.')[1]
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err,user) => {

    if (err) return res.sendStatus(403)
else{
     decodedValue = JSON.parse(Buffer.from(token1,    
        'base64').toString('ascii'));
       

next()

}

  })
}

module.exports=authenticateToken