import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Expenses from './pages/Expenses'
import Analytics from './pages/Analytics'

export default function App(){
  const [sidebarOpen,setSidebarOpen] = useState(false)
  const [page,setPage] = useState('dashboard')
  const [items,setItems] = useState([])
  const [expenses,setExpenses] = useState([])
  const [themeLight,setThemeLight] = useState(false)

  useEffect(()=> {
    const rawItems = localStorage.getItem('rr_items')
    const rawExpenses = localStorage.getItem('rr_expenses')
    if(rawItems) setItems(JSON.parse(rawItems))
    if(rawExpenses) setExpenses(JSON.parse(rawExpenses))
  },[])

  useEffect(()=> {
    localStorage.setItem('rr_items', JSON.stringify(items))
  },[items])

  useEffect(()=> {
    localStorage.setItem('rr_expenses', JSON.stringify(expenses))
  },[expenses])

  useEffect(()=> {
    document.documentElement.classList.toggle('light', themeLight)
  },[themeLight])

  return (
    <div>
      <header>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button className='menu-btn' onClick={() => setSidebarOpen(s => !s)}>☰</button>
          <h1 style={{margin:0}}>Resell Reserve</h1>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className='theme-toggle' onClick={() => setThemeLight(t => !t)}>{themeLight ? '🌞' : '🌙'}</button>
        </div>
      </header>

      <div className='app'>
        <aside className={'sidebar ' + (sidebarOpen ? 'open' : '')}>
          <Sidebar setPage={setPage} close={() => setSidebarOpen(false)} />
        </aside>

        <main className='content'>
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <h2 style={{margin:0}}>{page.charAt(0).toUpperCase() + page.slice(1)}</h2>
              <div className='muted'>RR • Premium</div>
            </div>

            <div className='card'>
              {page === 'dashboard' && <Dashboard items={items} />}
              {page === 'inventory' && <Inventory items={items} setItems={setItems} />}
              {page === 'expenses' && <Expenses expenses={expenses} setExpenses={setExpenses} />}
              {page === 'analytics' && <Analytics items={items} />}
            </div>
          </div>
        </main>
      </div>
    </div>
)
}
