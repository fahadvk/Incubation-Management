import Jwt from "jsonwebtoken";
export const userAuth = async (req, res, next) => {

    let token
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]

        }

        await Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

            if (err) {
                return res.status(401).send({
                    message: "authentication failed",
                    success: false
                })
            }
            else {
                req.body.userid = decoded.id

                next()
            }
        })

    } catch (error) {
        res.status(500).send("error found")
    }
}
