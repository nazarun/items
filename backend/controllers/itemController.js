var Item = require('../models/item');

//Get items
exports.items_list = function(req, res, next){

	var perPage = 4;
	var page = req.params.page || 1;

	Item.find().limit(perPage).skip(perPage * (page-1)).sort({
        name: 'asc'
    })
    .exec(function(err, events) {
        Item.count().exec(function(err, count) {
        	var data = {
        		events: events,
                page: page,
                pages: count / perPage
            }
        	res.status(200).send(data);            
        });
    })	
};

//Edit particular item
exports.item_edit_get = function(req, res, next){
	Item.findOne({_id: req.params.id}, function(err, data){
		if(err){ return next(err); }
		res.status(200).send(data);		
	});
};

//Post edited item
exports.item_edit_post = function(req, res, next){
	req.checkBody('name', 'Name field is required').notEmpty();
  	req.checkBody('type', 'Title field is required').notEmpty();
  	var errors = req.validationErrors();

  	if(errors){   
    	return res.status(403).send({error: errors});    
  	}else{
  		var item = new Item({
			_id: req.params.id,
			name: req.body.name,
			type: req.body.type,
		});
		Item.findByIdAndUpdate(req.params.id, item, {}, function(err, theitem){
			if(err){ return next(err); }
			res.status(200).send("The item was edited"); 
		});
  	}	
};






//Delete item
exports.item_delete = function(req, res, next){
	Item.findOne({_id: req.params.id}, function(err, data){
		if(err){ return next(err); }
		data.remove();
		res.sendStatus(200);
	});
};

//Statistic
exports.items_statistic = function(req, res, next){
	var perPage = 4;
	var page = req.params.page || 1;

	
	Item.find({}, 'type ')
		.limit(perPage)
		.skip(perPage * (page-1))
		.sort({
        	name: 'asc'
    	})	 
    	.exec(function(err, events) {
        	Item.count().exec(function(err, count) {
        		var data = {
	        		events: events,
	                page: page,
	                pages: count / perPage
            	}
        	res.status(200).send(data);            
        	});
    	})	

 	// results.forEach(function(doc){
		// 	Item.find({type: doc.type}).count().exec(function(err, count){
		// 		var data = {				
		// 			type: doc.type,
		// 			count: count,
		// 		};
		// 		console.log(data);
		// 		res.send(data);
		// 	})
		// })
};




//Post new item
exports.item_post = function(req, res, next){
	req.checkBody('name', 'Name field is required').notEmpty();
  	req.checkBody('type', 'Title field is required').notEmpty();
  	var errors = req.validationErrors();

  	if(errors){   
    	return res.status(403).send({error: errors});    
  	}else{
  		var item = new Item({
			name: req.body.name,
			type: req.body.type,		
		});

		item.save(function(err){
			if(err){ return next(err); }
			res.status(200).send(item);
			console.log("New item added successfully");
		});
  	}	
};

