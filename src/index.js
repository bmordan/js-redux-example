import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'


const model = {
    hunger: 50,
    engagement: 50,
    wellbeing: 0,
    emoji: ":|"
}

const msg = dispatch => {
    return {
        Feed: () => dispatch({type: "Feed"}),
        Play: () => dispatch({type: "Play"}),
        Tick: () => dispatch({type: "Tick"})
    }
}

const reducer = (state = model, msg) => {
    switch(msg.type) {
        case "Feed":
            return Object.assign({}, state, {
                hunger: state.hunger - 10
            })
        case "Play":
            return Object.assign({}, state, {
                engagement: state.engagement + 10
            })
        case "Tick":
            const wellbeing = state.wellbeing - state.hunger + state.engagement
            const emoji = wellbeing > state.wellbeing ? ":)" : ":("
            return Object.assign({}, state, {
                hunger: state.hunger + 1,
                engagement: state.engagement - 1,
                wellbeing,
                emoji
            })
        default:
            return state
    }
}

class View extends React.Component {
    state = {
        interval: setInterval(this.props.Tick, 100)
    }
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }
    render () {
        const { emoji, hunger, engagement, Feed, Play } = this.props
        return (
            <div>
                <samp style={{transform: "rotate(90deg)", fontSize: "12rem", display: "inline-block"}}>
                  {emoji}
                </samp>
                <meter min="0" max="100" value={hunger}></meter>
                <button onClick={Feed}>Feed</button>
                <meter min="0" max="100" value={engagement}></meter>
                <button onClick={Play}>Play</button>
            </div>
        )
    }
}

const store = createStore(reducer)
const mapStateToProps = state => ({
    hunger: state.hunger,
    engagement: state.engagement,
    emoji: state.emoji
})
const ViewWithRedux = connect(mapStateToProps, msg)(View)
ReactDOM.render(<Provider store={store}><ViewWithRedux /></Provider>, document.getElementById('root'))