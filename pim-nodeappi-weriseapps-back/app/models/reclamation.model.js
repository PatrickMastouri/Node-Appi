module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        subject: { type: String },
        description: { type: String },
        etat: { type: String },
        UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required :true},
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Reclamation = mongoose.model("Reclamation", schema);
    return Reclamation;
  };