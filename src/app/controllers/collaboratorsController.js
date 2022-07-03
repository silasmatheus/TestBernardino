import express from "express";
import Collaborator from "../models/Collaborator.js"
import authConfig from "../../config/config.json" assert {type: 'json'}
import authMiddleware from "../middlewares/auth.js"

const router = express.Router();

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try{

        const collaborators = await Collaborator.find().populate('area')
        return res.status(200).send(collaborators)

    } catch (err) {
        return res.status(400).send({error: "Error on gets collaborators"})
    }
})

router.get('/:collaboratorId', async (req, res) => {
    try{

        const collaborator = await Collaborator.findById(req.params.collaboratorId).populate('area')
        return res.status(200).send(collaborator)

    } catch (err) {
        return res.status(400).send({error: "Error on gets collaborator"})
    }
})

router.post('/', async (req, res) => {
    try{

        const collaborators = await Collaborator.create(req.body)
        return res.status(200).send(collaborators)
        
    } catch (err) {
        return res.status(400).send({error: err})
    }
})

router.put('/:collaboratorId', async (req, res) => {
    try{

        const collaborator = await Collaborator
            .findByIdAndUpdate(
                req.params.collaboratorId, 
                req.body, 
                {new: true})
            .populate('area')
            
        return res.status(200).send(collaborator)

    } catch (err) {
        return res.status(400).send({error: "Error on update collaborator"})
    }
})

router.delete('/:collaboratorId', async (req, res) => {
    try{

        const collaborator = await Collaborator.findByIdAndRemove(req.params.collaboratorId)
        return res.status(200).send()

    } catch (err) {
        return res.status(400).send({error: "Error on remove collaborator"})
    }
})

export default (app) => app.use('/collaborators', router)