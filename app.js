// api key
// d1060e24f497ca62e8f2df1190e9be26-us12

// list id
// 9b6104c9b2

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { response } = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/9b6104c9b2"

  const option = {
    method: "POST",
    auth: "aldi12:d1060e24f497ca62e8f2df1190e9be26-us12"
  }

  const request = https.request(url, option, (response) => {
    if(response.statusCode == 200) {
      res.sendFile(__dirname + '/success.html')
    } else {
      res.sendFile(__dirname + '/failure.html')
    }

    // response.on('data', (data) => {
    //   console.log(JSON.parse(data));
    // })
  });

  request.write(jsonData);
  request.end();
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000")
})