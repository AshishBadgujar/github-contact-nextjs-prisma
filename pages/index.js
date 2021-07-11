import React, { useState } from 'react'
import { PrismaClient } from '.prisma/client'
import Head from 'next/head';
import Axios from 'axios';

export default function Home({ contacts }) {
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [url, seturl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await Axios.post(`http://localhost:3000/api/contacts`, {
      firstName: fname,
      lastName: lname,
      email: email,
      avatar: url
    })
    if (res.data.status) {
      setfname('')
      setlname('')
      setemail('')
      seturl('')
    }
  }

  const handleDelete = async (userId) => {
    try {
      await Axios.delete(`http://localhost:3000/api/${userId}/delete`)
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
      </Head>
      <div className="main d-flex">
        <div className="left p-1">
          <h1>+ Contact</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} required placeholder="First Name" className="form-control" />
            <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} required placeholder="Last Name" className="form-control" />
            <input type="email" value={email} onChange={(e) => setemail(e.target.value)} required placeholder="Email" className="form-control" />
            <input type="text" value={url} onChange={(e) => seturl(e.target.value)} required placeholder="Profile image URL" className="form-control" />
            <button type="submit" className="btn btn-outline-warning mt-2">Submit</button>
          </form>
        </div>
        <div className="right p-3">
          {contacts.map(item => (
            <div className="card mb-2" key={item.id}>
              <div className="card-body">
                <div className="card-inner-body">
                  <div>
                    <img src={item.avatar} alt="profile" />
                  </div>
                  <div className="ml">
                    <h5 className="card-title">{item.firstName}{item.lastName}</h5>
                    <p className="text-muted mb-0">{item.email}</p>
                  </div>
                </div>
                <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const prisma = new PrismaClient();
export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      contacts
    }
  }
}