const COLORS_POOL = [ 'blue', 'orange' , 'green' , 'red', 'black', 'yellow' ] 

export const GROUP_TYPE = {
  low: 'low',
  high: 'high'
}


export function makeGroups(players, type) {
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
    }

    let colors =   type === GROUP_TYPE.high ? COLORS_POOL.slice(0,3) : COLORS_POOL.slice(3, 6)
    console.log('colors are' , colors);
    function getColor() {
        const color = colors[Math.floor(Math.random() * colors.length)];
        colors = colors.filter ( c => c !== color);
        return color;
    }

    return groups.map( gr=> (
      { players: gr ,
        color: getColor()
       }
    ) );

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
          preference: 'high'
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
          preference: 'high'
        },
        {
          name: 'dan giald',
          stars: 3,
          preference: 'high'
        },
        {
          name: 'matias',
          stars: 3.5,
          preference: 'low'
        },
        {
          name: 'tal norman',
          stars: 2.5,
        },
        {
          name: 'nir hazam',
          stars: 2.5,
        },
        {
          name: 'oren',
          stars: 3,
        },
        {
          name: 'avi aviel',
          stars: 3,
        },
        {
          name: 'moty omur',
          stars: 3,
        },
        {
          name: 'igor almogi',
          stars: 3,
        },
        {
          name: 'aviram tsur',
          stars: 2.5,
        },
      ];
}

