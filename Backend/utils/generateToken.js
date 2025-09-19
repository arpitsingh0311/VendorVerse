import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res,userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiredIn: '15d',
    });
    res.cookie('jwt', token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'development',
    })
}

export default generateTokenAndSetCookie;