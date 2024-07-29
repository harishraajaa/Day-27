import React,{useEffect, useState} from 'react'
import TopBar from './Topbar'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useNavigate,useParams } from 'react-router-dom';

function Create() {

  const navigate = useNavigate()
  const {id} = useParams()

  const [initialState,setInitialState] = useState({
    Name:'',
    Age:'',
    Email:'',
    Role:'',
    City:'',
    Emp_num:''
  })
  const UserSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    Email: Yup.string().email('Invalid email').required('Required'),
    Age: Yup.number().required('Required'),
    Emp_num:Yup.number().required('Required'),
    Role: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    City:Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  });

  const handleCreate = async(values)=>{
    try {
      
      let res = await axios.post("https://6678ff700bd4525056209675.mockapi.io/api/v1/users",values)
      if(res.status===201)
      { 
        console.log(res)
        toast.success("User Created Successfully")
        navigate('/users')
      }
    } catch (error) {
      toast.error(error.request.statusText)
    }
  }

  const handleEdit = async(values)=>{
    try {
      
      let res = await axios.put(`https://6678ff700bd4525056209675.mockapi.io/api/v1/users/${id}`,values)
      if(res.status===200)
      { 
        //console.log(res)
        toast.success("User Edited Successfully")
        navigate('/users')
      }
    } catch (error) {
      toast.error(error.request.statusText)
    }
  }

  let formik = useFormik({
    initialValues:initialState,
    enableReinitialize:true,
    validationSchema:UserSchema,
    onSubmit: values => {
      if(id)
        {
          handleEdit(values)
        }
        else
        {
          handleCreate(values)
        }
      }
    }
  )

  const getData=async()=>{
    try{
      let res= await axios.get(`https://6678ff700bd4525056209675.mockapi.io/api/v1/users/${id}`)
      console.log(res)
      if (res.status===200){
        setInitialState({
          Name:res.data.Name,
          Age:res.data.Age,
          Email:res.data.Email,
          Role:res.data.Role,
          City:res.data.City,
          Emp_num:res.data.Emp_num
        })
        toast.success("User Data fetched")
      }
      
    }
    catch(error){
      console.log(error.response.data)
      toast.error(error.response.data)
    }
    
  }


  useEffect(()=>{
    if(id)
    {
      getData(id)
    }
  },[])

  return <>
  <TopBar/>
  <div>
     <h5>Add/Edit User</h5>
     <div className='container'>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" id='Name' name='Name' value={formik.values.Name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.name && formik.errors.name ?<div style={{color:"red"}}>{formik.errors.name}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="Enter Age" id='Age' name='Age' value={formik.values.Age} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.age && formik.errors.age ?<div style={{color:"red"}}>{formik.errors.age}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" id='Email' value={formik.values.Email} name='Email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ?<div style={{color:"red"}}>{formik.errors.email}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Employee Number</Form.Label>
        <Form.Control type="number" placeholder="Enter Employee Number" id='Emp_num' value={formik.values.Emp_num} name='Emp_num' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.Emp_num && formik.errors.Emp_num ?<div style={{color:"red"}}>{formik.errors.Emp_num}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Control type="text" placeholder="Developer / Tester" id='Role' value={formik.values.Role} name='Role' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.Role && formik.errors.Role ?<div style={{color:"red"}}>{formik.errors.Role}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="Enter City" id='City' value={formik.values.City} name='City' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.City && formik.errors.City ?<div style={{color:"red"}}>{formik.errors.City}</div> : null}
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
    </div>
   </div>
  </>
}

export default Create