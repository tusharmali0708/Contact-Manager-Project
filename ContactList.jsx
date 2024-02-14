import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ContactList = () => {
  let [state, setstate] = useState({
    loading: false,
    contacts: [],
    errorMessage: ''
  })

  useEffect(() => {
    let prom1 = new Promise((res1, rej1) => {
      setstate({ ...state, loading: true, contacts: [] })


      let respones = ContactServices.getAllContact();

      res1(respones)
      // rej1()
    })
    prom1.then((resp1) => {
      setstate({ ...state, loading:false, contacts:resp1.data })
      console.log(resp1.data);
    }).catch((error) => {
      setstate({ ...state, loading:false, errorMessage: error.message })
      alert("data is not found")
    })
  }, [])
  let clickDelet=(contactID)=>{
    let prom = new Promise((res,rej)=>{
      let respones = ContactServices.deleteContact(contactID);
      res(respones)
    })
    prom.then((resp1)=>{
      if(resp1){
        let prom1 = new Promise((res1, rej1) => {
          setstate({ ...state, loading: true, contacts: [] })
    
    
          let respones = ContactServices.getAllContact();
    
          res1(respones)
          // rej1()
        })
        prom1.then((resp1) => {
          setstate({ ...state, loading:false, contacts:resp1.data })
          console.log(resp1.data);
        }).catch((error) => {
          setstate({ ...state, loading:false, errorMessage: error.message })
          alert("data is not found")
        })
      }
    })
  }
  let { loading, contacts, errorMessage } = state
  return (
    <div>
      <React.Fragment>

        <section className="contact-search p-3">
          <div className="container">
            <div className="grid">
              {/* row -1  */}
              <div className="row">
                <div className="col">
                  <p className='h3 fw-bold'><i class="fa-solid fa-address-book" /> Contact Manager <Link className='btn btn-primary ms-2' to={'/contact/add'}><i className='fa fa-add' /> Add</Link></p>
                  <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum impedit aliquid maxime nulla autem deleniti, repellendus laborum, voluptatibus earum ea voluptatum quae minus laudantium tempora perferendis. At sit totam libero ipsa dolorum sapiente quas voluptates?</p>
                </div>
              </div>
              {/* ROw -2 */}
              <div className="row">
                <div className="col-md-6">
                  <form action="" className="row">
                    <div className="col-md-8">
                      <div className="mb-2">
                        <input type="text" name="" id="" className="form-control" placeholder='Search Contact' />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-2">
                        <input type="submit" className="btn btn-outline-dark" value={"Search"} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* section -2 */}
        {
          loading ? <Spinner /> :
            <React.Fragment>
              <section className="contact-list">
                <div className="container">
                  <div className="row">
                    {
                      contacts.length > 0 &&
                      contacts.map((contact) => {
                        return (
                          <>
                            <div className="col-md-6 mb-2" key={contact.id}>
                              <div className="card">
                                <div className="card-body">
                                  <div className="row align-items-center">
                                    <div className="col-md-4">
                                      <img src={contact.photo} alt="" className='img-avtar' />
                                    </div>
                                    <div className="col-md-7">
                                      <ul className='list-group'>
                                        <li className='list-group-item list-group-item-action'>
                                          Name: <span className='fw-bold'>{contact.name}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                          Contact: <span className='fw-bold'>{contact.contact}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                          Email: <span className='fw-bold'>{contact.Email}</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-md-1 d-flex flex-column align-items-center">
                                      <Link to={`/contact/view/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-eye' /></Link>
                                      <Link to={`/contact/edit/${contact.id}`} className='btn btn-primary my-1'><i className='fa fa-pen' /></Link>
                                      <button className='btn btn-danger' onClick={()=>{clickDelet(contact.id)}}><i className='fa fa-trash my-1' /></button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })
                    }

                  </div>
                </div>
              </section>
            </React.Fragment>
        }

      </React.Fragment>
    </div>
  )
}

export default ContactList
