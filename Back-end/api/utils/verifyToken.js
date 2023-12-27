import jwt from "jsonwebtoken"
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, 'You are not authenticated'))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is not valid'))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };

  
// export const verifyUser = async (req, res, next) => {
//     try {
//         await verifyToken(req, res, next)
//         if (req.user.id === req.params.id || req.user.isAdmin) {
//             next()
//         } else {
//             return next(createError(403, "You are not authorized."))
//         }
//     } catch (error) {
//         return next(createError(403, "Caught an error: " + error.message))
//     }
// }

// export const verifyAdmin = async (req, res, next)=>{
//     try {
//         await verifyToken(req, res, next)
//         if(req.user.isAdmin){
//             next()
//         }else{
//             return next(createError(403, "You are not authorized."))
//         }
//     } catch (error) {
//         return next(createError(403, "Caught an error: " + error.message))
//     }
// }