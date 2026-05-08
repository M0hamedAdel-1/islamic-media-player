import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import SelectInput from "../inputs/SelectInput";
import { Loader } from "lucide-react";

const Quran = () => {
  const [reciters, setreciters] = useState([]);
  const [rwayat, setrwayat] = useState([]);
  const [loading, setloading] = useState(false);
const [idreciter, setidreciter] = useState("");
  const [suwar, setSuwar] = useState([]);

  const [filteredSuwar, setFilteredSuwar] = useState([]);
const [selectedMoshaf, setSelectedMoshaf] = useState(null);
const [selectedRiwaya, setSelectedRiwaya] = useState("");
const [selectedSurah, setSelectedSurah] = useState("");

  const language = "ar";

  useEffect(() => {
    const getreciters = async () => {
      setloading(true);
      try {
        const fetchdata = await axiosInstance.get(
          `reciters?language=${language}`,
        );
        setreciters(fetchdata.data);
      } catch (e) {
        console.log(e);
      } finally {
        setloading(false);
      }
    };
    getreciters();
  }, []);

  useEffect(() => {
    if (!idreciter) return;

    const getRwayat = async () => {
      try {
        const res = await axiosInstance.get(
          `reciters?language=${language}&reciter=${idreciter}`,
        );

        setrwayat(res.data.reciters[0].moshaf);
        
        
      } catch (err) {
        console.log(err);
      }
    };

    getRwayat();
  }, [idreciter]);





  useEffect(() => {
    axiosInstance
      .get("https://mp3quran.net/api/v3/suwar")
      .then((res) => {
        setSuwar(res.data.suwar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

// console.log((suwar));



const getsuher =(moshafId)=>{
   const selected = rwayat.find(
    (item) => item.id === Number(moshafId)
  );
  // console.log(selected.server);
  
    setSelectedMoshaf(selected);
    if (!selected) return;

      const surahIds = selected.surah_list
    .split(",")
    .map(Number);
 const filtered = suwar.filter((sura) =>
    surahIds.includes(Number(sura.id))
  );

  setFilteredSuwar(filtered);    

  
}




 if(loading) <Loader/>
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-100 flex items-center justify-center px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-8">
          القرآن الكريم
        </h1>

        <div className="bg-white/70 shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200">
          {/* selects */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right"
            dir="rtl"
          >
            <div>
              <h2 className="text-slate-700 mb-2 font-medium">اختر قارئ</h2>
              <SelectInput
  data={reciters?.reciters}
  placeholder="اختر قارئ"
  value={idreciter}
  onChange={(e) => {
    setidreciter(Number(e.target.value));

    setSelectedRiwaya("");
    setSelectedSurah("");
    setFilteredSuwar([]);
  }}
/>
            </div>
            <div>
              <h2 className="text-slate-700 mb-2 font-medium">اختر رواية</h2>

              <SelectInput
  data={rwayat}
  placeholder="اختر رواية"
  value={selectedRiwaya}
  onChange={(e) => {
    setSelectedRiwaya(e.target.value);

    getsuher(e.target.value);

    setSelectedSurah("");
  }}
/>
            </div>

            <div>
              <h2 className="text-slate-700 mb-2 font-medium">اختر سورة</h2>
              
               <select
  value={selectedSurah}
  onChange={(e) => setSelectedSurah(e.target.value)}
  className="w-full p-2 border-2 border-black text-black rounded-lg"
>
  <option value="">
    اختر سورة
  </option>

  {filteredSuwar?.map((item) => {
    const padded = String(item.id).padStart(3, "0");

    return (
      <option
        key={item.id}
        value={`${selectedMoshaf.server}${padded}.mp3`}
      >
        {item.name}
      </option>
    );
  })}
</select>
            </div>
          </div>

          {/* audio */}
          <div className="mt-10">
            <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm p-4 ">
              <audio
                controls
                className="w-full accent-emerald-600"
                src={selectedSurah}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
