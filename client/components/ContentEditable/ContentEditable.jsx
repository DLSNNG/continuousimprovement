ContentEditable = React.createClass({

	propTypes() {
		display: React.PropTypes.string
	},

	getInitialState() {
		return {
			editable: false
		}
	},

	componentDidUpdate() {
		if(this.state.editable === true) {
			var field = ReactDOM.findDOMNode(this.refs.display);
				field.focus();
		}
	},

	toggleEditable() {
		this.setState({ editable: !this.state.editable });
	},

	getClass() {
		var btnState = this.state.editable ? "btn-success" : "btn-info hover-show";
		var className = "btn btn-xs pull-right  " + btnState;
		return className;
	},

	getValue() {
		return this.refs.display.innerHTML;
	},

	render() {
		return (
			<div>
				<button className={this.getClass()} onClick={this.toggleEditable}>
					{this.state.editable ? "Lock" : "Edit"}
				</button>
				<div ref="display" className="content-editable" contentEditable={this.state.editable}>
					{this.props.display}
				</div>
			</div>
		)
	}
});