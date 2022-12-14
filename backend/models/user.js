const mongoose=require('mongoose');
const crypto =require('crypto');
const { v1: uuidv1 } = require('uuid');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  
   name:{
        type:String,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        trim:true
    },
    
    phoneno:{
        type:Number,
        maxlength:12,

    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    patron:{
        name_of_company:{
            type:String,
            trim:true,
        default:""
        },
        pname:{
            type:String,
            trim:true,
        default:""
        },
        gender:{
            type:String,
            trim:true,
        default:""
        },
        location:{
            type:String,
            trim:true,
        default:""
        },
        pno:{
            type:Number,
            maxlength:10
        },
        emailid:{
            type:String,
            trim:true,
        default:""
        },
        youtube_link:{
            type:String,
            trim:true,
        default:""
        },
        instagram_link:{
            type:String,
            trim:true,
        default:""
        },
        facebook_link:{
            type:String,
            trim:true,
        default:""
        },
        nature_of_offering:{
            type:String,
            trim:true,
        default:""
        },
        selector:{
            type:String,
            trim:true,
        default:""
        },
        profession:{
            type:String,
            trim:true,
        default:""
        },
        type_of_art:{
            type:String,
            trim:true,
        default:""
        },
        category:{
            type:String,
            trim:true,
        default:""
        }

    },
    artist:{
        fname:{
            type:String,
            trim:true,
        default:"",
        },
        lname:{
            type:String,
            trim:true,
        default:""
        },
        pno:{
            type:Number,
            maxlength:10,
        default:0
        },
        emailid:{
            type:String,
            trim:true,
        default:0
        },age:{
            type:Number,
        default:0
        },
        gender:{
            type:String,
            trim:true,
        default:""
        },caste:{
            type:"String",
            trim:true,
        default:""
        },
        religion:{
            type:String,
            trim:true,
        default:""
        },
        height:{
            type:Number,
        default:0
        },weight:{
            type:Number,
        default:0
        },language:{
            type:String,
        default:"",
            trim:true
        },education:{
            type:String,
            trim:true,
        default:""
        },
        skils:{
            type:Array,
        default:[]
        },experince:{
            type:String,
            trim:true,
        default:""
        },url:{
            type:String,
        default:""
        },photo:{
            
             data:Buffer,
        contentType:String,     
       }
    },
    role:{
        type:Number,
        default:0
    },isRegistered:{
        type:Boolean,
    default:false
    }
    //role 0 for artists
    //role 1 for patron

},{timestamps:true})

userSchema.virtual("password")
.set(function(password){
    this._password=password;
    this.salt=uuidv1();
    this.encry_password=this.securePassword(password);
})
.get(function(){
    return this._password;
})

userSchema.methods={

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },

    securePassword : function(plainpassword){
        if(!plainpassword){
            return "";
        }
        try{
            
            return crypto.createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest("hex");

        }catch{
            return "";
        }
    }
}

module.exports=mongoose.model("User",userSchema)