module.exports = [
    {
        name: 'A',
        type: 'normal',
        links: ['B', 'C']
    },
    {
        name: 'B',
        type: 'normal',
        links: ['D']
    },
    {
        name: 'C',
        type: 'flow',
        links: ['E'],
        flow: [
            {
                name: 'a',
                type: 'normal',
                links: ['b', 'c']
            },
            {
                name: 'b',
                type: 'normal',
                links: ['c']
            },
            {
                name: 'c',
                type: 'flow',
                flow: [
                    {
                        name: 'x',
                        type: 'normal',
                        links: ['y']
                    },
                    {
                        name: 'y',
                        type: 'normal'
                    }
                ]
            }
        ]
    },
    {
        name: 'D',
        type: 'normal',
        links: ['E']
    },
    {
        name: 'E',
        type: 'normal'
    }
]