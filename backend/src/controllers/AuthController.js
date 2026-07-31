const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

exports.register = async (req, res) => {
    try {

        const hashed = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            phone: req.body.phone,
            role: req.body.role || "DRIVER",
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message,
        errors: error.errors || null,
    });
}
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const valid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!valid) {
      return res.status(400).json({
        message: 'Wrong password',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getDrivers = async (req, res) => {
    try {
        const drivers = await UserRepository.findDrivers();

        return res.json({
            success: true,
            message: "Drivers retrieved successfully",
            data: drivers,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};