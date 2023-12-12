const express=require("express")
const router=express();



const credential = {
    email: "udayan@gmail.com",
    password: "1234"
};

router.get('/',(req,res)=>{
    if(!req.session.user){
      res.render('base',{title:"Login page",massage:req.flash()})
    }else{
      res.redirect("/home")
    }
  })
  
  
  // Login Route
  router.post('/login', (req, res) => {
       if(req.body.email !== credential.email && req.body.password !== credential.password){
          req.flash("error","Email and password are incorrect..");
          return res.redirect("/");
          
      }
     else if (req.body.email == credential.email && req.body.password == credential.password) {
          req.session.user = req.body.email;
          res.redirect('/home');
      } else if(req.body.email !== credential.email) {
        req.flash("error","Email incorrect..");
        return res.redirect("/");
          
      }else if(req.body.password !== credential.password){
          req.flash("error"," Password incorrect.. ");
          return res.redirect("/");
  
      }
  });
  
  // Home Route
  router.get('/home', (req, res) => {
      
      if (req.session.user) {
          res.render('home', { user: req.session.user });
      } else {
          res.redirect("/");
      }
  });
  
  // Logout Route
  router.get('/logout', (req, res) => {
      
      req.session.destroy(function (err) {
  
          if (err) {
              console.log(err);
              res.send("Error");
          } else {
          
            res.redirect("/");
            
          
          }
      });
  });
  




module.exports=router