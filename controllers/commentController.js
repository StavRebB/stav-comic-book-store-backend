const Comment = require('../models/commentModel')

exports.findAllComments = async (req,res) => {
    try {
        let comments = await Comment.find({})
        res.setHeader('Content-Range', `${comments.length}`)
        res.json(comments)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneComment = async function (req, res) {
    try {
        let comments = await Product.findById(req.params.id)
        res.setHeader('Content-Range', `${comments.length}`)
        return res.json(comments)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findCommentsByPost = async function (req, res) {
    try {
        let comment = await Comment.find({ PostId: req.params.postid }).exec()
        if(comment === null) {
            return res.status(404).json({ message: "comment does not exist!" })
        } else {
            return res.json(comment)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addComment = async function (req, res) {
    try {
    
        let CommentData = {
            id: "null",
            MemberId: req.body.memberId,
            DateOfWriting: req.body.dateOfWriting || new Date(),
            PostId: req.body.postId,
            Content: req.body.content,
        }

        try {
            let newComment = await Comment.create(CommentData)
            newComment.id = newComment._id
            let updatedComment = await newComment.save()
            return res.status(201).json(updatedComment)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateComment = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        if(comment === null) {
            return res.status(404).json({ message: "comment does not exist!" })
        } else {
            if(req.body.MemberId !== null) {
                Comment.MemberId = req.body.MemberId
            }
            if(req.body.PostId !== null) {
                Comment.PostId = req.body.PostId
            }
            if(req.body.DateOfWriting !== null) {
                Comment.DateOfWriting = req.body.DateOfWriting
            }
            if(req.body.Content !== null) {
                Comment.Content = req.body.Content
            }
            try {
                let updatedComment = await comment.save()
                return res.json(updatedComment)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteComment = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        if(comment === null) {
            return res.status(404).json({ message: "comment does not exist!" })
        } else {
            let commentToDel = comment
            try {
                await commentToDel.remove()  
                return res.json({ message: "Deleted Comment" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};