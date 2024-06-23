import classnames from 'classnames'

function CountCard({label,count,disabled,carryFloat}) {
  let disabledStyle=""
  if(disabled){
    disabledStyle="text-slate-500 bg-secondary"
  }else{
    disabledStyle=""
  }
  return (
    <div>
        <div className={classnames("bg-app-blue p-3 rounded-lg flex-1 m-5 flex justify-center items-center gap-2",disabledStyle)}>
            <span className='flex-1 font-thin text-sm'>{label}</span> <span className='flex-2 text-blue-700 font-bold'>{carryFloat?parseFloat(count).toFixed(2):count}</span>
          </div>
    </div>
  )
}

export default CountCard
