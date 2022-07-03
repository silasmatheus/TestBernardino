import express from "express";
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "./config/swagger.json" assert {type: 'json'}

const app = express();

app.use(bodyParser.json())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(bodyParser.urlencoded({extended : false}))

import authController from "./app/controllers/authController.js"
authController(app)

import collaborators from "./app/controllers/collaboratorsController.js"
collaborators(app)

import areas from "./app/controllers/areasController.js"
areas(app)


app.get('/v1/', (req, res) => {
    res.send('ok')
})

app.listen(3000)


