AddCategoriesPage = React.createClass({
	render() {
		return (
			<div className="container">
				<AddCategoryForm />
				<CollectionList 
					collection="Categories"
					display="name" 
					baseURL="/categories/"/>
			</div>
		)
	}
});