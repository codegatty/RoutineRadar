import classNames from "classnames";
function Button({children,className,onClick}){
    if(!className){
        className = "";
    }
    const defaultClasses="mt-5 bg-neutral-200 text-xl p-3 rounded-lg hover:bg-neutral-900 hover:text-white"
    return(
        <button className={classNames(defaultClasses,className)} onClick={onClick}>{children}</button>
    );
}

export default Button;