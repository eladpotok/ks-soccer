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
    return DEMO_USERS;
}

export function moveTo(id, type) {
   DEMO_USERS.find( pl => pl.id === id).forceType = type;
}

export const DEMO_USERS = [
  {
    name: 'elad peleg',
    stars: 5,
    id: 1
  },
  {
    name: 'ofir',
    stars: 4,
    id: 2
  },
  {
    name: 'gilad',
    stars: 3.5,
    id: 3
  },
  {
    name: 'assaf nachmani',
    stars: 3,
    preference: 'high',
    id: 4
  },
  {
    name: 'alon',
    stars: 3.5,
    id: 5
  },
  {
    name: 'ben elkayam',
    stars: 3.5,
    id: 6
  },
  {
    name: 'tommy',
    stars: 3.5,
    id: 7
  },
  {
    name: 'dor',
    stars: 4,
    id: 8
  },
  {
    name: 'david',
    stars: 5,
    id: 9
  },
  {
    name: 'niv',
    stars: 3,
    id: 10
  },
  {
    name: 'avihai',
    stars: 4,
    id: 11
  },
  {
    name: 'aviv ben eliezer',
    stars: 3.5,
    id: 12
  },
  {
    name: 'eli yutman',
    stars: 3,
    preference: 'high',
    id: 13
  },
  {
    name: 'dan giald',
    stars: 3,
    preference: 'high',
    id: 14
  },
  {
    name: 'matias',
    stars: 3.5,
    preference: 'low',
    forceType: 'high',
    id: 15
  },
  {
    name: 'tal norman',
    stars: 2.5,
    id: 16
  },
  {
    name: 'nir hazam',
    stars: 2.5,
    preference: 'low',
    id: 17
  },
  {
    name: 'oren',
    stars: 3,
    id: 18
  },
  {
    name: 'avi aviel',
    stars: 3,
    id: 19
  },
  {
    name: 'moty omur',
    stars: 3,
    id: 20
  },
  {
    name: 'igor almogi',
    stars: 3,
    id: 21
  },
  {
    name: 'aviram tsur',
    stars: 2.5,
    id: 22
  },
];