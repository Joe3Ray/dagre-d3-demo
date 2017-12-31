import React from 'react'
import ReactDOM from 'react-dom'
import data from './data'

class IFrame extends React.Component {
    constructor(props) {
        super(props)
        this.frameBack = this.frameBack.bind(this)
    }

    frameBack() {
        graphHistory.pop()
        window.frames['graph'].postMessage(getTempData(), '*')
    }

    render() {
        return (
            <div>
                <button onClick={this.frameBack}>返回</button>
                <iframe src='./graph.html' name='graph' width='600' height='400' frameBorder='0' />
            </div>
        )
    }
}

ReactDOM.render(
    <IFrame />,
    document.getElementById('root')
)

const graphHistory = []

function getTempData() {
    let tempData = data
    for (let i = 0, len = graphHistory.length; i < len; i++) {
        tempData = tempData.filter(item => {
            return item.name === graphHistory[i] && item.type === 'flow' && item.flow
        })
        if (!tempData.length) {
            return []
        }
    }
    if (tempData.length === 1) {
        return tempData[0].flow
    } else {
        return tempData
    }
}

window.onload = function () {
    window.frames['graph'].postMessage(data, '*')
}

window.addEventListener('message', e => {
    if (e.source !== window.frames['graph']) {
        return
    }

    const tempData = getTempData()

    const info = tempData.filter(item => {
        return item.name === e.data && item.type === 'flow'
    })
    if (info.length) {
        const flow = info[0].flow
        graphHistory.push(e.data)
        window.frames['graph'].postMessage(flow, '*')
    }
}, false)
