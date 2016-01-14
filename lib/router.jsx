FlowRouter.route('/', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <Home /> });
	}
});

FlowRouter.route('/departments', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddDepartmentsPage /> });
	}
});

FlowRouter.route('/categories', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddCategoriesPage /> });
	}
});

FlowRouter.route('/categories/:categoryId', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <CategoryDetails categoryId={params.categoryId} /> });
	}
});

FlowRouter.route('/tickets', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddTicketsPage /> });
	}
});

FlowRouter.route('/users', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddUsersPage /> });
	}
});