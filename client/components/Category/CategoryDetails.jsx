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

	deleteCategory() {
		var doc = this.data.category;
		var category = new Models.Category(doc);
		var status = category.remove();
		if(status.passes) { FlowRouter.go('/categories'); }
		else { this.setErrorText(status.error); }
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
				<ModalDelete
					docName="Category"
					deleteDoc={this.deleteCategory} />

				<div ref="errorText" className="bg-danger"></div>
				<div ref="successText" className="bg-success"></div>
				<h3>
					<ContentEditable
						ref="name"
						display={this.data.category.name} />
				</h3>
				<hr />
				<div className="col-md-4 col-md-push-8">
					<h4>Departments</h4>
					<div className="scroll-list">
						<CollectionListSelect
							ref="departmentIds"
							collection="Departments"
							display="name"
							value="_id"
							selectedItems={this.data.category.departmentIds} />
					</div>
				</div>
				<div className="col-md-8 col-md-pull-4">
					<h4>Description</h4>
					<div className="well">
						<ContentEditable
							ref="description"
							display={this.data.category.description} />
					</div>
				</div>
				<input className="col-xs-12" type="submit" value="Save Changes" onClick={this.saveUpdates} />
			</div>
		)
	}
});