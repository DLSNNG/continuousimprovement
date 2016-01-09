FlowRouter.route('/', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <Home /> });
	}
});

FlowRouter.route('/departments', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <DepartmentsPage /> });
	}
});

FlowRouter.route('/categories', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddCategoryForm /> });
	}
});