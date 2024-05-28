const db = require("../config/db");
const JWT = require("jsonwebtoken");

// user registraion controller
const registraionController = (req, res) => {
  try {
    const user = req.body;
    let query = "SELECT email,password, status FROM user WHERE email=?";
    db.query(query, [user.email], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.length <= 0) {
          let query =
            "INSERT INTO user(name,email,password,status,isDeletable)VALUES(?,?,?,'false','true')";
          db.query(
            query,
            [user.name, user.email, user.password],
            (err, result) => {
              if (err) {
                res.status(500).json({
                  message: "Something went wrong!",
                  error: err.message,
                });
              } else {
                res.status(200).json({
                  message: "User registration successfully!",
                  user: result,
                });
              }
            }
          );
        } else {
          res.status(400).json({
            message: "Email Already Exist, Please try again another Email",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

const logincontroller = (req, res) => {
  try {
    const user = req.body;
    let query =
      "SELECT email, password, status, isDeletable FROM user WHERE email = ?";
    db.query(query, [user.email], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.length <= 0 || result[0].password != user.password) {
          res.status(401).json({
            message: "Incorrect Email or Password!",
          });
        } else if (result[0].status === "false") {
          res.status(401).json({
            message: "Wait for Admin Approval!",
          });
        } else if (result[0].password == user.password) {
          const response = {
            email: result[0].email,
            isDeletable: result[0].isDeletable,
          };
          const accessToken = JWT.sign(response, process.env.ACCESS_TOKEN, {
            expiresIn: "8h",
          });
          res.status(200).json({
            message: "user login successfully!",
            user: result,
            token: accessToken,
          });
        } else {
          res.status(400).json({
            message: " Something went wrong!, Please try again later",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// get all user details
const getAllUserController = (req, res) => {
  try {
    const tokenPayload = res.locals;

    let query;
    if (tokenPayload.isDeletable === "false") {
      query =
        "SELECT id,name, email, status FROM user WHERE isDeletable = 'true' ";
    } else {
      query =
        "SELECT id,name, email, status FROM user WHERE isDeletable = 'true' AND email != ?";
    }

    db.query(query, [tokenPayload.email], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        res.status(201).json({
          message: "get all user data successfully!",
          user: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// update user status controller

const updateUserStatusController = (req, res) => {
  try {
    const user = req.body;

    let query =
      "UPDATE user SET status = ? WHERE id = ? AND isDeletable = 'true' ";

    db.query(query, [user.status, user.id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.affectedRows == 0) {
          res.status(404).json({
            message: "User ID does not exist!",
          });
        } else {
          res.status(200).json({
            message: "User status Updated successfully!",
            user: result,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// update user details controller

const updateUserController = (req, res) => {
  try {
    const user = req.body;

    let query = "UPDATE user SET name = ?, email = ? WHERE id = ?";
    db.query(query, [ user.name, user.email,user.id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.affectedRows == 0) {
          res.status(404).json({
            message: "User ID does not exist",
          });
        } else {
          res.status(200).json({
            message: "User details updated successfully!",
            user: result,
          });
        }
      }
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// delete user controller

const deleteUserController = (req,res)=>{
    try {

        const userId = req.params.id;

        const query = "DELETE FROM user WHERE id = ? AND isDeletable = 'true'";
    
        db.query(query,[userId],(err,result)=>{
            if(err){
                res.status(500).json({
                    message:"Something went wrong!",
                    error:err.message
                })
            }else{
                if(result.affectedRows == 0 ){
                    res.status(404).json({
                        message:"User ID does not exist!"
                    })
                }else{
                    res.status(201).json({
                        message:"User deleted successfully!"
                    })

                }
            }
        }) 
        
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error!",
            error:error.message
        })
    }
}



module.exports = {
  registraionController,
  logincontroller,
  getAllUserController,
  updateUserStatusController,
  updateUserController,
  deleteUserController
};
