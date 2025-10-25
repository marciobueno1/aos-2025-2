app.post("/login", (req, res) => {

    if(req.body.user === "luiz" && req.body.password === "123"){
   
      const id = 1; 
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES)
      });
      return res.json({ token: token });
    }
    
    res.status(401).json({message: "Invalid credentials!"});
})