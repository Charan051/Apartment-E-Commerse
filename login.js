const mysql = require("mysql2");
const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const ejs = require('ejs');

const multer = require('multer');
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

let uname = null;
let uemail = null;
let upassword = null;

const app = express();
app.use(express.static(path.join(__dirname,'/assets')));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Abkudabku123",
    database: "apartment-e-commerse" 

});


connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database succesfully")
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "\\register\\sign.html");
})
app.get("/homepage",function(req,res){
    res.sendFile(__dirname + "\\homepage\\homepage.html");
})
app.get("/login.html",function(req,res){
    res.sendFile(__dirname + "\\register\\login.html");
})
app.get("/products.html",function(req,res){
    res.sendFile(__dirname + "\\products\\products.html");
})
app.get("/open.html",function(req,res){
    res.sendFile(__dirname + "\\products\\open.html");
})
app.get("/index.ejs",function(req,res){
    res.sendFile(__dirname + "\\views\\index.ejs");
})
app.get("/index1.ejs",function(req,res){
    res.sendFile(__dirname + "\\views\\index1.ejs");
})
app.get("/orders.ejs",function(req,res){
    res.sendFile(__dirname + "\\views\\orders.ejs");
})
app.get("/pros.ejs",function(req,res){
    res.sendFile(__dirname + "\\views\\pros.ejs");
})
app.get("/add.html",function(req,res){
    res.sendFile(__dirname + "\\products\\add.html");
})
app.get("/buy.html",function(req,res){
    res.sendFile(__dirname + "\\Buy\\buy.html");
})

app.post("/",encoder,function(req,res){
    var name=req.body.name
    var email=req.body.email;
    var phnum=req.body.phnum;
    var flatnum=req.body.flatnum;
    var block=req.body.block;
    var password=req.body.password;
    connection.query("SELECT * FROM `apartment-e-commerse`.`mdb` WHERE name=? AND email=? AND phnum=? AND flatnum=? AND block=?", [name, email, phnum, flatnum, block], function(error, results, fields) 
        {
            
        if(results.length > 0){
            const sql = "INSERT INTO `apartment-e-commerse`.`users` (`name`, `email`, `password`, `id`) VALUES (?, ?, ?, ?)";
            connection.query(sql,[name,email,password,flatnum],function(error,results,fields){
                if(error){
                    res.redirect("wrong not inserted");
                }else{
                    uemail=email;
                    upassword=password;
                    // console.log(uemail);
                    res.redirect("/homepage");
                }
            })
            
        }else{
            res.redirect("wrong password");

        }
    })
})
app.post("/1",encoder,function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    connection.query("select * from `apartment-e-commerse`.`users` where email = ? and password = ?",[email,password],function(error,results,fields){
        if(results.length > 0){
            res.redirect("/homepage");
            uemail=email;
            upassword=password;
            var sql =  "select `name` FROM `apartment-e-commerse`.`users` where email = ?";
            connection.query(sql,[uemail],function(error,results,fields){
                if(error){
                    res.redirect("wrong not inserted");
                }else{
                    // uname = results[0];
                    uname = results[0].name;
                }
            })
            
        }else{
            res.redirect("wrong password");

        }
        res.end();
    })
})


app.get('/open', (req, res) => {
    connection.query('SELECT pname FROM `apartment-e-commerse`.`products`', (error, results, fields) => {
        if (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Error fetching product details' });
            return;
        }
        res.json(results);
    });
});

app.get('/index', (req, res) => {
    var pid=req.query.id;
    console.log(req.query);
    connection.query('SELECT * FROM products p,users u where p.email=u.email and p.pid=?', [pid],(error, results, fields) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
            return;
        }
        res.render('index.ejs', { products: results });
    });
});
app.get('/index1', (req, res) => {
    connection.query('SELECT * FROM products where pid=?',[2], (error, results, fields) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
            return;
        }
        res.render('index1.ejs', { products: results });
    });
});
// app.set('view engine', 'ejs')

// app.post("/1",encoder,function(req,res){
//     var name=req.body.name
//     var email=req.body.email;
//     var phnum=req.body.phnum;
//     var flatnum=req.body.flatnum;
//     var block=req.body.block;
//     var password=req.body.password;

//     const sql = "INSERT INTO `apartment-e-commerse`.`mdb` (`name`, `email`, `phnum`, `flatnum`, `block`, `password`) VALUES (?, ?, ?, ?, ?, ?)";

//     connection.query(sql,[name,email,phnum,flatnum,block,password],function(error,results,fields){
//         if(error){
//             res.redirect("wrong wrong");
//         }else{
//             res.redirect("/index");

