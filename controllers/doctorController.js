const Doctor = require('../models/doctors');
const Patient = require('../models/patients');
const crypto = require('crypto');
const jwt  = require('jsonwebtoken');

 function secretPassword(password){
 password = crypto.randomBytes(20).toString('hex')
    return password;
}

module.exports.doctorSignup = async function(req,res){
    try {
            const user = await Doctor.create({                
                username:req.body.username,
                password:req.body.password
              });
              console.log(user);
              return res.status(200).json({
                success:true,
                  massege:'Successfull User create',
                  data:user
              });
       
    } catch (err) {
        console.log('Error in sign-up',err);
        return res.status(200).json({
            success:false,
            message:'Inter Server Error'
        })
    }
}
module.exports.doctorLogin = async function(req,res){
    try {
        const user = await Doctor.findOne({username:req.body.username});
        if(user){
            const token = jwt.sign(user.toJSON(),'Hospital',{expiresIn:'10000'});
            return res.status(200).json({
                success:true,
                massege:'User find',
                token
            });
        }else{
            return res.status(400).json({
                success:false,
                massege:'Name and password do not match and Invalid'
            });
        }
    } catch (err) {
        console.log('Error',err);
        return res.status(500).json({
            success:false,
            message:'Inter Server Error'
        })
    }
}

module.exports.patientRegister = async function(req,res){
    try {
        console.log(req);
        const patient = await Patient.findOne({phone:req.body.phone});
        // req.body.doctor = "6526c50cecf245bf49ac9d35";
        if(patient){
            return res.status(200).json({
                success:true,
                message:"Patient Already exists",
              })
        }
         await Patient.create(req.body);
        console.log(patient);
      return res.status(200).json({
        success:true,
        message:"Successfull Create Patient",
        data:patient
      })

    } catch (err) {
        console.log('Error',err);
        return res.status(500).json({
            success:false,
            message:'Inter Server Error'
        })
    }
}

module.exports.createReport =  async function(req,res){
    try {
      const patient = await Patient.findById(req.params.id);

      req.body.date = Date.now();

      patient.reports.push(req.body);
      patient.save();
      
        console.log(patient);
      return res.status(200).json({
        success:true,
        message:"Report created by doctor Successfully",
        data:patient
      })

    } catch (err) {
        console.log('Error',err);
        return res.status(500).json({
            success:false,
            message:'Inter Server Error'
        });
    }
}

module.exports.allReports = async function(req,res){
    try {
        const patient = await Patient.findById(req.params.id);

        console.log(patient);
      return res.status(200).json({
        success:true,
        message:"Report created by doctor Successfully",
        reports:patient.reports
      })

    } catch (err) {
        console.log('Error',err);
        return res.status(500).json({
            success:false,
            message:'Inter Server Error'
        });
    }
}
module.exports.AllReports = async function(req,res){
    try {
        const patient = await Patient.find({reports:{$elemMatch:{status:req.params.status}}});    
        console.log(patient);
      return res.status(200).json({
        success:true,
        message:"Report created by doctor Successfully",
        data:patient
      })

    } catch (err) {
        console.log('Error',err);
        return res.status(500).json({
            success:false,
            message:'Inter Server Error'
        });
    }
}

