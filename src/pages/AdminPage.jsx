import { users, activities } from "../data";

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>

      <h2>Manage Activities</h2>

      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <p>{activity.title}</p>
            <p>{activity.location}</p>
            <p>{activity.category}</p>
          </div>
        );
      })}

      <h2>Manage Users</h2>

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