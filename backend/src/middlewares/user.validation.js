import { body, validationResult } from "express-validator";

export const validateUser = [
    body("username")
    .notEmpty()
    .withMessage("username must not be empty")
    .isLength({min:5})
    .withMessage("username must be at least 5 characters"),

    body("email")
    .isEmail().
    withMessage("enter a valid email"),

    body("password")
    .notEmpty()
    .withMessage("password is obligatory")
    .isLength({min:5})
    .withMessage("The minimum password length is 6 characters")
];

export const handleValidationErrors = (req , res , next) =>{
    const error = validationResult(req);

    if(!error.isEmpty())
        return res.status(400).json(error);

    next();
};

export const validateLogin = [
    body("email")
    .isEmail().
    withMessage("enter a valid email"),

    body("password")
    .notEmpty()
    .withMessage("password is obligatory")
    .isLength({min:5})
    .withMessage("The minimum password length is 6 characters")
];