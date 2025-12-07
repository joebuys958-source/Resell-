import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function Dashboard({ items }) {
  const chartRef = useRef(null)

  useEffect(()=> {
    if(!chartRef.current) return
    const ctx = chartRef.current.getContext('2d')
    const sold = items.filter(i=>i.sold)
    const labels = sold.map((s,idx)=> (s.brand || s.category || ('Item ' + (idx+1))))
    const data = sold.map(s=>s.profit || 0)

    // destroy existing if any
    if(window._rrChart) window._rrChart.destroy()
    window._rrChart = new Chart(ctx, {
      type:'bar',
      data:{ labels, datasets:[{label:'Profit', data, backgroundColor:'#ff6b6b'}] },
      options:{responsive:true, plugins:{legend:{display:false}}}
    })

  },[items])

  const totalItems = items.length
  const totalValue = items.reduce((a,b)=>a + (Number(b.price)||0),0)
  const itemsSold = items.filter(i=>i.sold).length
  const totalProfit = items.reduce((a,b)=>a + (Number(b.profit)||0),0)

  return (
    <div>
      <div className='stats-grid'>
        <div className='card'><div className='muted'>Total Items</div><h3>{totalItems}</h3></div>
        <div className='card'><div className='muted'>Total Value</div><h3>£{totalValue}</h3></div>
        <div className='card'><div className='muted'>Items Sold</div><h3>{itemsSold}</h3></div>
        <div className='card'><div className='muted'>Total Profit</div><h3>£{totalProfit}</h3></div>
      </div>

      <div className='card' style={{marginTop:12}}>
        <canvas ref={chartRef} style={{width:'100%',height:240}}></canvas>
      </div>
    </div>
  )
}
