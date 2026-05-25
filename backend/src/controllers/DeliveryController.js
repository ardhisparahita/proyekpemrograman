exports.createDelivery = async (req, res) => {
  res.json({
    message: 'Delivery Order Created',
  });
};

exports.uploadPOD = async (req, res) => {
  res.json({
    message: 'POD Uploaded',
  });
};