import { GROUP_TYPE } from "./makeGroups";

export function checkIsAdminForLegacy(isAdmin) {
    if (isAdmin && typeof (isAdmin) === 'boolean') return true;
    if (isAdmin && isAdmin === 'undefined') return false;
    if (isAdmin && isAdmin.toLowerCase() === 'false') return false;
    if (isAdmin && isAdmin.toLowerCase() === 'true') return true;
    return false;
}


export function checkIsAdmin(isAdmin) {
    const isLegacyAdmin = checkIsAdminForLegacy(isAdmin);
    if (isLegacyAdmin) return true;

    if (isAdmin && isAdmin.toLowerCase() === 'true') return true;
    return false;
}

export function getPlayersByLevels(players) {
    if (!players) return [];

    const lowLevel = players.filter(pl => pl.forceType === 'low');
    const highLevel = players.filter(pl => pl.forceType === 'high');

    players = players.filter(pl => lowLevel.every(t => t.id !== pl.id) && highLevel.every(t => t.id !== pl.id));
    lowLevel.push(...players.filter(pl => pl.preference === 'low' && lowLevel.every(t => t.id !== pl.id)))
    highLevel.push(...players.filter(pl => pl.preference === 'high' && highLevel.every(t => t.id !== pl.id)))

    
    players = players.filter(pl => lowLevel.every(t => t.id !== pl.id) && highLevel.every(t => t.id !== pl.id));
    lowLevel.push(...players.filter(pl => pl.stars < 3.5 && lowLevel.every(t => t.id !== pl.id)));
    highLevel.push(...players.filter(pl => pl.stars >= 3.5 && highLevel.every(t => t.id !== pl.id)));
    return { lowLevel, highLevel };
}

export function preferenceDbNameToDisplayName(level) {
    if( level === GROUP_TYPE.low) return 'גרועים';
    if( level === GROUP_TYPE.high) return 'סבירים';
    return '';
}

export function preferenceDisplayNameToDbName(level) {
    if( level === 'גרועים') return GROUP_TYPE.low;
    if( level === 'סבירים') return GROUP_TYPE.high;
    return '';
}

export function sortAscending(collection, value) {
    collection.sort(function(a, b){return b[value] - a[value]});
}