import { createContext,useReducer } from "react";

export const AdminsContext=createContext({
    admins:[],
    addAdmin:(admin)=>{},
    updateAdmin:(id,admin)=>{},
    deleteAdmin:(id)=>{},
    storeAdmins:(admins)=>{},
})

function adminReducer(state,action){
    switch(action.type){
        case 'ADD':
            return [...state,action.payload]
        case 'UPDATE':
            const updateAdminIndex=state.findIndex((admin)=>admin.id===action.payload.id);
            const updateAdmin = state[updateAdminIndex];
            const updatedAdmin={...updateAdmin,...action.payload.adminData};
            const updateAdminData = [...state];
            updateAdminData[updateAdminIndex]=updatedAdmin;
            return updateAdminData;
        case 'STORE':
            const inverted=action.payload.reverse();
            return inverted;
        case 'DELETE':
            const newState=state.filter((ele)=>ele.id!==action.payload)
            return newState;
    }
}

function AdminsContextProvider({children}){
    const [adminState,dispatch]=useReducer(adminReducer,[]);

    function addAdmin(admin){
        dispatch({type:'ADD',payload:admin})

    }

    function updateAdmin(id,admin){
        dispatch({type:'UPDATE',payload:{id:id,adminData:admin}})

    }

    function deleteAdmin(id){
        dispatch({type:'DELETE',payload:id})

    }

    function storeAdmins(admins){
        dispatch({type:'STORE',payload:admins});
    }

    const values={
        admins:adminState,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        storeAdmins
    }

    return (
        <AdminsContext.Provider value={values}>
            {children}
        </AdminsContext.Provider>
    )
}

export default AdminsContextProvider;