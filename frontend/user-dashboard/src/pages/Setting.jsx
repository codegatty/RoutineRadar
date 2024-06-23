import React from 'react';

function Setting() {

  function difficultyHandler(e){
    console.log(e.target.value)

    switch(e.target.value){
      
    }
  }
  return (
    <div className="flex flex-col items-center mx-auto p-4 text-app-blue">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Difficulty Level</h2>
        <div className="mb-2">
          <label className="mr-2">Set difficulty level of Routine task score</label>
          <select className="border rounded p-1 bg-primary" onChange={difficultyHandler}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>



    </div>
  );
}

export default Setting;
