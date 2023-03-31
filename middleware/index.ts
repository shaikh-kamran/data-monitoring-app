import { jwt } from 'jsonwebtoken';
const secret = "kodewithkamran";
const bypassurls = [
    '/user/login/',
    '/user/login',
    '/user/',
    '/user',
]

export const middleware = () => {
    return async (req, res, next) => {
        if (bypassurls.includes(req.originalUrl)) {
            next();
        } else {
            const token = req.headers['authorization'];
            if (token) {
                jwt.verify(token, secret, (err, data) => {
                    if (err) {
                        res.sendStatus(401)
                    }
                    res.user = data;
                    next();
                })
            } else {
                res.sendStatus(401);
            }
        }
    }
}