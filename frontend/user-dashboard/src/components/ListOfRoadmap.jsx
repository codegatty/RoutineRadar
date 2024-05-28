import Title from "../UIComponents/Title"
function ListOfRoadmap({maps,onSelect}) {

    function selectHandler(id){
        onSelect(id)
    }

  return (
    <div  className='bg-secondary p-2 w-full  h-full '>
      <Title className="text-primary text-center">List Of SubTasks</Title>
      <ul className='text-primary h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary'>
        {maps?.map((roadMap,index)=>{
          return <li key={index} onClick={selectHandler.bind(this,roadMap._id)} className=" cursor-pointer flex flex-row">
            <div className="flex flex-col p-3 w-full justify-center  hover:bg-primary capitalize">
            <span className="font-semibold"> {roadMap.title}</span>
            <span className="text-sm"> {roadMap.description}</span>
            
            </div>
            </li>
        })}
      </ul>
    </div>
  )
}

export default ListOfRoadmap
