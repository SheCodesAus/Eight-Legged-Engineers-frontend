  import { useState, useEffect, useCallback } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { supabase } from '../lib/supabaseClient'
  import './AdminPage.css'
  import WeatherBadge from "../components/WeatherBadge";


  const API_BASE = import.meta.env.VITE_API_BASE_URL

  async function authHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token ?? ''}`,
    }
  }

  const EMPTY_VENUE = {
    main_category: 'Activity',
    sub_category: '',
    name: '',
    address: '',
    suburb: '',
    opening_times: '',
    min_age: '',
    max_age: '',
    cost: '',
    kids_eat_free: '',
    indoor_outdoor: '',
    wheelchair_friendly: '',
    latitude: '',
    longitude: '',
    image_url: '',
    is_published: false,
    is_archived: false,
  }

  // ─── ADMIN PAGE ───────────────────────────────────────────────────────────────

  export default function AdminPage() {
    const navigate = useNavigate()
    const [tab, setTab] = useState('activities')
    const [adminChecked, setAdminChecked] = useState(false)

    useEffect(() => {
      async function checkAdmin() {
        const headers = await authHeaders()
        const res = await fetch(`${API_BASE}/users/me/`, { headers })
        if (!res.ok) { navigate('/'); return }
        const user = await res.json()
        if (!user.is_staff && !user.is_superuser) { navigate('/'); return }
        setAdminChecked(true)
      }
      checkAdmin()
    }, [navigate])

    if (!adminChecked) return <div className="admin-loading">Checking permissions...</div>

    return (
      <div className="admin-page">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === 'activities' ? 'active' : ''}`}
            onClick={() => setTab('activities')}
          >
            Activities
          </button>
          <button
            className={`admin-tab ${tab === 'users' ? 'active' : ''}`}
            onClick={() => setTab('users')}
          >
            Users
          </button>
        </div>

        {tab === 'activities' ? <ActivitiesTab /> : <UsersTab />}
      </div>
    )
  }

  // ─── ACTIVITIES TAB ───────────────────────────────────────────────────────────

  function ActivitiesTab() {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [filters, setFilters] = useState({
      main_category: '',
      suburb: '',
      indoor_outdoor: '',
      age: '',
    })
    const [editingActivity, setEditingActivity] = useState(null)
    const [showCreate, setShowCreate] = useState(false)

    const fetchActivities = useCallback(async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams()
        if (filters.main_category) params.set('main_category', filters.main_category)
        if (filters.suburb) params.set('suburb', filters.suburb)
        if (filters.indoor_outdoor) params.set('indoor_outdoor', filters.indoor_outdoor)
        if (filters.age) params.set('age', filters.age)

        const headers = await authHeaders()
        const res = await fetch(`${API_BASE}/venues/?${params}`, { headers })
        if (!res.ok) throw new Error('Failed to fetch activities')
        setActivities(await res.json())
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }, [filters])

    useEffect(() => { fetchActivities() }, [fetchActivities])

    async function handleEditSubmit(id, data) {
      const headers = await authHeaders()
      const res = await fetch(`${API_BASE}/venues/${id}/`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setEditingActivity(null)
        fetchActivities()
      } else {
        alert('Failed to update activity')
      }
    }

    async function handleCreate(data) {
      const headers = await authHeaders()
      const res = await fetch(`${API_BASE}/venues/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setShowCreate(false)
        fetchActivities()
      } else {
        alert('Failed to create activity')
      }
    }

    function clearFilters() {
      setFilters({ main_category: '', suburb: '', indoor_outdoor: '', age: '' })
    }

    return (
      <div className="admin-section">
        <div className="filter-bar">
          <select
            value={filters.main_category}
            onChange={e => setFilters(f => ({ ...f, main_category: e.target.value }))}
          >
            <option value="">All categories</option>
            <option value="Activity">Activity</option>
            <option value="Eatery">Eatery</option>
          </select>

          <input
            type="text"
            placeholder="Filter by suburb"
            value={filters.suburb}
            onChange={e => setFilters(f => ({ ...f, suburb: e.target.value }))}
          />

          <select
            value={filters.indoor_outdoor}
            onChange={e => setFilters(f => ({ ...f, indoor_outdoor: e.target.value }))}
          >
            <option value="">Indoor / Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>

          <input
            type="number"
            placeholder="Filter by age"
            value={filters.age}
            min="0"
            max="18"
            onChange={e => setFilters(f => ({ ...f, age: e.target.value }))}
          />

          <button className="btn-secondary" onClick={clearFilters}>Clear filters</button>
          <button className="btn-primary" onClick={() => setShowCreate(true)}>+ Add
  activity</button>
        </div>

        {loading && <p className="admin-status">Loading...</p>}
        {error && <p className="admin-error">{error}</p>}

        {!loading && !error && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Suburb</th>
                <th>Indoor / Outdoor</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 && (
                <tr><td colSpan={6} className="admin-empty">No activities found</td></tr>
              )}
              {activities.map(a => (
                <tr key={a.id}>
                  <td>{a.name || '—'}</td>
                  <td>{a.main_category}</td>
                  <td>{a.suburb}</td>
                  <td>{a.indoor_outdoor || '—'}</td>
                  <td>
                    <span className={`badge ${a.is_published ? 'badge-green' : 
  'badge-grey'}`}>
                      {a.is_published ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() =>
  setEditingActivity(a)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editingActivity && (
          <VenueModal
            title="Edit Activity"
            data={editingActivity}
            onSubmit={data => handleEditSubmit(editingActivity.id, data)}
            onClose={() => setEditingActivity(null)}
            submitLabel="Save changes"
          />
        )}

        {showCreate && (
          <VenueModal
            title="Add New Activity"
            data={EMPTY_VENUE}
            onSubmit={handleCreate}
            onClose={() => setShowCreate(false)}
            submitLabel="Create activity"
          />
        )}
      </div>
    )
  }

  // ─── VENUE MODAL (shared by edit and create) ──────────────────────────────────

  function VenueModal({ title, data, onSubmit, onClose, submitLabel }) {
    const [form, setForm] = useState({ ...EMPTY_VENUE, ...data })

    function set(field, value) {
      setForm(f => ({ ...f, [field]: value }))
    }

    function handleSubmit(e) {
      e.preventDefault()
      onSubmit(form)
    }

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <form onSubmit={handleSubmit} className="venue-form">
            <div className="form-grid">
              <label>
                Name
                <input value={form.name} onChange={e => set('name', e.target.value)} />
              </label>
              <label>
                Category
                <select value={form.main_category} onChange={e => set('main_category',
  e.target.value)}>
                  <option value="Activity">Activity</option>
                  <option value="Eatery">Eatery</option>
                </select>
              </label>
              <label>
                Sub-category
                <input value={form.sub_category} onChange={e => set('sub_category',
  e.target.value)} />
              </label>
              <label>
                Suburb
                <input value={form.suburb} onChange={e => set('suburb', e.target.value)} />
              </label>
              <label className="full-width">
                Address
                <input value={form.address} onChange={e => set('address', e.target.value)} />
              </label>
              <label>
                Opening times
                <input value={form.opening_times} onChange={e => set('opening_times',
  e.target.value)} />
              </label>
              <label>
                Cost
                <input value={form.cost} onChange={e => set('cost', e.target.value)} />
              </label>
              <label>
                Min age
                <input type="number" value={form.min_age ?? ''} onChange={e => set('min_age',
   e.target.value)} />
              </label>
              <label>
                Max age
                <input type="number" value={form.max_age ?? ''} onChange={e => set('max_age',
   e.target.value)} />
              </label>
              <label>
                Indoor / Outdoor
                <select value={form.indoor_outdoor} onChange={e => set('indoor_outdoor',
  e.target.value)}>
                  <option value="">— select —</option>
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Both">Indoor and Outdoor</option>
                </select>
              </label>
              <label>
                Wheelchair friendly
                <select value={form.wheelchair_friendly} onChange={e =>
  set('wheelchair_friendly', e.target.value)}>
                  <option value="">— select —</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Partial">Partial</option>
                </select>
              </label>
              <label>
                Kids eat free
                <input value={form.kids_eat_free} onChange={e => set('kids_eat_free',
  e.target.value)} />
              </label>
              <label className="full-width">
                Image URL
                <input value={form.image_url} onChange={e => set('image_url',
  e.target.value)} />
              </label>
              <label>
                Latitude
                <input type="number" step="any" value={form.latitude ?? ''} onChange={e =>
  set('latitude', e.target.value)} />
              </label>
              <label>
                Longitude
                <input type="number" step="any" value={form.longitude ?? ''} onChange={e =>
  set('longitude', e.target.value)} />
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={!!form.is_published} onChange={e =>
  set('is_published', e.target.checked)} />
                Published
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={!!form.is_archived} onChange={e =>
  set('is_archived', e.target.checked)} />
                Archived
              </label>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" 
  onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary">{submitLabel}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // ─── USERS TAB ────────────────────────────────────────────────────────────────

  function UsersTab() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function fetchUsers() {
      setLoading(true)
      setError(null)
      try {
        const headers = await authHeaders()
        const res = await fetch(`${API_BASE}/users/`, { headers })
        if (!res.ok) throw new Error('Failed to fetch users')
        setUsers(await res.json())
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => { fetchUsers() }, [])

    async function handleDeleteUser(userId, email) {
      if (!window.confirm(`Delete user "${email}"? This cannot be undone.`)) return
      const headers = await authHeaders()
      const res = await fetch(`${API_BASE}/users/${userId}/`, { method: 'DELETE', headers })
      if (res.ok) {
        fetchUsers()
      } else {
        alert('Failed to delete user')
      }
    }

    return (
      <div className="admin-section">
        {loading && <p className="admin-status">Loading...</p>}
        {error && <p className="admin-error">{error}</p>}

        {!loading && !error && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Kids</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr><td colSpan={5} className="admin-empty">No users found</td></tr>
              )}
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>
                    {u.is_staff || u.is_superuser
                      ? <span className="badge badge-blue">Admin</span>
                      : <span className="badge badge-grey">User</span>}
                  </td>
                  <td>{u.kids?.length ?? 0}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDeleteUser(u.id,
  u.email)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
