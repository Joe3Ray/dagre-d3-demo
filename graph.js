import './graph.less'

function renderGraph(data) {
    const g = new dagreD3.graphlib.Graph().setGraph({})
    data.forEach(item => {
        const name = item.name
        let label = name
        if (item.type === 'flow') {
            label = `${name}(inner flow)`
        }
        g.setNode(name, {label})
    })
    data.forEach(item => {
        if (item.links) {
            const from = item.name
            item.links.forEach(link => {
                g.setEdge(from, link, {
                    label: ''
                })
            })
        }
    })

    g.nodes().forEach(v => {
        const node = g.node(v)
        node.rx = node.ry = 5
    })

    const svg = d3.select('svg')
    const inner = d3.select('g')

    data.filter(info => {
        return info.type === 'flow'
    }).forEach(item => {
        g.node(item.name).style = 'fill: #7f7'
    })

    const zoom = d3.zoom().on('zoom', () => {
        inner.attr("transform", d3.event.transform)
    })

    svg.call(zoom)

    const render = new dagreD3.render()

    render(inner, g)

    const initialScale = 0.75
    svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(initialScale))

    svg.attr('height', g.graph().height * initialScale + 40)

    svg.selectAll('.node').on('click', id => {
        window.parent.postMessage(id, '*')
    })
}

window.addEventListener('message', e => {
    if (e.source !== window.parent || Object.prototype.toString.call(e.data) !== '[object Array]') {
        return
    }

    renderGraph(e.data)
}, false)
