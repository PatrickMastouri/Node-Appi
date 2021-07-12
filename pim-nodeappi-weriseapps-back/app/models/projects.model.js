module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: { type: String },
      description: { type: String },
      payed: { type: Number },
      visibility: { type: Number },
      port: { type: Number },
      image: { type: String },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      groupe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Groupe', required: false }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Project = mongoose.model("Project", schema);
  return Project;
};