import { users, activities } from "../data";

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>

      <h2>Manage Activities</h2>
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

      <h2>Manage Users</h2>
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