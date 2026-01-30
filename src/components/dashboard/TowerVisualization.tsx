import React, { useMemo, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, User, Info } from 'lucide-react';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
// --- Types ---
type ApartmentStatus = 'registered' | 'empty';
interface Apartment {
  id: string;
  number: string;
  floor: number;
  status: ApartmentStatus;
}
interface Tower {
  id: string;
  name: string;
  floors: Apartment[][]; // Array of floors, each floor is array of apartments
}
// --- Mock Data Generator ---
const generateTowers = (): Tower[] => {
  const towers: Tower[] = [];
  const towerNames = ['1', '2', '3'];
  const numFloors = 12;
  const aptsPerFloor = 4;
  towerNames.forEach((name) => {
    const floors: Apartment[][] = [];
    // Build from bottom up (floor 1 to 12)
    for (let f = 1; f <= numFloors; f++) {
      const floorApts: Apartment[] = [];
      for (let a = 1; a <= aptsPerFloor; a++) {
        // Pad apartment number: 101, 102... 1201, 1202
        const aptNum = `${f}${a.toString().padStart(2, '0')}`;
        floorApts.push({
          id: `T${name}-F${f}-A${a}`,
          number: aptNum,
          floor: f,
          status: Math.random() > 0.4 ? 'registered' : 'empty' // 60% registered
        });
      }
      floors.push(floorApts);
    }
    towers.push({
      id: name,
      name: `Torre ${name}`,
      floors: floors.reverse() // Render top floors first visually
    });
  });
  return towers;
};
const towersData = generateTowers();
// --- Components ---
const ApartmentCell = ({
  apt,
  isMatch



}: {apt: Apartment;isMatch: boolean;}) => {
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        scale: isMatch ? 1.1 : 1,
        backgroundColor: isMatch ?
        '#fbbf24' // amber-400
        : apt.status === 'registered' ?
        '#ccfbf1' // teal-100
        : '#f5f5f4',
        borderColor: isMatch ?
        '#f59e0b' // amber-500
        : apt.status === 'registered' ?
        '#99f6e4' // teal-200
        : '#e7e5e4',
        boxShadow: isMatch ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none'
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className={`
        relative flex items-center justify-center h-8 w-full rounded border text-[10px] font-medium cursor-default
        ${isMatch ? 'z-10 text-amber-900 font-bold' : apt.status === 'registered' ? 'text-teal-700' : 'text-stone-400'}
      `}
      title={`Apto ${apt.number}`}>

      {apt.number}
    </motion.div>);

};
const TowerStructure = ({
  tower,
  searchTerm



}: {tower: Tower;searchTerm: string;}) => {
  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-[240px]">
      {/* Tower Label - On top of the roof */}
      <div className="mb-2 px-4 py-1.5 bg-stone-800 rounded-lg shadow-lg">
        <h3 className="text-lg lg:text-xl font-bold text-white tracking-wide">
          {tower.name}
        </h3>
      </div>

      {/* Roof Decoration */}
      <div className="w-full flex flex-col items-center">
        <div className="w-2 h-4 bg-stone-400 mb-[-2px]" /> {/* Antenna */}
        <div className="w-16 h-3 bg-stone-700 rounded-t-lg" /> {/* Top box */}
        <div
          className="w-full h-6 bg-stone-600 rounded-t-full relative overflow-hidden"
          style={{
            clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)'
          }}>

          {/* Roof details */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-stone-500 rounded-full" />
        </div>
      </div>

      {/* Building Body */}
      <div className="w-full bg-white border-x-2 border-stone-300 shadow-xl relative">
        {/* Decorative vertical lines */}
        <div className="absolute inset-y-0 left-2 w-[1px] bg-stone-100" />
        <div className="absolute inset-y-0 right-2 w-[1px] bg-stone-100" />

        <div className="p-3 space-y-2">
          {tower.floors.map((floor, i) =>
          <div key={i} className="grid grid-cols-4 gap-1.5">
              {floor.map((apt) => {
              const isMatch =
              searchTerm.length > 0 && apt.number.includes(searchTerm);
              return (
                <ApartmentCell key={apt.id} apt={apt} isMatch={isMatch} />);

            })}
            </div>
          )}
        </div>
      </div>

      {/* Base/Entrance */}
      <div className="w-[105%] h-6 bg-stone-800 rounded-b-lg flex items-end justify-center pb-1 shadow-md z-10">
        <div className="w-1/3 h-4 bg-stone-600 rounded-t flex items-center justify-center">
          <div className="w-1/2 h-full border-x border-stone-500/50" />
        </div>
      </div>
    </div>);

};
export function TowerVisualization() {
  const [searchTerm, setSearchTerm] = useState('');
  // Calculate matches
  const matchCount = useMemo(() => {
    if (!searchTerm) return 0;
    let count = 0;
    towersData.forEach((tower) => {
      tower.floors.forEach((floor) => {
        floor.forEach((apt) => {
          if (apt.number.includes(searchTerm)) count++;
        });
      });
    });
    return count;
  }, [searchTerm]);
  return (
    <Card className="mb-8 overflow-hidden border-stone-200">
      {/* Header & Search */}
      <div className="p-6 border-b border-stone-100 bg-stone-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-teal-600" />
              Mapa de Torres
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Visualiza la ocupación y encuentra apartamentos rápidamente
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 w-fit">
              <Info className="h-3.5 w-3.5 flex-shrink-0" />
              <span>
                Si tu apartamento no aparece iluminado, aún no está registrado
                en la plataforma.
              </span>
            </div>
          </div>

          <div className="w-full md:w-72 relative">
            <Input
              placeholder="Buscar apartamento (ej: 502)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="bg-white" />

            <AnimatePresence>
              {searchTerm &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: 10
                }}
                className="absolute top-full mt-2 right-0 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {matchCount > 0 ?
                `${matchCount} apartamentos encontrados` :
                'No se encontraron coincidencias'}
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-teal-100 border border-teal-200" />
            <span>Registrado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-stone-100 border border-stone-200" />
            <span>Sin registrar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-400 border border-amber-500 shadow-sm" />
            <span>Resultado búsqueda</span>
          </div>
        </div>
      </div>

      {/* Towers Visualization Area */}
      <div className="p-6 lg:p-10 bg-gradient-to-b from-blue-50/50 to-stone-50 overflow-x-auto">
        <div className="min-w-[768px] lg:min-w-0 grid grid-cols-3 gap-8 lg:gap-12 items-end justify-items-center">
          {towersData.map((tower) =>
          <TowerStructure
            key={tower.id}
            tower={tower}
            searchTerm={searchTerm} />

          )}
        </div>

        {/* Ground Line */}
        <div className="h-2 bg-stone-200 w-full mt-[-10px] rounded-full opacity-50" />
      </div>
    </Card>);

}