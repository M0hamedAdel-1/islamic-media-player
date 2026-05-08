import { useEffect, useState } from "react";
import SelectInput from "../inputs/SelectInput";
import { axiosInstance } from "../config/axios";
import Loader from "./Loader";

const Radio = () => {
  const [loading, setLoading] = useState(false);
  const [radios, setRadios] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const getRadios = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("radios");

        setRadios(res.data.radios);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getRadios();
  }, []);

  const selectedRadio = radios.find(
    (item) => item.id == selected
  );

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-white to-slate-100 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-8">
          الراديو
        </h1>

        <div className="bg-white/70 shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200">
          <div className="text-right" dir="rtl">
            <h2 className="text-slate-700 mb-6 font-bold">
              اختر قارئ
            </h2>

            <SelectInput
              placeholder="اختر اذاعة"
              value={selected}
              onChange={(e) =>
                setSelected(e.target.value)
              }
              data={radios}
            />
          </div>
            <div className="mt-5">
              <div className="p-5 border border-slate-200 rounded-xl">
                <audio
                  controls
                  className="w-full accent-emerald-600"
                  src={selectedRadio?.url}
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Radio;