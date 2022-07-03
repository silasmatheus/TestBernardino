import { mongoose } from "mongoose"

mongoose.connect('mongodb://localhost:27017/noderest')
mongoose.Promise = global.Promise;

export default mongoose;