//         }
//         res.end();
//     })
// })
//this is for the edit user information
app.get('/retuserdetails',(req,res) =>{
    connection.query('SELECT * FROM `apartment-e-commerse`.`users` WHERE  email =? AND password=?',[uemail,upassword],(error,results,fields) => {
        if (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Error fetching product details' });
            return;
        }
        res.json(results);
    })
})
// console.log("hiii");
app.post('/edit',encoder,(req,res) =>{
    // const {ename,eemail,epassword} = req.body;
    var ename=req.body.name;
    var eemail=req.body.email;
    var epassword=req.body.password;
    
    // console.log(ename,eemail,epassword);
    // console.log(req.body); // Corrected typo
    connection.query('UPDATE `apartment-e-commerse`.`mdb` SET name=? , email=? where email= ?',[ename,eemail,uemail],(error,results,fields) =>{
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Error updating user' });
        }
        console.log('User updated successfully');
    connection.query('UPDATE `apartment-e-commerse`.`users` SET name=? , email=? , password =? where email= ?',[ename,eemail,epassword,eemail],(error,results,fields) =>{
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Error updating user' });
        }
        console.log('User updated successfully');
        uemail = eemail;
        upassword = epassword;
        res.redirect('/homepage');
    })
    
    })
})

app.post('/add', upload.single('image'), function(req, res) {
    var pname = req.body.pname;
    var pdesc = req.body.pdesc;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var contact = req.body.contact;
    var cat = req.body.cat;
    var imgData = req.file.buffer; // Access the image data from req.file.buffer

    const sql = 'INSERT INTO `apartment-e-commerse`.`products` (pname, pdesc, price, quantity, email, contact, img, cat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [pname, pdesc, price, quantity, uemail, contact, imgData, cat], (error, results, fields) => {
        if (error) {
            console.error('Error adding product:', error);
            return res.status(500).send('Error adding product');
        }
        console.log('Product added successfully');
        res.redirect('/homepage');
    });
});




app.get('/orders', (req, res) => {
    connection.query('SELECT * FROM `apartment-e-commerse`.`users` where email=?',[uemail], (error, results, fields) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
            return;
        }
        else{
            var name=results[0].name
            console.log(name)
                connection.query('SELECT * FROM orders WHERE bname=?',[name], (error, results1, fields) => {
                    if (error) {
                        console.error('Error fetching products:', error);
                        res.status(500).send('Error fetching products');
                        return;
                    }
                    res.render('orders.ejs', { orders: results1 });
                });
        }
        // res.render('index.ejs', { products: results });
    });
});
app.get('/urp', (req, res) => {
    // Query to retrieve pname and img for products where email matches uemail
    connection.query('SELECT pname, img ,pid FROM `apartment-e-commerse`.`products` WHERE email = ?', [uemail], (error, results, fields) => {
        if (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Error fetching product details' });
            return;
        }
        // Convert image data to Base64 string
        results.forEach(product => {
            product.img = Buffer.from(product.img).toString('base64');
        });
        // Send product details as JSON
        res.json(results);
    });
});
app.post('/removeProduct', (req, res) => {
    const productId = req.body.pid;
    console.log('Product ID to remove:', productId); // Log the product ID
    connection.query('DELETE FROM `apartment-e-commerse`.`products` WHERE pid = ?', [productId], (error, results, fields) => {
        if (error) {
            console.error('Error removing product:', error);
            res.status(500).json({ error: 'Error removing product' });
        } else {
            console.log('Product removed successfully');
            res.status(200).json({ success: true }); // Send success response
        }
    });
});

app.post('/3', encoder,function(req,res) {
    console.log("hii")
    console.log(req.body)
    var pid = req.body.pid;
    var date=new Date();
    var pname=req.body.pname;
    var price=req.body.price; 
    var bname=uname;
    var status=0;
    var sname=req.body.sname;
    const sql = 'INSERT INTO `apartment-e-commerse`.`orders` (pname,price,odate,sname,bname,status,pid) VALUES (?,?,?,?,?,?,?)';
    connection.query(sql, [pname,price,date,sname,bname,status,pid], (error, results, fields) => {
    if (error) {
        console.error('Error adding product:', error);
        return res.status(500).send('Error adding product');
    }
    console.log('Product added successfully');
    res.redirect('/homepage');
    });
});

app.get('/pros',  encoder,function(req, res) {
    var cat=req.query.id;
    console.log(req.query.id);
    const query = 'SELECT * FROM `apartment-e-commerse`.`products` where cat=? and email != ? ';
    // and email <> ? [uemail]
   
    connection.query(query,[cat,uemail], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving data from the database');
        return;
      }
  
      // Sort the results by the book's ID (or another unique identifier)
    //   results.sort((a, b) => a.id - b.id);
  
      res.render('pros.ejs', { books: results });
    });
  });

app.listen(4500);