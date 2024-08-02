const User = require('../models/users.js');
module.exports.showSignupForm = (req, res) => {
    res.render('users/Signup.ejs');
};
module.exports.addNewUserSignUp = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const findUser = await User.findOne({ $or: [{ username }, { email }] });

        if (findUser === null) {
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);

            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash('success', 'Welcome to the Chef Genie');
                return res.redirect('/home/player');
            });
        } else if (findUser.email === email && findUser.username === username) {
            req.flash('error', 'Email and Username are already registered.');
            return res.redirect('/signup');
        } else if (findUser.username === username) {
            req.flash('error', 'Username is already registered.');
            return res.redirect('/signup');
        } else if (findUser.email === email) {
            req.flash('error', 'Email is already registered.');
            return res.redirect('/signup');
        }
    } catch (err) {
        req.flash('error', 'Please enter valid details.');
        return res.redirect('/signup');
    }
};

// module.exports.addNewUserSignUp = async (req, res, next) => {
//     try {
//         let { email, username, password } = req.body;
//         let findUser = await User.findOne({ $or: [{ username }, { email }] });
//         console.log(findUser);
//         if (findUser === null) {
//             let userSignin = new User({ email, username });
//             let registeredUser = await User.register(userSignin, password);
//             req.login(registeredUser, (err) => {
//                 if (err) {
//                     return next(err);
//                 }
//                 req.flash('success', 'Welcome to the Chef Genie');
//                 res.redirect('/home/main');
//             });
//         }
//         else if (findUser.email === email && findUser.username === username) {
//             req.flash('error', 'Email and Username is already Registered..!');
//             res.redirect('/signup');
//         } else if (findUser.username === username) {
//             req.flash('error', 'Username is already Registered..!');
//             res.redirect('/signup');
//         } else if (findUser.email === email) {
//             req.flash('error', 'Email is already Registered..!');
//             res.redirect('/signup');
//         }
//     }
//     catch (err) {
//         req.flash('error', 'Please enter valid details...!');
//         res.redirect('/signup');
//     }
// };

module.exports.showLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome to Music-Own');
    res.redirect('/home/player');
};
