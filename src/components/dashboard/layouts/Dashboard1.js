import { BiMaleFemale } from "react-icons/bi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GiGraduateCap } from "react-icons/gi";
import { FaRegMoneyBill1 } from "react-icons/fa6";

const Dashboard1 = () => {

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 lg:w-2/4">
        <div className="bg-gray-800 px-8 py-10 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
          <div className="flex flex-col items-center">
            <BiMaleFemale className="bg-purple-200 text-purple-700 rounded-full sm:text-2xl md:text-4xl lg:text-8xl" />
            <div className="mt-6 text-center">
              <p className="text-base text-gray-300 font-bold uppercase">
               afs
              </p>
              <h3 className="text-white text-base mt-3 leading-relaxed">
                Total Students
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 px-8 py-10 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
          <div className="flex flex-col items-center">
            <LiaClipboardListSolid className="bg-blue-200 text-blue-700 rounded-full sm:text-2xl md:text-4xl lg:text-8xl" />
            <div className="mt-6 text-center">
              <p className="text-base text-gray-300 font-bold uppercase">
                Fetch data and give the length
              </p>
              <h3 className="text-white text-base mt-3 leading-relaxed">
                Total Exams
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 px-8 py-10 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
          <div className="flex flex-col items-center">
            <GiGraduateCap className="bg-yellow-200 text-yellow-700 rounded-full sm:text-2xl md:text-4xl lg:text-8xl" />
            <div className="mt-6 text-center">
              <p className="text-base text-gray-300 font-bold uppercase">
                Fetch data and give the length
              </p>
              <h3 className="text-white text-base mt-3 leading-relaxed">
                Graduate Students
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 px-8 py-10 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
          <div className="flex flex-col items-center">
            <FaRegMoneyBill1 className="bg-orange-200 text-orange-700 rounded-full sm:text-2xl md:text-4xl lg:text-8xl" />
            <div className="mt-6 text-center">
              <p className="text-base text-gray-300 font-bold uppercase">
                Fetch data and give the length
              </p>
              <h3 className="text-white text-base mt-3 leading-relaxed">
                Total Income
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div>{/* another part */}</div>
    </div>
  );
};

export default Dashboard1;
