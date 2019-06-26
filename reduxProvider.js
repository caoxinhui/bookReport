class Provider extends Component{
    getChildContext(){
        return {
            store:this.props.state
        }
    }
    render(){
        return this.props.children
    }
}
Provider.childContextTypes = {
    store: React.PropTypes.object
}