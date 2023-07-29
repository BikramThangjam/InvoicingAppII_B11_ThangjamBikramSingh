import { useEffect, useState } from 'react'
import Navbar from '../NavBar/Navbar'

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([])
  
  useEffect(() => {  
      const token = localStorage.getItem("token")
      const apiURL = "http://127.0.0.1:8000/api/invoices"
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      fetch(apiURL,{
        method: 'GET',
        headers: headers
      })
      .then((res) => res.json())
      .then((results) => {
        console.log(results)
        setInvoices(results)
        results.forEach((element) => {
          element.totalAmount = element.items.reduce(
            (total, item) =>
              Number(total) + Number(item.rate) * Number(item.quantity),
            0,
          )
        })
        
      })
      .catch(err=>console.log(err)) 
  }, [])

  return (
    <div className="container">
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Invoice No</th>
            <th scope="col">Client</th>
            <th scope="col">Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id}>
              <th>{i.id}</th>
              <td>{i.client_name}</td>
              <td>{new Date(i.date).toDateString()}</td>
              <td>{i.totalAmount}</td>
              <td>
                <a href={i.id} className="btn btn-warning">
                  Items
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
