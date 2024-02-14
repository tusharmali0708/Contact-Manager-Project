import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'


const AddContact = () => {
  let navigate = useNavigate();
  let [state, setstate] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      contact: "",
      Email: "",
      title: "",
      company: "",
      group:''
    },
    groups: [],
    errorMessage: ''
  })
  useEffect(() => {
    let prom = new Promise((res, rej) => {
      setstate({ ...state, loading: true })
      let groupRespones = ContactServices.getgroups()
      res(groupRespones)
    })
    prom.then((resp1) => {
      setstate({ ...state, loading: false, groups: resp1.data })
      console.log(resp1.data);
    }).catch((error) => {
      setstate({ ...state, loading: false, errorMessage: error })
    })
  }, [])

  let UpdateInput = (event) => {
    setstate({
      ...state, contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })
  }

  let submitFrom = (event) => {
    event.preventDefault();
    let prom = new Promise((res, rej) => {
      let postContact = ContactServices.createContact(state.contact)
      res(postContact)
    })
    prom.then((resp1) => {
      if (resp1) {
        navigate('/contact/list', { replace: true })
      } else {
        navigate('/contact/add', { replace: false })
      }
    })
  }

  let { loading, contact, groups, errorMessage } = state
  return (
    <div>

      {/* <h1>Add contact</h1> */}
      <section className="create-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h3 text-success fw-bold'><i class="fa-solid fa-user" /> Create Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem omnis ut ad commodi sunt ullam animi asperiores ratione laborum culpa consequuntur eos praesentium quas magni, consequatur quibusdam autem iste! Sed dolorum saepe sint obcaecati deserunt.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form action="" onSubmit={submitFrom}>
                <div className="mb-2">
                  <input type="text" name="name" value={contact.name} id="" placeholder='Name' required={true} onChange={UpdateInput} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name="photo" value={contact.photo} id="" placeholder='Photo URL' required={true} onChange={UpdateInput} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="number" name="contact" value={contact.contact} id="" placeholder='Mobile Number' required={true} onChange={UpdateInput} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="email" name="Email" value={contact.Email} id="" placeholder='Email' required={true} onChange={UpdateInput} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name="title" value={contact.title} id="" placeholder='Title' required={true} onChange={UpdateInput} className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name="company" value={contact.company} id="" placeholder='Company' required={true} onChange={UpdateInput} className='form-control' />
                </div>
                <div className="mb-2">
                  <select name="" id="" className='form-control' required={true}>
                    <option value=""> select a group </option>
                    {
                      groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" value={"Create"} className='btn btn-success' />
                  <Link className='btn btn-outline-danger ms-3' to={'/'}><i className='fa fa-cancel' /> Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddContact
