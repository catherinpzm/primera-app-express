const express = require('express');
const app = express();
const port = 3000;




var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on("error", function(e) { console.error(e); });

const schema = mongoose.Schema({
  date: Date,
  name: { type: String, default: "Anónimo" }
});

const Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {
  const nombre = req.query.name;
 
  Visitor.create(
    {
      name: nombre,
      date: new Date()
    }, (error) => {
      if (error){
        return;
      }
      res.send('<h1>El visitante fue almacenado con éxito</h1>');
    }
  )
});


app.listen(3000);