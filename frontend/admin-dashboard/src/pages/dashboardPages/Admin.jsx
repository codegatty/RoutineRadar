import React from 'react'
import classNames from "classnames"
import Button from "../../UIComponents/Button"
function Admin() {
    const formSection="flex flex-row  my-10 mx-10 p-5 items-center justify-center gap-10"
    const label="flex-2 text-xl font-bold "
    const input="flex-1 border-neutral-500 border text-xl p-1 rounded-md"
  return (
    <div className="w-full h-full">
    <form>
        <div className={classNames(formSection)}>
        <label className={classNames(label)}>Name of Admin</label>
        <input className={classNames(input)} type="text" />
        </div>

        <div className={classNames(formSection)}>
        <label className={classNames(label)}>Email of admin</label>
        <input className={classNames(input)} type="email" />
        </div>

        <div className={classNames(formSection)}>
        <label className={classNames(label)}>Password</label>
        <input className={classNames(input)} type="password" />
        </div>

        <div className={classNames(formSection)}>
        <label className={classNames(label)}>Confirm password</label>
        <input className={classNames(input)} type="password"/>
        </div>
        <div className="flex items-center justify-around">
            <Button className="bg-neutral-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">Submit</Button>
            <Button className="bg-neutral-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">clear</Button>
        </div>
        
    </form>
</div>
  )
}

export default Admin
