var MongoClient=require('mongodb').MongoClient;
const url="mongodb+srv://rohit:951126138810@cluster0-bgahb.mongodb.net/hospital_db?retryWrites=true";
var Q = require("q");
var dbClient;
MongoClient.connect(url,function(err, client){
    console.log('connected');
    if(err){
        dbClient=client;
    }
    else{
        console.log('connected');
        dbClient=client;
    }
});
exports.save=(data)=>{
    var defer=Q.defer();
    var message = dbClient.db("hospital_db").collection("message");
    message.findOne(
        {"docId":data.docId}
        ).then(result=>{
        if(result!=null){
            message.updateOne(
                {"docId":data.docId},
                {
                    $set: data
                })
                .then(res=>{
                    defer.resolve(res);
                })
                .catch(err=>{
                    defer.reject();
                })
        }
        else{
            message.insertOne(
                data)
                .then(res=>{
                    defer.resolve(res);
                })
                .catch(err=>{
                    defer.reject();
                })
        }

    }).catch(err=>{
        defer.reject();
    })

    return defer.promise;


};

exports.delete=(data)=>{
    var defer=Q.defer();
    var message = dbClient.db("hospital_db").collection("message");
    message.deleteOne(
        {"docId":data.docId}
    ).then(result=>{
        defer.resolve(result);

    }).catch(err=>{
        defer.reject();
    })

    return defer.promise;


};
