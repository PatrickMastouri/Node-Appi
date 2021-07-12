module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nom: { type: String },
      cost: { type: String },
      datecreation: { type: Date },
      paymentmethode: { type: String },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
      project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },

    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Payment = mongoose.model("Payment", schema);
  return Payment;
};