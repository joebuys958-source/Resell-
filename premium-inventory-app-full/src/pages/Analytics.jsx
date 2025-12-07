import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function Analytics({ items }){
  const barRef = useRef(null)
  const pieRef = useRef(null)

  useEffect(()=> {
    if(!barRef.current || !pieRef.current) return
    const sold = items.filter(i=>i.sold)
    const labels = sold.map(s=>s.brand || s.category || 'Item')
    const profits = sold.map(s=>s.profit || 0)

    if(window._rrLine) window._rrLine.destroy()
    window._rrLine = new Chart(barRef.current.getContext('2d'),{type:'line',data:{labels, datasets:[{label:'Profit', data:profits, borderColor:'#ff6b6b', backgroundColor:'rgba(255,107,107,0.12)'}]}, options:{responsive:true}})

    const byBrand = {}
    sold.forEach(s => { const b = s.brand || 'Unknown'; byBrand[b] = (byBrand[b]||0) + (s.profit||0) })
    const bLabels = Object.keys(byBrand)
    const bData = bLabels.map(k=>byBrand[k])
    if(window._rrPie) window._rrPie.destroy()
    window._rrPie = new Chart(pieRef.current.getContext('2d'),{type:'pie',data:{labels:bLabels,datasets:[{data:bData, backgroundColor:['#ff6b6b','#ffb86b','#6be7b7','#6b9bff']}]}})
  },[items])

  return (
    <div>
      <div className='card' style={{marginBottom:12}}>
        <h3>Profit over Sold Items</h3>
        <canvas ref={barRef} style={{height:240}}></canvas>
      </div>

      <div className='card'>
        <h3>Profit by Brand (Sold Items)</h3>
        <canvas ref={pieRef} style={{height:240}}></canvas>
      </div>
    </div>
  )
}
