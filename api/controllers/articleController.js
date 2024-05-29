const db = require("../config/db");

// add article controller
const addArticleController = (req, res) => {
  try {
    const article = req.body;
    let query =
      "INSERT INTO article(title, content, categoryId, publication_date, status) VALUES(?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        article.title,
        article.content,
        article.categoryId,
        new Date(),
        article.status,
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Somehting went wrong!",
            error: err.message,
          });
        } else {
          res.status(200).json({
            message: "Article Added successfully!",
            article: result,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// get All article controller
const getAllArticleController = (req, res) => {
  try {
    let query =
      "SELECT a.id,a.title,a.content,a.status,a.publication_date,c.id AS categoryId, c.name AS categoryName FROM article AS a inner join category AS c WHERE a.categoryId = c.id";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Get All article successfully!",
          article: result,
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

// get All published article controller
const getAllPublishedArticleController = (req, res) => {
  try {
    let query =
      "SELECT a.id,a.title,a.content,a.status,a.publication_date,c.id AS categoryId, c.name AS categoryName FROM article AS a INNER JOIN category AS c WHERE a.categoryId = c.id AND a.status = 'published'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Get All article successfully!",
          article: result,
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

// update article controller
const updateArticleController = (req, res) => {
  try {
    const article = req.body;
    let query =
      "UPDATE article SET title=?, content=?,categoryId=?,publication_date=?,status=? WHERE id=?";
    db.query(
      query,
      [
        article.title,
        article.content,
        article.categoryId,
        new Date(),
        article.status,
        article.id,
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Something went wrong!",
            error: err.message,
          });
        } else {
          if (result.affectedRows == 0) {
            res.status(404).json({
              message: "Article ID does not found!",
            });
          } else {
            res.status(200).json({
              message: "Article updated successfully!",
              article: result,
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Delete article controller
const deleteArticleController = (req,res)=>{
  try {
    const id  = req.params.id

    let query = "DELETE FROM article WHERE id =?";
    db.query(query,[id],(err,result)=>{
      if(err){
        res.status(500).json({
          message:"Something went wrong!",
          error:err.message
        })
      }else{
        if(result.affectedRows == 0){
          res.status(404).json({
            message:"Article ID not found!"
          })
        }else{
          res.status(200).json({
            message:"article deleted successfully!"
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
  addArticleController,
  getAllArticleController,
  getAllPublishedArticleController,
  updateArticleController,
  deleteArticleController
};
