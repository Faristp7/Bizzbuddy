import userModel from '../models/userModel.js'

export async function signUp(req, res) {
  try {
    const { username, email, phone, password } = req.body;
    if(username === '' || email === '' || password === ''){
        return res.status(400).json({message :'fill all the fields'})
    }
    else if(!/^\d{10}$/.test(phone)){
        return res.json({message:'phone number must be 10 digits'})
    }
    else{
        const alreadyExistUser = userModel.findOne({username})
        if(alreadyExistUser){
          return res.json({message : 'username already taken' ,error : true})
        }  
        else{

            // const userSchema = new userModel({
            //     username,
            //     email,
            //     phone,
            //     password
            // })
            // const savedStatus =  await userSchema.save()
        }
    }
  } catch (error) {
    console.log(error);
  }
}
