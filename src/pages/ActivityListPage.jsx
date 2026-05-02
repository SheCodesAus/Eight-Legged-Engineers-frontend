import { activities } from "../data";

function ActivityListPage() {
  return (
    <div>
      <h1>Activity List</h1>

      {activities.map((activityData) => {
        return <div key={activityData.id}>{activityData.title}</div>;
      })}
    </div>
  );
}

export default ActivityListPage;