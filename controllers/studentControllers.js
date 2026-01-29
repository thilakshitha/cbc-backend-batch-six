import Student from "../models/student.js"

export default function getStudents(req,res){
    
 Student.find().then((students)=>{
    res.json(students)
 }).catch(()=>{
    res.json({
        message:"failed to fetch students"
    })
 })
}

export function postStudents(req,res){
    console.log(req.body)

    console.log(req.user)

    if(req.user==null){
        res.status(403).json({
            message:"please login as a admin"
        })
        return
    }
    if(req.user.role != "admin"){
        res.json({
            message:"login as admin too"
        })
    }
    
    
    const student = new Student(
        {
            name : req.body.name,
            age : req.body.age,
            email : req.body.email
        }
    )
    student.save().then(()=>{
        res.json(
            {
                message : "student saved succesfully"
            }
        )
    }).catch(()=>{
        console.log("failed to save")
    })
}

export function putStudents(){

}