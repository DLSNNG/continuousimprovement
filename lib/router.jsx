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

FlowRouter.route('/departments/:departmentId', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <DepartmentDetails departmentId={params.departmentId} /> });
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

FlowRouter.route('/tickets/search', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <TicketSearch /> });
	}
});

FlowRouter.route('/tickets/:ticketId', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <TicketDetails ticketId={params.ticketId} /> });
	}
});

FlowRouter.route('/ticketStatusOptions', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddTicketStatusOptionsPage /> });
	}
});

FlowRouter.route('/ticketStatusOptions/:ticketStatusOptionId', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <TicketStatusOptionDetails 
														ticketStatusOptionId={params.ticketStatusOptionId} /> });
	}
});

FlowRouter.route('/users', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddUsersPage /> });
	}
});

FlowRouter.route('/notifications', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <NotificationFrame /> });
	}
});