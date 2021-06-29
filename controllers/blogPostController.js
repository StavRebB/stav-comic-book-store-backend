const BlogPost = require('../models/blogPostModel')

const fs = require('fs')
const path = require('path')

const addPictures = (mainImage, pictures) => {

    for (let picture of pictures) {

        mainImage = picture.title

        const image = picture.src
        const match = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const buffer = Buffer.from(match[2], 'base64')

        fs.writeFile(path.join('tmp', 'uploads', 'photoSrc', 'posts', picture.title), buffer , { flag: 'wx' }, (err) => {
            if(err)
                console.log(err)
        })
    }

    return mainImage
}

exports.findAllBlogPosts = async (req,res) => {
    try {
        let blogPosts = await BlogPost.find({})
        res.setHeader('Content-Range', `${blogPosts.length}`)
        res.json(blogPosts)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneBlogPost = async function (req, res) {
    try {
        let blogPost = await BlogPost.findById(req.params.id)
        if(blogPost === null) {
            return res.status(404).json({ message: "blogPost does not exist!" })
        } else {
            return res.json(blogPost)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addBlogPost = async function (req, res) {
    try {

        let mainImage;
    
        let BlogPostData = {
            id: "null",
            MemberId: req.body.memberId,
            DateOfWriting: req.body.dateOfWriting || new Date.now(),
            Title: req.body.title,
            Content: req.body.content,
            Video: req.body.video || null
        }

        BlogPostData.Image = addPictures(mainImage, req.body.pictures)

        try {
            let newBlogPost = await BlogPost.create(BlogPostData)
            newBlogPost.id = newBlogPost._id
            let updatedBlogPost = await newBlogPost.save()
            return res.status(201).json(updatedBlogPost)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateBlogPost = async function (req, res) {
    try {
        let blogPost = await BlogPost.findById(req.params.id)
        if(blogPost === null) {
            return res.status(404).json({ message: "blog post does not exist!" })
        } else {
            if(req.body.MemberId !== null) {
                blogPost.MemberId = req.body.MemberId
            }
            if(req.body.DateOfWriting !== null) {
                blogPost.DateOfWriting = req.body.DateOfWriting
            }
            if(req.body.Title !== null) {
                blogPost.Title = req.body.Title
            }
            if(req.body.Content !== null) {
                blogPost.Content = req.body.Content
            }
            if(req.body.Video !== null) {
                blogPost.Video = req.body.Video
            }
            // if(req.file) {
            //     let photo = req.file ? req.file.filename.split('/')[1] : null
            //     blogPost.Image = photo
            // }

            try {
                let updatedBlogPost = await blogPost.save()
                return res.json(updatedBlogPost)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteBlogPost = async function (req, res) {
    try {
        let blogPost = await BlogPost.findById(req.params.id)
        if(blogPost === null) {
            return res.status(404).json({ message: "blog post does not exist!" })
        } else {
            let blogPostToDel = blogPost
            try {
                await blogPostToDel.remove()  
                return res.json({ message: "Deleted Blog Post" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};