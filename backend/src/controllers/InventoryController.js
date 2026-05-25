exports.getInventory = async (req, res) => {
  res.json({
    message: 'Inventory Data',
  });
};

exports.createInventory = async (req, res) => {
  res.json({
    message: 'Inventory Created',
  });
};