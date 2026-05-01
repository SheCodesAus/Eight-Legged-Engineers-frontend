import { activities } from "../data";

function ActivityListPage() {
  return (
    <div>
      <h1>Activity List</h1>

      {activities.map((activityData, key) => {
        return <div key={key}>{activityData.title}</div>;
      })}
    </div>
  );
}

export default ActivityListPage;