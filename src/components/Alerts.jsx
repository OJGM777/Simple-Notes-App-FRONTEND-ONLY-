import {motion} from "framer-motion"

const Alert = ({handle, hide, message}) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed flex flex-col p-3 text-center z-[60] gap-4 w-[90%] rounded-lg text-gray-800 dark:text-gray-50 bottom-40 left-[5%] lg:left-[25%] lg:w-[50%]  bg-gray-200 dark:bg-[#161616]"
      >
        <div className='w-full  text-center'>
        <h4 className="">{message}</h4>
        <div className="w-full flex  gap-5 ml-10 mt-2 md:ml-24">
          <button
            className="bg-[#373fda] text-white p-2 rounded-lg w-1/3"
            onClick={handle}
          >
            Accept
          </button>
          <button
            className="bg-[#c3c3c6] dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded-lg w-1/3"
            onClick={hide}
          >
            Cancel
          </button>
        </div>
        </div>
      </motion.div>
    );
  };
export default Alert;
