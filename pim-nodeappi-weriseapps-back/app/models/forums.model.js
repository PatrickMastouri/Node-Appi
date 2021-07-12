module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        subject: { type: String },
        description: { type: String },
        tag: { type: String },
        interested: { type: Number },
        UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required :true},
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Forum = mongoose.model("Forum", schema);
    return Forum;
  };