NotificationFrame = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
	  		notifications: Collections.Notifications.find({}).fetch()
	  	}
	},
	renderNotifications() {
		console.log("notifications", this.data.notifications);
		return(
			this.data.notifications.map(function(notification) {
				return (
					<Notification
							key={notification._id}
							message={notification.message}
							className={notification.className + " notification"} />
				)
			})
		)
	},
	render() {
		return(
			<div className="notifications-box">
				{this.renderNotifications()}
			</div>
		)
	}
});