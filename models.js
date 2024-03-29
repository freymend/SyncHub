import mongoose from "mongoose";

console.log("Connecting to MongoDB...");
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@synchubcluster.gjgsg7v.mongodb.net/?retryWrites=true&w=majority`);
console.log("Connected to MongoDB");

const models = {};

//add show id to be the same as imdb api id
const showSchema = new mongoose.Schema({
    title: String,
    img: String,
    showId: String
});

models.show = mongoose.model("show", showSchema);

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    picture: Buffer,
});

models.user = mongoose.model("user", userSchema);

const reviewSchema = new mongoose.Schema({
    username: String,
    showId: String,
    review: String,
    rating: Number,
    season: Number,
    episode: Number,
})

models.review = mongoose.model("review", reviewSchema);
export default models;
