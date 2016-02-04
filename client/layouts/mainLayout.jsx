MainLayout = React.createClass({
	render() {
		return (
			<div>
				<NotificationFrame />
		        <main>{this.props.content}</main>
		     </div>
		)
	}
})