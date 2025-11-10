const { isResourceOwner } = require("../middleware/authMiddleware");

const isAuthotized = (req, res) => { 

    if(!req.cotext.me) {
        res.status(401).send('Unauthorized');
        return false;
    }
    return true;
};

const isOwner = (req, res, isResourceOwner) => {
    if(isResourceOwner(req.context.me, req.context.resource)) {
        res.status(403).send('Forbidden');
        return false;
    }} 
///??


export {isAuthotized, isOwner};