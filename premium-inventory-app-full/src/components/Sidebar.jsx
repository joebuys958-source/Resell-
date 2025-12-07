import React from 'react'

export default function Sidebar({ setPage, close }){
  return (
    <div>
      <h2>RR</h2>
      <div style={{marginBottom:10}} className='muted'>Resell Reserve</div>

      <div style={{display:'grid',gap:6}}>
        <div className='nav-item' onClick={() => { setPage('dashboard'); close() }}>📊 Dashboard</div>
        <div className='nav-item' onClick={() => { setPage('inventory'); close() }}>📦 Inventory</div>
        <div className='nav-item' onClick={() => { setPage('expenses'); close() }}>💰 Expenses</div>
        <div className='nav-item' onClick={() => { setPage('analytics'); close() }}>📈 Analytics</div>
      </div>

      <div style={{marginTop:18}}>
        <button className='btn' onClick={() => {
          const data = { items: JSON.parse(localStorage.getItem('rr_items')||'[]'), expenses: JSON.parse(localStorage.getItem('rr_expenses')||'[]') }
          const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'})
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a'); a.href=url; a.download='rr-backup.json'; a.click()
        }}>Export Backup</button>
        <div style={{marginTop:8}}>
          <label style={{fontSize:12,color:'var(--muted)'}}>Tip: export backups before big edits.</label>
        </div>
      </div>
    </div>
  )
}
