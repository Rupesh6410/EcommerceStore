import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    // return res.status(200).json({ message: "User Created Successfully" });
    const { username, email, password } = req.body;
    
    console.log("EMAIL | USERNAME | PASSWORD", email, username, password);
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ username, email, password: hashPassword });
    
    try {
        await newUser.save();
        console.log("NEW USER", newUser);
        
        // Generate token and include in response
        const token = createToken(res, newUser._id);
        console.log("TOKEN", token);
        
        res.status(201).json({
            token: token,
            user: {
                username: newUser.username,
                _id: newUser._id,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            }
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid User data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    // return res.status(200).json({ message: "Login Successful" });
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            // Generate token and include in response
            const token = createToken(res, existingUser._id);
            console.log("token: ", token)
            res.status(200).json({
                token: token,
                user: {
                    _id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    isAdmin: existingUser.isAdmin,
                }
            });
            console.log("response from API: ", res)
            return;
        }
    }
    
    // Handle invalid credentials
    res.status(401);
    throw new Error("Invalid email or password");
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged Out Successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User Not Found");
    }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashPassword;
        }

        const updateUser = await user.save();

        res.json({
            id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot Delete Admin User");
        }

        await User.deleteOne({ _id: user._id });
        res.json({ message: "User Removed" });
    } else {
        res.status(404);
        throw new Error("User not Found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

export {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
};