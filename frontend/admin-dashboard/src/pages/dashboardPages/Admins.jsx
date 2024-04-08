import React from 'react'
import {useNavigate} from 'react-router-dom'

import Button from '../../UIComponents/Button'

function Admins() {
  const navigator=useNavigate();
  function createAdminHandler(){
    navigator("/dashboard/admins/admin")
    
  }
  return (
    <div>
     <Button className="mt-5 ml-10" onClick={createAdminHandler}>Create new Admin</Button>
    </div>
  )
}

export default Admins
