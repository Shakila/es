(function(){
    var sso_sessions = application.get('sso_sessions'),
        l = new Log();
    if(!sso_sessions) {
        return;
    }
    l.debug("session deleting :: " + session.getId() + " :: " + sso_sessions[session.getId()]);
    var sso = require('sso');
    sso.client.cleanUp(session,'publisher');
    delete sso_sessions[session.getId()];
    //l.debug("sessions :: " + stringify(sso_sessions));
}());