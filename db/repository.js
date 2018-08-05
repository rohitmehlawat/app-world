var db=require('../db/db');
var Q = require("q");
exports.saveMessage=(data)=>{
    var defer = Q.defer();
    db.save(data).then((result)=>{
        defer.resolve(result);
    }).catch((err)=>{
        defer.reject();
    });
    return defer.promise;

};
