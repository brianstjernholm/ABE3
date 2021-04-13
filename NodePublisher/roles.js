const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function() {
    ac.grant('user')
     .readOwn("profile")
     .updateOwn("profile")
     .readAny("hotel")
    
    ac.grant('manager')
     .extend("user")
     .readAny("profile")
     .createAny("hotel")
     .deleteAny("hotel")
    
     ac.grant('admin')
        .extend("user")
        .extend("manager")
        .updateAny("profile")
        .deleteAny("profile")
    
    return ac;
})();