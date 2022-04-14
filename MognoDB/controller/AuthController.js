const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const UserController = require("../controller/UserController");

const register = async (req, res, next) => {
  const data = req.body;
  if (data) {
    const oldUser = await User.findOne({ email: data.email });
    if (oldUser) {
      return res.status(400).json({
        success: false,
        status: `Бүртгэлтэй хэрэглэгч байна.`,
      });
    }
    var hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.role == 0 ? (data.role_id = 3) : (data.role_id = data.role);
    data.created_date = Date("Y-m-d");
    data.last_activity = Date("Y-m-d h:m:s");
    User.create(data)
      .then((data) => {
        email = data.email;
        const token = jwt.sign(
          { user_id: data._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        res.status(200).json({
          success: true,
          data: data,
          token: token,
        });
        return;
      })
      .catch(next);
  } else {
    return res.json({
      error: `The input field is empty`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res
        .status(400)
        .json({
          success: false,
          status: `Юмаа бүрэн оруулчихаач.`,
          updated: 1,
          email: email,
          password: password,
        });
      return;
    } else {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res
          .status(200)
          .json({
            success: true,
            status: `Орчихлоошт.`,
            data: user,
            token: token,
          });
        return;
      } else {
        res.status(400).json({
          success: false,
          status: `Нууц үг эдр чинь буруу бээштээ.`,
        });
        return;
      }
    }
  } catch {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
};
