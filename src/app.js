const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require(path.join(__dirname, "./utils/geocode"))
const forcast = require(path.join(__dirname, "./utils/forcast"))

const app = express()

const port = process.env.PORT || 3000
//define paths for Express config m n vh
const publicFolder = path.join(__dirname, "../public")

//setup handle bar engine and view location
app.set("view engine", "hbs") //seting view engine so that it can use hbs for rendering
app.set("views", path.join(__dirname, "../templates/views"))

//set up static directory to server
app.use(express.static(publicFolder)) //setting static way to set up public folder as root then all file will be looked from public

hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ravi Kumar",
  })
})
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ravi Kumar",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Get Help",
    name: "Ravi Kumar",
    contact: "asutoshravi1995@gmail.com",
  })
})

app.get("/weather", (req, res) => {
  location = req.query.address
  if (!location) {
    return res.send({ error: "Please provide a search query value" })
  }
  geocode(location, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err })
    }
    forcast(latitude, longitude, (err, forcastData) => {
      if (!err) {
        res.send({
          location,
          forcast: forcastData,
        })
      } else {
        res.send({ error: err })
      }
    })
  })
})

app.get("/help/*", (req, res) => {
  res.render("page404", {
    title: "404 Page",
    name: "Ravi Kumar",
    msg: "Help Article not found",
  })
})

app.get("*", (req, res) => {
  res.render("page404", {
    title: "404 Page",
    name: "Ravi Kumar",
    msg: "Page not found",
  })
})

app.listen(port, () => {
  console.log("Server running at 3000")
})
