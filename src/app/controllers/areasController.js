import express from "express";
import Area from "../models/Area.js"
import authMiddleware from "../middlewares/auth.js"

const router = express.Router();

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try{

        const areas = await Area.find()
        return res.status(200).send(areas)

    } catch (err) {
        return res.status(400).send({error: "Error on gets areas"})
    }
})

router.get('/:areaId', async (req, res) => {
    res.send({user: req.userId})
})

router.post('/', async (req, res) => {
    try{

        const area = await Area.create(req.body)
        return res.status(200).send(area)
        
    } catch (err) {
        return res.status(400).send({error: err})
    }
})

router.put('/:areaId', async (req, res) => {
    res.send({user: req.userId})
})

router.delete('/:areaId', async (req, res) => {
    res.send({user: req.userId})
})

export default (app) => app.use('/areas', router)