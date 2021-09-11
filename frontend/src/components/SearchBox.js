import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  //since Search Box is embedded in the header we will not have direct access to props history so we will be using render prop.
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        style={{ width: '250px' }}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search{' '}
      </Button>
    </Form>
  )
}

export default SearchBox
