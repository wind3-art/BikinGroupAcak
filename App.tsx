
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import { Group, DistributionMode } from './types';
import { shuffleArray, chunkArray, splitIntoGroups } from './utils/shuffle';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [mode, setMode] = useState<DistributionMode>('per_member');
  const [countValue, setCountValue] = useState<number>(4);
  const [prefix, setPrefix] = useState<string>('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  const handleAcakKelompok = useCallback(() => {
    // Regex memisahkan berdasarkan baris baru atau koma
    const names = inputText
      .split(/[\n,]+/)
      .map(name => name.trim())
      .filter(name => name !== '');

    if (names.length === 0) {
      alert('Silakan masukkan daftar nama terlebih dahulu.');
      return;
    }

    if (countValue < 1) {
      alert('Nilai harus minimal 1.');
      return;
    }

    const shuffled = shuffleArray<string>(names);
    let chunks: string[][] = [];

    if (mode === 'per_member') {
      chunks = chunkArray<string>(shuffled, countValue);
    } else {
      // Pastikan jumlah kelompok tidak lebih banyak dari jumlah orang
      const actualGroupCount = Math.min(countValue, names.length);
      chunks = splitIntoGroups<string>(shuffled, actualGroupCount);
    }
    
    const groupNamePrefix = prefix.trim() || 'Kelompok';

    const formattedGroups: Group[] = chunks.map((members, index) => ({
      id: index + 1,
      name: prefix.trim() ? `${groupNamePrefix}-${index + 1}` : `${groupNamePrefix} ${index + 1}`,
      members
    }));

    setGroups(formattedGroups);
  }, [inputText, mode, countValue, prefix]);

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua data?')) {
      setInputText('');
      setCountValue(4);
      setPrefix('');
      setGroups([]);
    }
  };

  const copyToClipboard = () => {
    const text = groups
      .map(g => `${g.name}:\n${g.members.join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-12 flex flex-col">
      <Header />

      <main className="flex-grow max-w-2xl mx-auto w-full px-4 mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Input Nama */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Daftar Nama
            </label>
            <textarea
              className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="Masukkan nama...&#10;Contoh: Budi, Ani, Dedi atau per baris"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-2">
              * Bisa dipisah koma (,) atau baris baru (enter).
            </p>
          </div>

          {/* Mode Pemilihan */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3 text-sm">Metode Pembagian:</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setMode('per_member')}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'per_member' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Anggota per Kelompok
              </button>
              <button
                onClick={() => setMode('total_groups')}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'total_groups' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Banyaknya Kelompok
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Input Nilai Anggota/Kelompok */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                {mode === 'per_member' ? 'Target Anggota' : 'Target Kelompok'}
              </label>
              <input
                type="number"
                min="1"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                value={countValue}
                onChange={(e) => setCountValue(parseInt(e.target.value) || 0)}
              />
            </div>

            {/* Input Nama Kelompok */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Nama Awalan (Opsional)
              </label>
              <input
                type="text"
                placeholder="Misal: Jambu"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcakKelompok}
              className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg active:transform active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Acak Sekarang
            </button>
            <button
              onClick={handleReset}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 border border-red-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Hasil */}
        {groups.length > 0 && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-bold text-gray-800">Hasil Pembagian</h2>
              <button 
                onClick={copyToClipboard}
                className={`text-sm font-medium flex items-center gap-1 transition-colors ${isCopied ? 'text-green-600' : 'text-blue-600 hover:text-blue-800'}`}
              >
                {isCopied ? '✓ Tersalin!' : '⎘ Salin Hasil'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((group) => (
                <div key={group.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
                    <h3 className="font-bold text-blue-700">{group.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {group.members.length} Orang
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {group.members.map((member, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center gap-2 text-sm">
                        <span className="w-5 h-5 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} GuruGroup. Didesain untuk memudahkan guru di Indonesia.</p>
      </footer>
    </div>
  );
};

export default App;
