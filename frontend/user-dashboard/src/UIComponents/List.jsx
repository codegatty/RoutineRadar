import ListItem from "./ListItem";
function List({}){
  const dummy={name:"rajith",age:10};
  return (
    
      <div className="bg-slate-600 p-1 m-2">
        <ListItem data={dummy}/>
      </div>


  );
}

export default List;