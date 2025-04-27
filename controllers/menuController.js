const Menu = require('../models/Menu');

// GET today's menu
exports.getTodayMenu = async (req, res) => {
  try {
    // see if there's a Menu doc for "today" - you can define your logic here
    const today = new Date().toDateString();
    let menu = await Menu.findOne({ date: today });
    // if none found, create a blank for that date
    if (!menu) {
      menu = new Menu({ date: today, items: [] });
      await menu.save();
    }
    return res.status(200).json({ menuItems: menu.items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// POST add an item to today's menu
exports.addMenuItem = async (req, res) => {
  try {
    const { item } = req.body;
    if (!item) {
      return res.status(400).json({ error: 'Item is required' });
    }
    const today = new Date().toDateString();
    let menu = await Menu.findOne({ date: today });
    if (!menu) {
      menu = new Menu({ date: today, items: [item] });
    } else {
      menu.items.push(item);
    }
    await menu.save();
    return res.status(200).json({ message: 'Item added successfully', menuItems: menu.items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// POST remove an item from today's menu
exports.removeMenuItem = async (req, res) => {
  try {
    const { item } = req.body;
    const today = new Date().toDateString();
    const menu = await Menu.findOne({ date: today });
    if (!menu) {
      return res.status(404).json({ error: 'No menu found for today' });
    }
    // remove item if it exists
    menu.items = menu.items.filter(i => i !== item);
    await menu.save();
    return res.status(200).json({ message: 'Item removed', menuItems: menu.items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
