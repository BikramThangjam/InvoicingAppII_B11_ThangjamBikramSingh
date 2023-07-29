import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import './InvoiceForm.css'

export default function InvoiceForm() {
  const [newInvoice, setNewInvoice] = useState({
    client_name: "",
    date: ""
  })
  const navigate = useNavigate()

  function handleSubmit() {
    newInvoice.items = []
    const token = localStorage.getItem("token")
    fetch('http://127.0.0.1:8000/api/invoices/new', {
      method: 'POST',
      body: JSON.stringify(newInvoice),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then((res) => navigate('/'))
  }

  return (
    <div className="container">
      <Navbar />
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Client Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={newInvoice.client_name}
          onInput={(e) => {
            setNewInvoice({ ...newInvoice, client_name: e.target.value })
          }}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={newInvoice.date}
          onInput={(e) => {
            setNewInvoice({
              ...newInvoice,
              date: e.target.value,
            })
          }}
        ></input>
      </div>

      <button className="btn btn-primary" type="button" onClick={handleSubmit}>
        Create Invoice
      </button>
    </div>
  )
}
