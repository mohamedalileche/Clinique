 const mysql = require('mysql2');
const path = require ('path')
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.set('view engine','ejs');
app.listen(3000, ()=>{console.log('server started')});
 
//CONNECTION BASE DE DONNES
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'azerty',
    connectionlimit:10,
    database:"bbdclinique"
})
//MESSAGE D'ERREUR
con.connect((err) => {
    if (err) throw err
    console.log("Connected ,,,")
})


    

app.get('/index',(req,res) =>{
    
con.query('SELECT * FROM bbdclinique.clients', (err,rows)=>{
    if (err) throw err;
    console.log(rows)
    const nom = 'list';
  
    res.render('index',{nom,
        patient:rows
        
    });
})
})
app.get('/index',(req,res) =>{
con.query('SELECT * FROM bbdclinique.rdv', (err,rows)=>{
  if (err) throw err;
  console.log(rows)
  const nom = 'Rendez-vous'
  res.render('index2',{nom,
    rdv:rows      
  });
})
})   
//afficher 
  app.get('/form',(req,res)=>{
res.render('form')
  })
//ajouter
app.post('/add',(req,res) =>{


    idc = req.body.idc
    nom = req.body.nom
    prenom = req.body.prenom
    age = req.body.age
    sexe = req.body.sexe
    telephone = req.body.numero_de_telephone
    naissance = req.body.date_naissance
    con.query(
        "INSERT INTO bbdclinique.clients (idc, nom, prenom, age, sexe,numero_de_telephone, date_naissance) VALUES (?,?,?,?,?,?,?)",
        [idc, nom, prenom, age, sexe, telephone, naissance],
        (err, result) => {
        if (err) throw err;
        console.log("Ajouté avec succès !");
        res.redirect("/index");
        }
    );
    
}) 
app.get('/form',(req,res)=>{
  res.render('form')
    })
app.post('/add',(req,res) =>{
      idc = req.body.idc
       heure = req.body.Heure
       salle = req.body.Salle
        date = req.body.Date
        con.query(
        "INSERT INTO bbdclinique.rdv (idc, Heure, Salle, Date) VALUES (?,?,?,?)",
       [idc, heure, salle, date],
       (err, result) => {
       if (err) throw err;
       console.log("Ajouté avec succès !");
       res.redirect("/index");
       }
   );
  
 }) 
// POUR SUPPRIMER UN ENREGISTREMENT
app.get('/delete',(req,res)=>{
    res.render('delete')
})
app.post('/del', (req, res) => {
    const idc = req.body.idc;
  
    con.query(
      `DELETE FROM clients WHERE idc=${idc}`,
      (error, results) => {
        if (error) {
          return res.send(error);
        }
  
        res.redirect('/index');
      }
    );
  });
  



//     con.query(
//         "DELETE INTO bbdclinique.clients (idc) VALUES (?)",
//         [idc],
//         (err, result) => {
//         if (err) throw err;
//         console.log("Supprimer avec succès !");
//         res.redirect("/index");
//         }
//     );

// })       
app.get('/modifier',(req,res)=>{
  res.render('modifier')
})
app.post('/update', (req, res) => {
    const idc = req.body.idc;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const age = req.body.age;
    const sexe = req.body.sexe;
    const telephone = req.body.numero_de_telephone;
    const naissance = req.body.date_naissance;
    
    con.query(
      `UPDATE clients SET nom=?, prenom=?, age=?, sexe=?, numero_de_telephone=?, date_naissance=? WHERE idc=?`,
      [nom, prenom, age, sexe, telephone, naissance, idc],
      (error, results) => {
        if (error) {
          return res.send(error);
        }
  
        res.redirect('/index');
      }
    );
  });
  