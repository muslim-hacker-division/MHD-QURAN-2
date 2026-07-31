// Interface untuk Surat dan Ayat
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  surah?: Surah;
}

// Daftar 5 bahasa yang didukung beserta edisi API-nya
export const LANGUAGES = [
  { code: 'id', name: 'Indonesia', edition: 'id.indonesian' },
  { code: 'en', name: 'English', edition: 'en.sahih' },
  { code: 'tr', name: 'Türkçe', edition: 'tr.ozturk' },
  { code: 'ur', name: 'اردو', edition: 'ur.jalandhry' },
  { code: 'ar', name: 'العربية (Tafsir/Asli)', edition: 'ar.muyassar' }
];

// Mengambil daftar seluruh surat (1 - 114)
export async function fetchSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Gagal memuat daftar surat:', error);
    return [];
  }
}

// Mengambil detail ayat suatu surat berdasarkan nomor surat dan edisi bahasa
export async function fetchSurahDetail(surahNumber: number, edition: string) {
  try {
    // Kita ambil teks Arab asli (quran-uthmani) dan terjemahan bahasa pilihan secara paralel
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${edition}`)
    ]);

    const arabicData = await arabicRes.json();
    const translationData = await translationRes.json();

    return {
      surahInfo: arabicData.data,
      arabicAyahs: arabicData.data.ayahs,
      translationAyahs: translationData.data.ayahs,
    };
  } catch (error) {
    console.error('Gagal memuat detail surat:', error);
    return null;
  }
}
