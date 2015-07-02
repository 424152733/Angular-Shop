var mongoose = require('mongoose');

var GoodSchema = new mongoose.Schema({
	typename : String,
	typeid : String,
	goodsid : String,
	bcgimg : String,
	description : String,
	label : String,
	price : String,
	postage : String,
	stylelist : {
		fzsize:Array,
		name:String
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

GoodSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
})

GoodSchema.statics={
	findAll:function(callback){
		return this.find({}).sort('meta.updateAt').exec(callback)
	},
	findById:function(id,callback){
		return this.find({_id:id}).exec(callback)
	}
}

module.exports = GoodSchema;