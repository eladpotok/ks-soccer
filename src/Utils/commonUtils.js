export function checkIsAdminForLegacy(isAdmin) {
    if(isAdmin && isAdmin === 'undefined') return false;
    if(isAdmin && isAdmin.toLowerCase() === 'false') return false;
    if(isAdmin && isAdmin.toLowerCase() === 'true') return true;
    return false;
}


export function checkIsAdmin(isAdmin) {
    if(isAdmin && isAdmin.toLowerCase() === 'true') return true;
    return false;
}