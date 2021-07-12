module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nom:        { type: String,  required: true },
        prenom:     { type: String,  required: false },
        username:   { type: String,  unique: true, required: true },
        password:   { type: String,  required: true },
        mail:       { type: String,  unique: true, required: true },
        gender:     { type: String,  required: false },
        daten:      { type: Date,    default: Date.now },
        adress:     { type: String,  required: false },
        city:       { type: String,  required: false },
        postalcode: { type: String,  required: false },
        image :     { type: String,},
        phone:      { type: String,  required: false },
        role:       { type: String,  required: false },
        active:     { type: Number,  required: false },
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("User", schema);
    return User;
  };