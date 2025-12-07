import React, { useState, useEffect } from 'react'

const BRAND_PRESET = ['Nike','Adidas','Zara','H&M','Uniqlo','North Face','Carhartt','ASOS','New Balance']
const CAT_PRESET = ['T-Shirt','Hoodie','Jacket','Jeans','Tracksuit','Shoes']

export default function Inventory({ items, setItems }){
  const [open,setOpen] = useState(false)
  const [form,setForm] = useState({brand:'',category:'',size:'',colour:'',sku:'',cost:'',price:'',notes:'',images:[]})
  const [editIndex,setEditIndex] = useState(null)
  const [search,setSearch] = useState('')

  function previewFiles(files){
    const arr = Array.from(files)
    Promise.all(arr.map(f => {
      return new Promise(res => {
        const r = new FileReader()
        r.onload = e => res(e.target.result)
        r.readAsDataURL(f)
      })
    })).then(urls => {
      setForm(prev => ({...prev, images: [...prev.images, ...urls].slice(0,8)}))
    })
  }

  function openForm(edit=null){
    if(edit!==null){
      setEditIndex(edit)
      setForm({...items[edit]})
    } else {
      setEditIndex(null)
      setForm({brand:'',category:'',size:'',colour:'',sku:'',cost:'',price:'',notes:'',images:[]})
    }
    setOpen(true)
  }

  function save(){
    const data = {...form, cost: Number(form.cost||0), price: Number(form.price||0), sold: form.sold || false, profit: form.sold ? (Number(form.price)-Number(form.cost)) : 0}
    if(editIndex===null){
      setItems([ ...items, data ])
    } else {
      const copy = [...items]; copy[editIndex] = data; setItems(copy)
    }
    setOpen(false)
  }

  function markSold(i){
    const c=[...items]; c[i].sold=true; c[i].profit = Number(c[i].price)-Number(c[i].cost); setItems(c)
  }

  function remove(i){
    const c=items.filter((_,idx)=>idx!==i); setItems(c)
  }

  const filtered = items.filter(it => (it.brand||'').toLowerCase().includes(search.toLowerCase()) || (it.category||'').toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:8}}>
          <input placeholder='Search brand or category' value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div>
          <button className='btn' onClick={()=>openForm(null)}>+ Add Item</button>
        </div>
      </div>

      <div className='inventory-grid'>
        {filtered.map((it,idx)=>(
          <div key={idx} className='item-card'>
            <div className='item-image'>{it.images && it.images[0] ? <img src={it.images[0]} alt='' /> : <div style={{padding:20,color:'#777'}}>No image</div>}</div>
            <div style={{fontWeight:700}}>{it.brand} — {it.category}</div>
            <div className='muted'>Size: {it.size} • SKU: {it.sku}</div>
            <div style={{marginTop:8}}>Price: £{it.price} • Cost: £{it.cost}</div>
            {it.sold ? <div style={{color:'#6ee7b7',fontWeight:700}}>Profit: £{it.profit}</div> : null}
            <div style={{display:'flex',gap:8,marginTop:8}}>
              {!it.sold && <button onClick={()=>markSold(idx)}>Mark Sold</button>}
              <button onClick={()=>openForm(idx)}>Edit</button>
              <button style={{background:'#ff4d4f'}} onClick={()=>remove(idx)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className='modal'>
          <div className='modal-card'>
            <h3>{editIndex===null ? 'Add Item' : 'Edit Item'}</h3>
            <div className='form-grid'>
              <input value={form.brand} list='brandlist' onChange={e=>setForm({...form,brand:e.target.value})} placeholder='Brand' />
              <input value={form.category} list='catlist' onChange={e=>setForm({...form,category:e.target.value})} placeholder='Category' />
              <select value={form.size} onChange={e=>setForm({...form,size:e.target.value})}>
                <option value=''>Size</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
              </select>
              <input value={form.colour} onChange={e=>setForm({...form,colour:e.target.value})} placeholder='Colour' />
              <input value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} placeholder='SKU' />
              <input value={form.cost} onChange={e=>setForm({...form,cost:e.target.value})} placeholder='Cost' type='number' />
              <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder='Price' type='number' />
              <textarea className='full' value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder='Notes' />
              <div className='full'>
                <label style={{display:'block',marginBottom:8}}>Images (max 8)</label>
                <input type='file' multiple accept='image/*' onChange={e=>previewFiles(e.target.files)} />
                <div className='img-preview'>{form.images.map((u,i)=>(<img key={i} src={u} alt=''/>))}</div>
              </div>
            </div>

            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className='btn' onClick={save}>Save</button>
              <button onClick={()=>setOpen(false)} className='cancel'>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <datalist id='brandlist'>
        {BRAND_PRESET.map(b=> <option key={b} value={b} />)}
      </datalist>
      <datalist id='catlist'>
        {CAT_PRESET.map(c=> <option key={c} value={c} />)}
      </datalist>
    </div>
  )
}
