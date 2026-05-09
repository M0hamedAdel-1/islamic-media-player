import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const PrayerTimes = () => {
  const [PrayerTimes, setPrayerTimes] = useState({});
  const [city, setCity] = useState("Al Qāhirah");
  const [loading, setloading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const [useGeo, setUseGeo] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) return;

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });

        setUseGeo(true);
        setShowLocationPopup(false);
        setLoadingLocation(false);
      },
      (err) => {
        console.log(err);
        setLoadingLocation(false);
        setShowLocationPopup(false);
      },
    );
  };

  let cities = [
    { arName: "القاهرة", name: "Al Qāhirah", code: "EG-C" },
    { arName: "الدقهلية", name: "Ad Daqahlīyah", code: "EG-DK" },
    { arName: "البحر الأحمر", name: "Al Baḩr al Aḩmar", code: "EG-BA*" },
    { arName: "البحيرة", name: "Al Buḩayrah", code: "EG-BH" },
    { arName: "الفيوم", name: "Al Fayyūm", code: "EG-FYM" },
    { arName: "الغربية", name: "Al Gharbīyah", code: "EG-GH" },
    { arName: "الأسكندرية", name: "Al Iskandarīyah", code: "EG-ALX" },
    { arName: "الإسماعلية", name: "Ismailia", code: "EG-IS" },
    { arName: "الجيزة", name: "Giza", code: "EG-GZ" },
    { arName: "المنيا", name: "Al Minyā", code: "EG-MN" },
    { arName: "المنوفية", name: "Al Minūfīyah", code: "EG-MNF" },
    { arName: "القليوبية", name: "Al Qalyūbīyah", code: "EG-KB" },
    { arName: "الأقصر", name: "Al Uqşur", code: "EG-LX*" },
    { arName: "الوادي الجديد", name: "Al Wādī al Jadīd", code: "EG-WAD" },
    { arName: "السويس", name: "As Suways", code: "EG-SUZ" },
    { arName: "الشرقية", name: "Ash Sharqīyah", code: "EG-SHR" },
    { arName: "أسوان", name: "Aswān", code: "EG-ASN" },
    { arName: "أسيوط", name: "	Asyūţ", code: "EG-AST" },
    { arName: "بنى سويف", name: "Banī Suwayf", code: "EG-BNS" },
    { arName: "بور سعيد", name: "Būr Sa‘īd", code: "EG-PTS" },
    { arName: "دمياط", name: "Dumyāţ", code: "EG-DT" },
    { arName: "جنوب سيناء", name: "Janūb Sīnā", code: "EG-JS*" },
    { arName: "شمال سيناء", name: "Shamāl Sīnā", code: "EG-SIN" },
    { arName: "كفر الشيخ", name: "	Kafr ash Shaykh", code: "EG-KFS" },
    { arName: "مرسى مطروح", name: "Maţrūḩ", code: "EG-MT" },
    { arName: "قنا", name: "Qinā", code: "EG-KN" },
    { arName: "سوهاج", name: "Sohaj", code: "EG-SHG" },
  ];

  const prayers = PrayerTimes?.timings
    ? [
        { name: "الفجر", time: PrayerTimes.timings.Fajr },
        { name: "الظهر", time: PrayerTimes.timings.Dhuhr },
        { name: "العصر", time: PrayerTimes.timings.Asr },
        { name: "المغرب", time: PrayerTimes.timings.Maghrib },
        { name: "العشاء", time: PrayerTimes.timings.Isha },
      ]
    : [];

  const toDate = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") return null;

    const [h, m] = timeStr.split(":");

    const date = new Date();
    date.setHours(+h, +m, 0, 0);

    return date;
  };
  const getNextPrayer = (timings) => {
    const now = new Date();

    const prayers = [
      { name: "الفجر", time: timings.Fajr },
      { name: "الظهر", time: timings.Dhuhr },
      { name: "العصر", time: timings.Asr },
      { name: "المغرب", time: timings.Maghrib },
      { name: "العشاء", time: timings.Isha },
    ];

    const next = prayers.find((p) => {
      const date = toDate(p.time);
      return date && date > now;
    });

    return next;
  };
  useEffect(() => {
    if (!PrayerTimes?.timings) return;

    const update = () => {
      const next = getNextPrayer(PrayerTimes.timings);
      setNextPrayer(next);
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [PrayerTimes]);

  useEffect(() => {
    const getPrayerTimes = async () => {
      setloading(true);

      try {
        let url;

        if (useGeo && location) {
          url = `https://api.aladhan.com/v1/timings?latitude=${location.lat}&longitude=${location.lon}&method=5`;
        } else {
          url = `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}&method=5`;
        }

        const { data } = await axios.get(url);

        setPrayerTimes(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    getPrayerTimes();
  }, [location, city, useGeo]);

  const getRemainingTime = (timeStr) => {
    const [h, m] = timeStr.split(":");

    const now = new Date();

    const target = new Date();
    target.setHours(+h, +m, 0, 0);

    const diff = target - now;

    if (diff <= 0) return "انتهت";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  const formatTimeArabicFull = (timeStr) => {
    if (!timeStr) return "";

    let [hours, minutes] = timeStr.split(":");
    hours = Number(hours);

    if (hours === 0) return `12:${minutes} منتصف الليل`;
    if (hours < 12) return `${hours}:${minutes} صباحًا`;

    if (hours === 12) return `12:${minutes} ظهرًا`;

    return `${hours - 12}:${minutes} مساءً`;
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full min-h-screen bg-gray-800 p-6">
      <div className="container mx-auto">
        {showLocationPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl text-center w-[300px]">
              <h2 className="text-xl font-bold mb-3">نحتاج موقعك</h2>

              <p className="text-gray-600 mb-4">
                عشان نعرض مواقيت الصلاة بدقة حسب مكانك
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={getLocation}
                >
                  موافق
                </button>
              </div>
            </div>
          </div>
        )}
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-3 text-white">
          مواقيت الصلاه
        </h1>

        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            {/* text */}
            <div className="text-white space-y-1">
              <h2 className="text-xl font-bold mb-3">
                {cities.find((item) => item.name === city)?.arName}
              </h2>
              <p className="text-sm text-white/80">
                {PrayerTimes?.date ? (
                  <>
                    {PrayerTimes.date.hijri?.weekday?.ar}{" "}
                    {PrayerTimes.date.hijri?.day}{" "}
                    {PrayerTimes.date.hijri?.month?.ar}{" "}
                    {PrayerTimes.date.hijri?.year}
                    {" | "}
                    {PrayerTimes.date.gregorian?.date}
                  </>
                ) : (
                  "جاري تحميل التاريخ..."
                )}
              </p>
            </div>

            <div>
              <p className="text-white text-center">
                متبقي على صلاة {nextPrayer?.name}
              </p>

              <p className="text-white text-center text-2xl">
                {nextPrayer ? getRemainingTime(nextPrayer.time) : "..."}
              </p>
            </div>

            {/* select */}
            <div>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setUseGeo(false);
                }}
                className="w-48 sm:w-56 p-2 rounded-lg border border-white/50 bg-transparent text-white focus:outline-none"
              >
                <option value="" disabled>
                  اختر المدينة
                </option>

                {cities.map((item) => (
                  <option
                    key={item.code}
                    value={item.name}
                    className="text-black"
                  >
                    {item.arName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 lg:grid-cols-3 gap-4">
            {prayers?.map((prayer, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden text-center"
              >
                <h2 className="bg-gray-100 p-3 text-blue-500 font-bold">
                  {prayer?.name}
                </h2>

                <p className="py-6 text-lg font-medium text-slate-700">
                  {prayer.time ? formatTimeArabicFull(prayer.time) : "..."}
                </p>

                <p className="bg-blue-500 text-white py-2 font-medium">تم</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
