import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices';
import Spinner from '../../Spinner/Spinner';
const EditContact = () => {
  let navigate = useNavigate()
  let { contactID } = useParams();
  let [state, setstate] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      contact: "",
      Email: "",
      title: "",
      company: "",
      group:""
    },
    groups: [],
    errorMessage: ''
  })

  useEffect(() => {
    setstate({ ...state, loading: true })
    let prom = new Promise((res, rej) => {
      let respones = ContactServices.getContact(contactID);
      res(respones);
    })
    prom.then(async (Res1) => {
      console.log(Res1.data);
      setstate({ ...state, loading: false, contact: Res1.data })
      const resp2 = await new Promise((res1, rej1) => {
        let groupsResponse = ContactServices.getgroups();
        res1(groupsResponse);
      });
      console.log(resp2);
      setstate({ ...state, loading: false, contact: resp2.data, groups: resp2.data });
    })
  }, [contactID])
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
      let putContact = ContactServices.updateContact(state.contact,contactID)
      res(putContact)
    })
    prom.then((resp1) => {
      if (resp1) {
        //setState({...state,contact:resp1.data})
        navigate('/contact/list', { replace: true })
      }
    }).catch((error) => {
      setstate({ ...state, loading: false, errorMessage: error })
      navigate(`/contact/edit/${contactID}`,{replace:false})
      alert(`data not found`);
    })
  }
  let { groups, contact, loading, errorMessage } = state
  return (
    <div>

      {
        loading ? <Spinner /> :
          <section className="edit-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 fw-bold text-primary"><i class="fa-solid fa-user-pen" /> Edit Contact</p>
                  <p className="fst-italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo odio tempore facilis veritatis sequi provident autem dolores, id enim quibusdam eius mollitia iure fugit aut repellat quos accusamus ducimus non? Tempore totam quae corrupti laudantium!</p>
                </div>
              </div>


              <div className="row">
                <div className="col-md-4">
                  <form action="" onSubmit={submitFrom}>
                    <div className="mb-2">
                      <input type="text" name="name" value={contact.name} required={true} onChange={UpdateInput} id="" className='form-control' placeholder='Name' />
                    </div>
                    <div className="mb-2">
                      <input type="text" name="photo" value={contact.photo} required={true} onChange={UpdateInput} id="" className='form-control' placeholder='Photo URL' />
                    </div>
                    <div className="mb-2">
                      <input type="number" name="contact" value={contact.contact} required={true} onChange={UpdateInput} id="" className='form-control' placeholder='Mobile Number' />
                    </div>
                    <div className="mb-2">
                      <input type="email" name="Email" id="" value={contact.Email} required={true} onChange={UpdateInput} className='form-control' placeholder='Email' />
                    </div>
                    <div className="mb-2">
                      <input type="text" name="Title" id="" value={contact.title} required={true} onChange={UpdateInput} className='form-control' placeholder='Title' />
                    </div>
                    <div className="mb-2">
                      <input type="text" name="company" id="" value={contact.company} required={true} onChange={UpdateInput} className='form-control' placeholder='Company' />
                    </div>
                    <div className="mb-2">
                      <select name="groups" id="" value={groups.id} className='form-control' >
                        <option value=""> Select A group</option>
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
                    <div className="md-4">
                      <input type="submit" value={"update"} className='btn btn-primary' />
                      <Link className='btn btn-outline-danger ms-3' to={'/'}><i className='fa fa-cancel' /> Cancel</Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img src={contact.photo} alt="" className='img-avtar' />
                </div>
              </div>
            </div>

          </section>
      }

    </div>
  )
}

export default EditContact
