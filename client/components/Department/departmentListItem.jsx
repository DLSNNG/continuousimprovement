// Task component - represents a single todo item
DepartmentListItem = React.createClass({
  render() {
    return (
      <li className="list-group-item">{this.props.department.name}</li>
    );
  }
});