const roleRestriction = (...roles)=>{
    return (req, res, next)=>{
        if(roles.includes(req.userAuth.role)){
            throw new Error("you do not have permission to perform this action");
        }
        next();
    };
};


module.exports = roleRestriction;