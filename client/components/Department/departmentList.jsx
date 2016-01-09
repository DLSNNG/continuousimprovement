DepartmentList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
  	return {
  		departments: Collections.Departments.find({}).fetch()
  	}
  },
 
  renderDepartments() {
    return this.data.departments.map((department) => {
      return <DepartmentListItem key={department._id} department={department} />;
    });
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Department List</h1>
        </header>
        <ul className="list-group">
          {this.renderDepartments()}
        </ul>
      </div>
    );
  }
});