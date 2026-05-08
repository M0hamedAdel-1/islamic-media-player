import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
const Live = () => {
  const videoRef = useRef(null)
    const [channel, setChannel] = useState(
    // "https://win.holol.com/live/quran/playlist.m3u8"
    ""
  );




  useEffect(()=>{
    const video = videoRef.current
        if (!video) return;
    if(Hls.isSupported()){
      const hls = new Hls()
      hls.loadSource(channel)
      hls.attachMedia(video)
      return ()=>{
        hls.destroy()
      }
    }else if (
      video.canPlayType("application/vnd.apple.mpegurl")
    ) {
      video.src = channel;
    }
  },[channel])
  return (
    <div className="min-h-screen bg-[url('/images/الكعبه.jpg')] bg-cover bg-center">

      {/* overlay */}
      <div className="min-h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center">

        <div className="container mx-auto px-4 text-white">

          {/* header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              قناة البث المباشر
            </h1>

            <div className="flex flex-col sm:flex-row justify-center gap-4 font-medium">
              <button
                onClick={()=>setChannel("https://win.holol.com/live/sunnah/playlist.m3u8")}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
              >
                قناة السنة النبوية
              </button>

              <button
              onClick={()=>setChannel("https://win.holol.com/live/quran/playlist.m3u8")}
                
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
              >
                قناة القرآن الكريم
              </button>
            </div>
          </div>

          {/* video */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-black/80 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video ref={videoRef} controls className="w-full h-auto">
                {/* <source src="" type="video/mp4" /> */}
                {/* <source src="" type="video/ogg" /> */}
                متصفحك لا يدعم تشغيل الفيديو
              </video>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Live;