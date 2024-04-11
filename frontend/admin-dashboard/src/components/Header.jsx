import DropDownMenu from '../UIComponents/DropDownMenu'

function Header() {
  return (
    <div className="bg-white h-24 flex flex-row justify-between items-center px-5 ">
      <div className=''>
        <h1 className='text-center text-3xl'>Admin panel</h1>
      </div>
      <div>
        <DropDownMenu />
      </div>
    </div>
  )
}

export default Header
