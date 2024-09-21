import jwt from 'jsonwebtoken'

class JwtCheck {

  constructor(secret) {

    this.secret = secret
  }

  check = (req, res, next) => {

    const token = req.session.token || req.headers['authorization']?.split(' ')[1]

    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided.' })
    }

    jwt.verify(token, this.secret, (err, decoded) => {

      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
      }

      req.userId = decoded.id
      next()

    })
  }


}

export default JwtCheck
