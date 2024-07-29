import {React, useEffect, useState} from 'react'
import TopBar from './Topbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Users() {

  let [data,setData]=useState([])
  let navigate=useNavigate()
  
  const getData=async()=>{
    try{
      let res= await axios.get("https://6678ff700bd4525056209675.mockapi.io/api/v1/users")
      console.log(res)
      if (res.status===200){
        setData(res.data)
        toast.success("User Data fetched")
      }
      
    }
    catch(error){
      console.log(error.response.data)
      toast.error(error.response.data)
    }
    
  }

  const handledelete=async(id)=>{
    try{
      let res= await axios.delete(`https://6678ff700bd4525056209675.mockapi.io/api/v1/users/${id}`)
      console.log(res)
      if (res.status===200){        
        toast.success("User Data fetched")
        getData()
      }
      
    }
    catch(error){
      console.log(error.response.data)
      toast.error(error.response.data)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return <>
  <TopBar/>
  <h5>Users List</h5>
  <div className='container'>
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Emp Number</th>
          <th>Role</th>
          <th>City</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e)=>{
            return <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.Name}</td>
              <td>{e.Age}</td>
              <td>{e.Email}</td>
              <td>{e.Emp_num}</td>
              <td>{e.Role}</td>
              <td>{e.City}</td>
              <td>
                <Button variant='primary' onClick={()=>navigate(`/create/${e.id}`)}>Edit</Button>
                &nbsp;
                &nbsp;      
                <Button variant='danger' onClick={()=>handledelete(e.id)}>Delete</Button>
              </td>
            </tr>
          })
        }
      </tbody>
  </Table>
  </div>
  </>
}

export default Users
