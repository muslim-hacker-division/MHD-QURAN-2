import React, { useEffect, useState } from 'react';
import { fetchSurahs, fetchSurahDetail, LANGUAGES, Surah } from './services/quranApi';
import { BookOpen, Globe, Search, ArrowLeft, Sparkles } from 'lucide-react';

export default function App() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahDetail, setSurahDetail] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<string>('id.indonesian');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  // Ambil daftar surat saat pertama kali dibuka
  useEffect(() => {
    fetchSurahs().then((data) => {
      setSurahs(data);
      setLoading(false);
    });
  }, []);

  // Ambil detail surat saat surat atau bahasa dipilih
  useEffect(() => {
    if (selectedSurah !== null) {
      setLoadingDetail(true);
      fetchSurahDetail(selectedSurah, selectedLang).then((data) => {
        setSurahDetail(data);
        setLoadingDetail(false);
      });
    }
  }, [selectedSurah, selectedLang]);

  // Filter pencarian surat
  const filteredSurahs = surahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-emerald-500/20 px-4 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedSurah(null)}>
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                MHD Qur'an
              </h1>
              <p className="text-xs text-slate-400">Al-Qur'an Digital Multibahasa Profesional</p>
            </div>
          </div>

          {/* Pilihan Bahasa */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
            <Globe className="w-4 h-4 text-emerald-400" />
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.edition} className="bg-slate-900 text-slate-200">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {selectedSurah === null ? (
          // TAMPILAN DAFTAR SURAT
          <div>
            {/* Banner / Hero Kecil */}
            <div className="relative mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/20 shadow-xl overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Baca & Renungkan
                </span>
                <h2 className="text-2xl font-bold mb-2">"Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya."</h2>
                <p className="text-xs text-slate-400">Pilih surah di bawah ini untuk mulai membaca lengkap dengan terjemahan pilihan.</p>
              </div>
            </div>

            {/* Kotak Pencarian */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama surat (contoh: Al-Fatihah, Yasin, Al-Mulk)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all shadow-inner"
              />
            </div>

            {/* List Kartu Surat */}
            {loading ? (
              <div className="text-center py-20 text-emerald-400 animate-pulse font-medium">
                Memuat daftar surah...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    onClick={() => setSelectedSurah(surah.number)}
                    className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 p-4 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-emerald-500/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                        {surah.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                          {surah.englishName}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayat
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-arabic text-lg text-emerald-300 font-semibold">
                        {surah.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // TAMPILAN BACA AYAT SURAT
          <div>
            <button
              onClick={() => setSelectedSurah(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all mb-6 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Surat
            </button>

            {loadingDetail ? (
              <div className="text-center py-24 text-emerald-400 animate-pulse font-medium">
                Memuat ayat-ayat Al-Qur'an...
              </div>
            ) : surahDetail ? (
              <div>
                {/* Header Surah yang Sedang Dibuka */}
                <div className="text-center bg-slate-900/80 border border-emerald-500/20 p-8 rounded-2xl mb-8 shadow-xl">
                  <h2 className="text-3xl font-bold text-emerald-400 mb-2">
                    {surahDetail.surahInfo.englishName}
                  </h2>
                  <p className="text-sm text-slate-400 mb-4">
                    {surahDetail.surahInfo.englishNameTranslation} • {surahDetail.surahInfo.revelationType} • {surahDetail.surahInfo.numberOfAyahs} Ayat
                  </p>
                  <div className="text-4xl font-arabic text-emerald-200 font-bold mb-2">
                    {surahDetail.surahInfo.name}
                  </div>
                  {selectedSurah !== 9 && (
                    <div className="text-xl font-arabic text-slate-300 mt-6 pt-4 border-t border-slate-800">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                  )}
                </div>

                {/* List Ayat */}
                <div className="space-y-4">
                  {surahDetail.arabicAyahs.map((ayah: any, index: number) => {
                    const translation = surahDetail.translationAyahs[index]?.text || '';
                    return (
                      <div
                        key={ayah.number}
                        className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl shadow-sm space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                            {ayah.numberInSurah}
                          </span>
                          <span className="text-xs text-slate-500">
                            Juz {ayah.juz}
                          </span>
                        </div>

                        {/* Teks Arab */}
                        <div className="text-right">
                          <p className="text-2xl sm:text-3xl font-arabic leading-loose text-slate-100">
                            {ayah.text}
                          </p>
                        </div>

                        {/* Terjemahan */}
                        <div className="pt-3 border-t border-slate-800/60">
                          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                            {translation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-red-400">Gagal memuat detail surat.</div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        <p>MHD Qur'an Digital • Dibangun dengan Vite, React & Tailwind CSS</p>
      </footer>
    </div>
  );
}
