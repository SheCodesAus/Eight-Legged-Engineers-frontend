import { users, activities } from "../data";
import "../index.css";

function AdminPage() {
  return (
    <div>
      <h2>Admin Page</h2>

      <h3>Manage Activities</h3>
      <input placeholder="Search activities" />

      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <p>{activity.title}</p>
            <p>{activity.suburb}</p>
            <p>{activity.address}</p>
            <p>{activity.main_category}</p>
            <p>{activity.cost}</p>
          </div>
        );
      })}

      <h3>Manage Users</h3>
      <input placeholder="Search users" />

      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AdminPage;