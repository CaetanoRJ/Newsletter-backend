var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("public")); //faz o node carregar as pastas que estão no public

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var userEmail = req.body.email;

  var data = {
    members: [{
      email_address: userEmail,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data); //transforma o data que é um javascript objeto para JSON

  console.log(firstName, lastName, userEmail);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/becc08b487",
    method: "POST",
    auth: {
      user: "Pedro",
      pass: "580b024f7aea9542250feacc3cc9f900-us4"
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html")

    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      }

      console.log(response.statusCode);

    }
  });
  //console.log(error), console.log(response.statusCode)
});



app.post("/failure", function (req, res) {
  res.redirect("/")
});


app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000.");
});

//580b024f7aea9542250feacc3cc9f900-us4

//id list
//becc08b487