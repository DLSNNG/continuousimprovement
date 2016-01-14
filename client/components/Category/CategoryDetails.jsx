CategoryDetails = React.createClass({

	propTypes: {
		categoryId: React.PropTypes.string		
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			category: Collections.Categories.findOne({ _id: this.props.categoryId })
		}
	},

	saveUpdates() {
		var doc = {
			_id: this.data.category._id,
			name: this.refs.name.getValue().trim(),
			description: this.refs.description.getValue().trim(),
			departmentIds: this.refs.departmentIds.getSelected()
		}

		var category = new Models.Category(doc);
		var status = category.save();
		if(status.passes) { this.setSuccessText("Update saved successfully"); }
		else{ this.setErrorText(status.error); }
	},

	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},

	setSuccessText(text) {
		var success = ReactDOM.findDOMNode(this.refs.successText);
			success.innerHTML = text;
	},

	render() {
		var name = this.data.category.name;
		//need to refactor error/success texts later to be its own component
		return (
			<div className="container">
				<div ref="errorText" className="bg-danger"></div>
				<div ref="successText" className="bg-success"></div>
				<h3>
					<ContentEditable
						ref="name"
						display={this.data.category.name} />
				</h3>
				<hr />
				<div className="well">
					<ContentEditable
						ref="description"
						display={this.data.category.description} />
				</div>
				<h4>Departments</h4>
				<CollectionListSelect
					ref="departmentIds"
					collection="Departments"
					display="name"
					value="_id"
					selectedItems={this.data.category.departmentIds} />
				<input type="submit" value="Save Changes" onClick={this.saveUpdates} />
			</div>
		)
	}
});