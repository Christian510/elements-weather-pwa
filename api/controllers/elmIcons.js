const Database = require('../db/database.js');
const db = new Database();

exports.fetchOneElmIcon = async (req, res, next) => {
    // Add better error handling
    console.log('fetching one icon: ', req.query.icon)
    res.status(200).json({
        message: 'GET ONE ICON FROM DB',
        icon: await db.fetchOneIcon(req.query.icon),
    });
}

exports.fetchAllElmIcons = async (req, res, next) => {
    // console.log('fetching all icons: ', req)
    res.status(200).json({
        message: 'GET ICONS FROM DB',
        icons: await db.fetchAllIcons(),
    });
}