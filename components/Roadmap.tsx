import React from 'react'

const Tutorials = () => {
   
 const url="https://images.unsplash.com/photo-1594897030264-ab7d87efc473?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
 return (
   
    <header>
      <div
        className="w-full bg-center bg-cover h-[39rem]"
        style={{
          backgroundImage: `url('${url}')`
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white lg:text-8xl">
               Coming Soon <br/>
            </h1>
            <p className='text-white font-semibold mt-[40px] text-2xl'>Page is under DEVELOPMENT</p>
            
          </div>
        </div>
      </div>
    </header>

 )

}

export default Tutorials