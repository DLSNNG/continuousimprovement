NotificationFrame = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			success: Session.get("success-message"),
			error: Session.get("error-message")
		}
	},

	getInitialState() {
		return {
			timeout: false
		}
	},

	renderNotification() {
		if(this.data.error != "") {
			this.updateTimeout();
			return (
				<Notification 
					message={this.data.error}
					className="entering error-message" />
			)
		}
		else if(this.data.success != "") {
			this.updateTimeout();
			return (
				<Notification
					message={this.data.success}
					className="entering success-message" />
			)
		}
		else {
			return (
				<div></div>
			)
		}
	},

	updateTimeout() {
		if(this.state.timeout) {
			clearTimeout(this.state.timeout);
		}
		this.clearNotification();
	},

	clearNotification() {
		//need to clean this up so its more fluid.
		var that = this;
		setTimeout(function() {
			that.setState({ timeout: false });
			Session.set("success-message", "");
			Session.set("error-message", "");
		}, 3000);
	},

	render() {
		return (
			this.renderNotification()
		)
	}
});