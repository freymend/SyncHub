import express from 'express';
var router = express.Router();

// find all the reviews from mongodb for the show that is requested
router.get('/', async(req, res) => {
    try {
        let show = req.query.showID
        let showReivews = await req.models.Review.find({show: show})
        res.json(showReivews)
    } catch(error) {
        res.status(500).json({"status": "error", "error": error})
    }
})

// This router will add new reviews to the mongodb reviews schema
router.post('/', async(req, res) => {
    console.log("trying to post comments to mongodb")
    try{
        const newReview = req.models.Review({
            userID: req.session.account.username,
            showID: req.body.showID,
            username: req.body.username,
            showName: req.body.showName,
            review: req.body.review,
        })
        await newReview.save()
        console.log("added new review")
        res.json({"status":"success"})
    } catch(error) {
        res.status(500).send({"status": "error", "error": error}) 
    }
})

export default router;
