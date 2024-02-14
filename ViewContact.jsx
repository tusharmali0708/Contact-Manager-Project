import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ViewContact = () => {
  let { contactID } = useParams()
  let [state, setstate] = useState({
    loading: false,
    contact: {},
    errorMessage: ""
  })

  useEffect(() => {
    setstate({ ...state, loading: true })
    let prom = new Promise((res1, rej1) => {
      let respones = ContactServices.getContact(contactID)

      res1(respones)
      // rej1();
    })
    prom.then((resp1) => {
      setstate({ ...state, loading: false, contact: resp1.data })
      console.log(resp1.data);
    }).catch((error) => {
      setstate({ ...state, loading: false, errorMessage: error.message })
      alert("data is not found")
    })
  }, [contactID])
  let { loading, contact, errorMessage } = state
  return (
    <div>
      {/* <h1>View Contact</h1> */}
      {/* SECTION-1 */}
      <section className="view-contact">
        <div className="container p-3">
          <div className="row">
            <p className="h3 fw-bold">View Contact</p>
            <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sapiente doloribus alias, illo aliquam praesentium recusandae aspernatur natus exercitationem pariatur nesciunt fuga totam incidunt quos tenetur blanditiis id laboriosam laborum quidem quis accusantium est numquam.</p>
          </div>
        </div>
      </section>
      {/* section -2 */}
      {
        loading ? <Spinner /> : <React.Fragment>
          {
            Object.keys(contact).length > 0 &&
            <section className="view-contact-data">
              <div className="container">
                {/* row - 1 */}
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <img src={contact.photo} alt="" className='img-avtar' />
                  </div>
                </div>
                {/* row - 2 */}
                <div className="row d-flex justify-content-center">
                  <div className="col-md-6 my-3">
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
                      <li className='list-group-item list-group-item-action'>
                        Title: <span className='fw-bold'>{contact.title}</span>
                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Group: <span className='fw-bold'>{contact.group}</span>
                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Company: <span className='fw-bold'>{contact.company}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* row-3 */}
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <Link className='btn btn-outline-warning text-dark' to={'/'}>Back</Link>
                  </div>
                </div>
              </div>
            </section>

          }
        </React.Fragment>
      }

    </div>
  )
}

export default ViewContact
