import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import SelectInput from "../inputs/SelectInput";
import Loader from "./Loader";

const Tadabor = () => {
  const [loading, setLoading] = useState(false);
  const [tadabor, setTadabor] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const getTadabor = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(
          "https://www.mp3quran.net/api/v3/tadabor",
        );

        const data = Object.values(res.data.tadabor).flat();

        setTadabor(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getTadabor();
  }, []);

  console.log(tadabor);

  const selectedTadabor = tadabor.find((item) => item.id == selected);

  if (loading) return <Loader />;
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-white to-slate-100 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-8">
          الوقفات التدبرية
        </h1>

        <div className="bg-white/70 shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200">
          <div className="text-right" dir="rtl">
            <h2 className="text-slate-700 mb-6 font-bold">اختر تدبر</h2>

            <SelectInput
              placeholder="اختر تدبر"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              data={tadabor}
            />
          </div>

          {selectedTadabor && (
            <div className="mt-6" dir="rtl">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                {selectedTadabor.title}
              </h2>

              <video
                className="w-full md:w-[700px] mx-auto rounded-2xl"
                controls
                className="w-full rounded-2xl"
                src={selectedTadabor.video_url}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tadabor;
