import React, { useState } from 'react'
import Head from 'next/head';
import Image from 'next/image'
import baseUrl from '../baseUrl'
import { useContact } from '../utils/hooks';
import { mutate } from 'swr';
import { deleter, fetcher } from '../utils/fetcher';

export default function Home() {
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [url, seturl] = useState('')
  const { contacts } = useContact()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetcher('/api/contacts', {
      firstName: fname,
      lastName: lname,
      email: email,
      avatar: url
    })
    // we include "false" here to ask SWR not to revalidate the cache with
    // the feed returned from the server. we'll remove this after the next section
    mutate(
      '/api/contacts',
      [{
        firstName: fname,
        lastName: lname,
        email: email,
        avatar: url
      }, ...contacts],
      false
    );
    setfname('')
    setlname('')
    setemail('')
    seturl('')

    // let res = await Axios.post(`${baseUrl}/api/contacts`, {
    //   firstName: fname,
    //   lastName: lname,
    //   email: email,
    //   avatar: url
    // })
    // if (res.data.status) {
    //   setfname('')
    //   setlname('')
    //   setemail('')
    //   seturl('')
    // }
  }

  const handleDelete = async (userId) => {
    mutate(
      '/api/contacts',
      contacts.filter(item => item.id != userId)
      ,
      false
    );
    deleter(`/api/${userId}/delete`)
    // try {
    //   await Axios.delete(`${baseUrl}/api/${userId}/delete`)
    // } catch (err) {
    //   console.log(err)
    // }
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
          {contacts && contacts.map((item, key) => (
            <div className="card mb-2 shadow-" key={key}>
              <div className="card-body">
                <div className="card-inner-body">
                  <div>
                    <Image src={item.avatar} width={55} height={55} className="rounded-circle" alt="profile" />
                  </div>
                  <div className="ml">
                    <h5 className="card-title">{item.firstName} {item.lastName}</h5>
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
