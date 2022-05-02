import { getDefaultNormalizer } from "@testing-library/react";

export function makeGroups(players) {
    let starsSum = 0;
    players.forEach(player=> {
        starsSum += player.stars;
    });

    const avg = starsSum / players.length;

    players.sort(function(a, b){return b.stars - a.stars});

    const length = players.length;

    
    const groupA = [];
    const groupB = [];
    const groupC = [];

    let groups = [groupA, groupB, groupC];

    let i = 0;
    while( i < length ) {
        
        groups[0].push(players[i++])
        if(i >= length) break;
        groups[1].push(players[i++])
        if(i >= length) break;
        groups[2].push(players[i++])
        if(i >= length) break;
        groups[2].push(players[i++])
        if(i >= length) break;
        groups[1].push(players[i++])
        if(i >= length) break;
        groups[0].push(players[i++])
    }


    for( let i = length ; i < 15 ; i++) {
        const groupToAddTo = groups[i % 3];
        groupToAddTo.push({ name: '[empty]'});
       
        // if(i % 3 == 2){
        //     groups = [groupB, groupC, groupA];
        // }
    }

    return groups;

}

function getAvg(group) {
    if(group.length === 0) return 0;

    let starsSum = 0;
    group.forEach(player=> {
        starsSum += player.star;
    });


    const avg = starsSum / group.length;
    return avg;
}

export function getDemo() {
    return [
        {
          name: 'elad peleg',
          stars: 5,
        },
        {
          name: 'ofir',
          stars: 4,
        },
        {
          name: 'gilad',
          stars: 3.5,
        },
        {
          name: 'assaf nachmani',
          stars: 3,
        },
        {
          name: 'alon',
          stars: 3.5,
        },
        {
          name: 'ben elkayam',
          stars: 3.5,
        },
        {
          name: 'tommy',
          stars: 3.5,
        },
        {
          name: 'dor',
          stars: 4,
        },
        {
          name: 'david',
          stars: 5,
        },
        {
          name: 'niv',
          stars: 3,
        },
        {
          name: 'avihai',
          stars: 4,
        },
        {
          name: 'aviv ben eliezer',
          stars: 3.5,
        },
        {
          name: 'eli yutman',
          stars: 3,
        },
        {
          name: 'dan giald',
          stars: 3,
        },
      ];
}

