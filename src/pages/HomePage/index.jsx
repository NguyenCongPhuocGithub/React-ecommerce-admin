import { useState, useEffect } from "react"

const HomePage = () => {
  useEffect(()=> {
    document.title = 'Home Page';
  },[])

  const[count, setCount] = useState(0) 

  const handleClick = () => {
    setCount(count+1);
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center h-screen">
          <h1>Home Page</h1>
          <p>Đây là page kiểm tra thức Node.js</p>
          <p className="mb-2"><strong>Count:</strong> {count}</p>
          <button type="btn-primary" onClick={handleClick}>increase count</button>
        </div>
      </div>
    </>
  )
}

export default HomePage