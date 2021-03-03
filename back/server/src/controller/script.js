const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const { createScript, updateScript } = require('@script/script_functions')

module.exports = function(app) {
    app.get('/all', async(req, res) => {
        try {
            let scripts = await Script.find().select('name img')
            return res.status(200).json({ scripts: scripts })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.get('/information', async(req, res) => {
        try {
            let script = await Script.findById(req.query.id)
            return res.status(200).json({ script: script })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.post('/create', async(req, res) => {
        try {
            let script_id = await createScript(req)
            if (script_id) {
                return res.status(200).json({ script: script_id })
            } else {
                return res.status(500).json({ error: 'cannot create script' })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })

    app.get('/everything', async(req, res) => {
        try {
            let scripts = await Script.find().populate('action reaction')
            return res.status(200).json({ scripts: scripts })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })

    app.get('/activate', async(req, res) => {
        try {
            let script = await Script.findById(req.query.id)
            script.activated = req.query.activated;
            await script.save().then().catch()
            return res.status(200).json({ script: script })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })

    app.put('/update', async(req, res) => {
        try {
            let done = await updateScript(req.body.script._id, req.body.script)
            if (done) {
                return res.status(200)
            } else {
                return res.status(300)
            }
        } catch (e) {
            console.log(e)
            return res.status(401)
        }
    })

    app.put('/delete', async(req, res) => {
            try {
                await Script.deleteOne({ _id: req.body.id })
                return res.status(200)
            } catch (e) {
                console.log(e)
                return res.status(401)
            }
        })
        // app.post('/add', async(req, res) => {
        //     try {
        //         let script = await new Script({})
        //         return res.status(200).json({ script: script })
        //     } catch (e) {
        //         return res.status(500).json({ error: e })
        //     }
        // })
}