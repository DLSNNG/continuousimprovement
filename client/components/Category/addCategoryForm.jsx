AddCategoryForm = React.createClass({
	addCategory(e) {
		e.preventDefault();
		console.log("added category");
		var doc = {
			name: ReactDOM.findDOMNode(this.refs.catName).value.trim(),
			description: ReactDOM.findDOMNode(this.refs.catDescription).value.trim()
		}
		var category = new Models.Category(doc);
		var status = category.save();
		if(status.passes) { e.target.reset(); this.setErrorText(""); }
		else{ this.setErrorText(status.error); }
	},
	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},
	render() {
		return (
			<div>
				<form className="add-category-form" onSubmit={this.addCategory} >
					<h3>Add Category</h3>
					<input
						type="text"
						ref="catName"
						placeholder="Category Name" />
					<input
						type="text"
						ref="catDescription"
						placeholder="Category Description" />
					<input
						type="submit"
						value="Add Category" />
					<div ref="errorText" className="bg-danger"></div>
				</form>
			</div>
		)
	}
});