const {registerService, loginService} = require('../services/auth.service')


const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body;


  //validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  try {
    const user = await registerService({name, email, password})
    return res.status(201).json({ message: "User Created Successfully", user });
  } catch (err) {
    res.status(500).json(err.message);
  }
};



const userLoginController = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const token = await loginService({email, password})
      return res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  

module.exports = {userRegisterController, userLoginController};