MainLayout = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
	    return {
	    	user: Meteor.user()
	    }
	},
	renderPage() {
		return (
			<div>
				<NotificationFrame />
		        <main>{this.props.content}</main>
		     </div>
		)
	},
	reRoute() {
		return <HomePage />
	},
	render() {
		return (
			<div>
				{this.data.user ? this.renderPage() : this.reRoute()}
			</div>
		)
	}
})