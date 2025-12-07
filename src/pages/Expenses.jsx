import React, { useState } from 'react'

export default function Expenses({ expenses, setExpenses }){
  const [name,setName] = useState('')
  const [amount,setAmount] = useState('')

  function add(){
    if(!name) return
    setExpenses([...(expenses||[]), {name, amount: Number(amount||0), id: Date.now()}])
    setName(''); setAmount('')
  }

  function remove(i){
    setExpenses(expenses.filter((_,idx)=>idx!==i))
  }

  const total = (expenses||[]).reduce((a,b)=>a + (Number(b.amount)||0),0)

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input placeholder='Expense name' value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder='Amount' type='number' value={amount} onChange={e=>setAmount(e.target.value)} />
        <button className='btn' onClick={add}>Add Expense</button>
      </div>

      <div className='card'>
        <ul>
          {(expenses||[]).map((ex,i)=>(
            <li key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0'}}>{ex.name} <span>£{ex.amount} <button onClick={()=>remove(i)} style={{marginLeft:8}}>Delete</button></span></li>
          ))}
        </ul>
        <div style={{marginTop:12,fontWeight:700}}>Total Expenses: £{total}</div>
      </div>
    </div>
  )
}
