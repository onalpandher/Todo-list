import React, { useEffect, useState } from 'react'

const Todo = () => {
    const[todos,setTodos]=useState([]);
    const[isVisible, setVisible]=useState(false);
    const[inputVal, setInputVal]=useState('');
    const[isSearching, setSearching]=useState(false);
    useEffect(()=>{
        async function fetchApi(){
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            // console.log(await response.json());
            let result = await response.json();

            setTodos(()=>([
                  ...result
            ]))
        }
        fetchApi();
        setVisible(true);
    },[]);
    const mapData= todos.map((item,index)=>{
      return(
        <div key={index}>
          <hr />
          <br />
          <h3>Id:{item.id}</h3>
          <h3 style={{display:'inline'}}>Title:</h3><span><p style={{display:'inline'}}>{item.title}</p></span>
          <h5>Completed:{item.completed?'Yes':'No'}</h5>
        </div>
      )
    })
    const handleInput=(e)=>{
      setInputVal(e.target.value)
    }
    const handleSearch=()=>{
      setSearching(!isSearching);
      todos.filter((item,index)=>{
        if(item.title == inputVal || item.id == inputVal){
          
            let filterData=
            <div key={index}>
              <hr />
              <br />
              <h3>Id:{item.id}</h3>
              <h3 style={{display:'inline'}}>Title:</h3><span><p style={{display:'inline'}}>{item.title}</p></span>
              <h5>Completed:{item.completed?'Yes':'No'}</h5>
            </div>
            return(filterData)
          
        }
        else if(item.title!=inputVal|| item.id!=inputVal){
          return(<h2>No such Task Available</h2>)
        }
        else{
          return(mapData);
        }
      })
      console.log('button clicked');
    }
  return (
    <div>
      <h2>TODO APP</h2>
      {isVisible?
      <>
      <input placeholder='Enter id or title to search' onInput={handleInput}/>
      <button onClick={handleSearch}>Search</button>
      </>
    :  
    null
    }
      {mapData}
    </div>
  )
}

export default Todo


