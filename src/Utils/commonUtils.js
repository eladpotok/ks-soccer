export function checkIsAdminForLegacy(isAdmin) {
    if(isAdmin && isAdmin === 'undefined') return false;
    if(isAdmin && isAdmin.toLowerCase() === 'false') return false;
    if(isAdmin && isAdmin.toLowerCase() === 'true') return true;
    return false;
}


export function checkIsAdmin(isAdmin) {
    const isLegacyAdmin = checkIsAdminForLegacy(isAdmin);
    if(isLegacyAdmin) return true;

    if(isAdmin && isAdmin.toLowerCase() === 'true') return true;
    return false;
}

export function getPlayersByLevels(players) {
    if(!players) return [];
    const lowLevel = players.filter( player => player.preference === 'low' || (player.stars < 3.5 && player.preference !== 'high') );
    const highLevel = players.filter( player => player.preference === 'high' || (player.stars >= 3.5 && player.preference !== 'low') );

    return {lowLevel: lowLevel, highLevel: highLevel};
}