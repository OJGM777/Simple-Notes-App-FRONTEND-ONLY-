import { FaArrowLeft } from "react-icons/fa6";

const Info = (Title, data) => {
  return (
    <div className='h-screen w-screen absolute bg-white text-slate-50'>
      <header className='w-screen'>
        <FaArrowLeft/>
      </header>
      <div>
        <h1 className='font-light'>{Title}</h1>
        <p className='w-[77%]'>{data}</p>
      </div>
    </div>
  )
}
export default Info
