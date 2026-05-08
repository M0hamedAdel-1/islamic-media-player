
const PrayerTimes = () => {
  return (
    <div className="w-full min-h-screen bg-gray-800 p-6">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-3 text-white">
          مواقيت الصلاه
        </h1>

        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            {/* text */}
            <div className="text-white space-y-1">
              <h2 className="text-xl font-bold">القليوبية</h2>
              <p className="text-sm text-white/80">
                الأربعاء 19 ذو القعدة 1447 | 06-05-2026
              </p>
            </div>

            {/* select */}
            <div>
              <select className="w-48 sm:w-56 p-2 rounded-lg border border-white/50 bg-transparent text-white focus:outline-none">
                <option className="text-black">القليوبية</option>
                <option className="text-black">القاهرة</option>
                <option className="text-black">الجيزة</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 lg:grid-cols-3  gap-4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden  text-center">
              <h2 className="bg-gray-100 p-3 text-blue-500 font-bold">الفجر</h2>
              <p className="py-6 text-lg font-medium text-slate-700">4:31 ص</p>
              <p className="bg-blue-500 text-white py-2 font-medium">تم</p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden  text-center">
              <h2 className="bg-gray-100 p-3 text-blue-500 font-bold">الفجر</h2>
              <p className="py-6 text-lg font-medium text-slate-700">4:31 ص</p>
              <p className="bg-blue-500 text-white py-2 font-medium">تم</p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden  text-center">
              <h2 className="bg-gray-100 p-3 text-blue-500 font-bold">الفجر</h2>
              <p className="py-6 text-lg font-medium text-slate-700">4:31 ص</p>
              <p className="bg-blue-500 text-white py-2 font-medium">تم</p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden  text-center">
              <h2 className="bg-gray-100 p-3 text-blue-500 font-bold">الفجر</h2>
              <p className="py-6 text-lg font-medium text-slate-700">4:31 ص</p>
              <p className="bg-blue-500 text-white py-2 font-medium">تم</p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden  text-center">
              <h2 className="bg-gray-100 p-3 text-blue-500 font-bold">الفجر</h2>
              <p className="py-6 text-lg font-medium text-slate-700">4:31 ص</p>
              <p className="bg-blue-500 text-white py-2 font-medium">تم</p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden  text-center">
              <h2 className="bg-gray-100 p-3 text-blue-500 font-bold">الفجر</h2>
              <p className="py-6 text-lg font-medium text-slate-700">4:31 ص</p>
              <p className="bg-blue-500 text-white py-2 font-medium">تم</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
