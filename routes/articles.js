const express = require('express');
const router = express.Router();
const article = require('../models/articles')


//Add articles
router.get("/add", (req, res) => res.render('add'))

router.post('/add', (req, res) => {
    // req.checkBody('title', "Title is required").notEmpty();
    // req.checkBody('author', "Author is required").notEmpty();
    // req.checkBody('body', "Body is required").notEmpty();
    article.create(req.body, (err, post)=> {
        if(err){
            console.error(err)
        } else{
            req.flash("success", "New Post Added")
            res.redirect('/')
        }
    }) 
})

//Show individual post
router.get('/:id', (req, res) => {
    article.findById(req.params.id, (err, post) =>{
        if(err){
            console.error(err)
        } else{
            
            res.render('show', {article: post})
        }
    })
})

//edit route
router.get('/:id/edit', (req, res) => {
    article.findById(req.params.id, (err, post) =>{
        if(err){
            console.error(err)
        } else{
            res.render('edit', {article: post})
        }
    })
})

//update route
router.put('/:id/edit', (req, res) => {
    article.findByIdAndUpdate(req.params.id, req.body, (err, post) =>{
        if(err){
            console.error(err)
        } else{
            req.flash("success", "Post Editted")
            res.redirect('/'+req.params.id)
        }
    })
})

//Delete Route
router.delete('/:id/delete', (req, res) => {
    article.findByIdAndRemove(req.params.id, (err, post) =>{
        if(err){
            console.error(err)
        } else{
            req.flash("danger", "Post Deleted")
            res.redirect('/')
        }
    })
})


module.exports = router