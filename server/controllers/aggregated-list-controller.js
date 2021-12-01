const AggregatedTop5List = require('../models/aggregated-list-model');

createAggregatedTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Aggregated List',
        })
    }

    const aggregatedTop5List = new AggregatedTop5List(body);
    console.log("creating aggregated top5List: " + JSON.stringify(aggregatedTop5List));
    if (!aggregatedTop5List) {
        return res.status(400).json({ success: false, error: err })
    }

    aggregatedTop5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                aggregatedTop5List: aggregatedTop5List,
                message: 'Aggregated List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Aggregated List Not Created!'
            })
        })
}

updateAggregatedTop5List = async (req, res) => {
    const body = req.body
    console.log("updateAggregatedTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    AggregatedTop5List.findOne({ _id: req.params.id }, (err, aggregatedTop5List) => {
        console.log("aggregatedTop5List found: " + JSON.stringify(aggregatedTop5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Aggregated List not found!',
            })
        }

        aggregatedTop5List.name = body.name
        aggregatedTop5List.items = body.items
        aggregatedTop5List.likes = body.likes
        aggregatedTop5List.dislikes = body.dislikes
        aggregatedTop5List.views = body.views
        aggregatedTop5List.comments = body.comments
        aggregatedTop5List.updated = body.updated
        aggregatedTop5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: aggregatedTop5List._id,
                    message: 'Aggregated List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Aggregated List not updated!',
                })
            })
    })
}

deleteAggregatedTop5List = async (req, res) => {
    AggregatedTop5List.findById({ _id: req.params.id }, (err, aggregatedTop5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Aggregated List not found!',
            })
        }
        AggregatedTop5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: aggregatedTop5List })
        }).catch(err => console.log(err))
    })
}

getAggregatedTop5ListById = async (req, res) => {
    await AggregatedTop5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, aggregatedTop5List: list })
    }).catch(err => console.log(err))
}
getAggregatedTop5ListPairs = async (req, res) => {
    await AggregatedTop5List.find({ }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name,
                    comments: list.comments,
                    items: list.items,
                    views: list.views,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    updated: list.updated
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, listInfo: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createAggregatedTop5List,
    updateAggregatedTop5List,
    deleteAggregatedTop5List,
    getAggregatedTop5ListPairs,
    getAggregatedTop5ListById
}