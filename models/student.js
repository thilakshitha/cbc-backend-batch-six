import mongoose from "mongoose"
const studentSchema = new mongoose.Schema(
    {
        name : String,
        age : Number,
        email : String
    }
)
//methana "student kiyana eka singular thiyanna collection eka hadeddi agata s ekathu wela plural wenawa"
const Student = mongoose.model("student",studentSchema)

export default Student;