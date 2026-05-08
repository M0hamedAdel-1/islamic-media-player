import { useEffect, useState } from "react";
import SelectInput from "../inputs/SelectInput";
import { axiosInstance } from "../config/axios";
import Loader from "./Loader";
const Tafseer = () => {
  const language = "ar";

  const [loading, setLoading] = useState(false);
  const [tafsir, setTafsir] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const getTafsir = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `tafsir?tafsir=1&language=${language}`,
        );

        setTafsir(res.data.tafasir.soar);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getTafsir();
  }, []);

  const selectedobj = tafsir.find((item) => item.id == selected);

  if (loading) return <Loader />;
  return (
    <div className="w-full min-h-screen  bg-gradient-to-r from-white to-slate-100 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl ">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-8 ">
          تفسير الطبري
        </h1>

        <div className="bg-white/70 shadow-lg rounded-2xl p-6  md:p-8 border border-slate-200">
          <div className="text-right" dir="rtl">
            <h2 className="text-slate-700 mb-6 font-bold">اختر سورة</h2>
            <SelectInput
              placeholder="اختر سوره"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              data={tafsir}
            />
          </div>

          <div className="mt-5">
            <div className="p-5 border border-slate-200 rounded-xl ">
              <audio
                controls
                className="w-full accent-emerald-600"
                src={`${selectedobj?.url}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tafseer;
