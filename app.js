var mongoose = require('mongoose');
 
// Make a connection 
mongoose.connect('mongodb://localhost:27017/fruitsDB');
 
// Get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
     
    // Define Schema
    var fruitsSchema = mongoose.Schema({
      name: {
        type:  String,
        required: [true, "Please check, no name entered"]
      },
      calification: {
        type:  Number,
        min: 1,
        max: 10
      },
      review: String
    });
 

 
    // Compile schema to model
    var Fruit = mongoose.model('Fruit', fruitsSchema);
 
    // A document instance
    var newFruit = new Fruit({
        name: "Orange",
        calification: 10, 
        review: "Best fruit"
    });


    var personSchema = mongoose.Schema({
        name: String,
        age: Number,
        favoriteFruit : fruitsSchema
    });
    

    var Person = mongoose.model("Person", personSchema);

    var john = new Person({
        name: "John",
        age: 37
    });
    var Amy = new Person({
        name: "Amy",
        age: 12,
        favoriteFruit: newFruit
    });
    //Amy.save();
    // Person.updateOne({name: "John"}, {favoriteFruit: newFruit}, function(err){
    // });

    Fruit.find(function(err, fruits){
        if(err){
            console.log(err);
        }
        else{
            mongoose.connection.close();
            fruits.forEach(function(fruit){
                console.log(fruit.name);
            });
            
        }
    });
    


    // const kiwi = {
    //     name: "Kiwi",
    //     calification: 8,
    //     review: "Cool kiwi"
    // }
    // var Kiwi = new Fruit(kiwi);

    // const orange = new Fruit({
    //     name: "Orange",
    //     calification: 10,
    //     review: "Oranges"
    // });
    

    // Kiwi.save(function(err){
    //     console.log("Kiwi saved");
    // });
    // Fruit.insertMany([orange], function(err){
    //     console.log("saved fruits to fruitDB");
    // });

    // newPerson.save(function(err){
    //     console.log(john.name + " saved to person collection");
    // });
    // save model to database
    // newFruit.save(function (err) {
    //   if (err) return console.error(err);
    //   console.log(fruit.name + " saved to fruit collection.");
    // });
     

});
