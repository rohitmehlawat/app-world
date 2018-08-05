const message= {
    "id": "/message",
    "type": "object",
    "properties": {
        "message": {"type": "string"},
        "docId": {"type": "string"},
        "mFlag": {"type": "string"}
    },
    "required": ['message', 'docId', 'mFlag']
};

module.exports=message;

