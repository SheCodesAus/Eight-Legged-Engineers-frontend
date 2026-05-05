import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import './AdminProfilePage.css'

const DUMMY_USERS = [
  { id: 1, initials: 'SM', name: 'Sarah Mitchell',  email: 'sarah.mitchell@email.com',  joined: 'Jan 2025' },
  { id: 2, initials: 'JP', name: 'James Parker',    email: 'james.parker@email.com',    joined: 'Feb 2025' },
  { id: 3, initials: 'OC', name: 'Olivia Chen',     email: 'olivia.chen@email.com',     joined: 'Feb 2025' },
  { id: 4, initials: 'MW', name: 'Marcus Williams', email: 'marcus.williams@email.com', joined: 'Mar 2025' },
  { id: 5, initials: 'ET', name: 'Emma Thompson',   email: 'emma.thompson@email.com',   joined: 'Apr 2025' },
  { id: 6, initials: 'LR', name: 'Liam Roberts',    email: 'liam.roberts@email.com',    joined: 'Apr 2025' },
  { id: 7, initials: 'PS', name: 'Priya Sharma',    email: 'priya.sharma@email.com',    joined: 'May 2025' },
  { id: 8, initials: 'NA', name: 'Noah Anderson',   email: 'noah.anderson@email.com',   joined: 'May 2025' },
]

const DUMMY_ACTIVITIES = [
  { id: 1, name: 'Cremorne Playground',     suburb: 'Cremorne',     tags: ['Free', '0–3 mths', '9am–5pm']  },
  { id: 2, name: 'Mosman Splash Park',      suburb: 'Mosman',       tags: ['Free', '3–12 mths', '8am–6pm'] },
  { id: 3, name: 'Neutral Bay Playgroup',   suburb: 'Neutral Bay',  tags: ['$', '0–5 yrs', '10am–12pm']   },
  { id: 4, name: 'Taronga Zoo Kids Zone',   suburb: 'Mosman',       tags: ['$$', 'All ages', '9am–5pm']    },
  { id: 5, name: 'Balmoral Beach',          suburb: 'Mosman',       tags: ['Free', 'All ages', 'All day']  },
  { id: 6, name: 'Kirribilli Storytime',    suburb: 'Kirribilli',   tags: ['Free', '0–3 yrs', '10am–11am'] },
  { id: 7, name: 'North Sydney Pool',       suburb: 'North Sydney', tags: ['$$', 'All ages', '6am–8pm']    },
  { id: 8, name: 'Lavender Bay Playground', suburb: 'Lavender Bay', tags: ['Free', 'All ages', 'All day']  },
]

function AdminProfilePage() {
  const [userSearch, setUserSearch] = useState('')
  const [activitySearch, setActivitySearch] = useState('')

  const filteredUsers = DUMMY_USERS
    .filter(u =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    )
    .slice(0, 5)

  const filteredActivities = DUMMY_ACTIVITIES
    .filter(a =>
      a.name.toLowerCase().includes(activitySearch.toLowerCase()) ||
      a.suburb.toLowerCase().includes(activitySearch.toLowerCase())
    )
    .slice(0, 5)

  return (
    <div className="admin-page">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="admin-header">
        <div className="admin-avatar">A</div>
        <div className="admin-header-info">
          <div className="admin-name-row">
            <h1 className="admin-name">Admin User</h1>
            <span className="admin-role-badge">Administrator</span>
          </div>
          <p className="admin-email">admin@playpal.com.au</p>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="admin-content">

        {/* Users list */}
        <section>
          <div className="section-heading">
            <h2>All <span className="text-coral">Users</span></h2>
            <span className="count-badge">{filteredUsers.length}</span>
          </div>
          <input
            className="filter-input"
            type="text"
            placeholder="Search by name or email..."
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
          />
          {filteredUsers.length === 0 && (
            <p className="no-results">No users found</p>
          )}
          {filteredUsers.map(user => (
            <div key={user.id} className="list-card">
              <div className="user-initials">{user.initials}</div>
              <div className="card-text">
                <p className="card-name">{user.name}</p>
                <p className="card-sub">{user.email}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Activities list */}
        <section>
          <div className="section-heading">
            <h2>All <span className="text-gold">Activities</span></h2>
            <span className="count-badge">{filteredActivities.length}</span>
          </div>
          <input
            className="filter-input"
            type="text"
            placeholder="Search by name or suburb..."
            value={activitySearch}
            onChange={e => setActivitySearch(e.target.value)}
          />
          {filteredActivities.length === 0 && (
            <p className="no-results">No activities found</p>
          )}
          {filteredActivities.map(activity => (
            <div key={activity.id} className="list-card">
              <div className="activity-thumb" />
              <div className="card-text">
                <p className="card-name">{activity.name}</p>
                <p className="card-sub">{activity.suburb}</p>
                <div className="tag-row">
                  {activity.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

      </main>

      <BottomNav activePage="profile" />
    </div>
  )
}

export default AdminProfilePage
