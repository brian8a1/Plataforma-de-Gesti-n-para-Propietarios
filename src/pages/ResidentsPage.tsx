import React, { useMemo, useState, Component } from 'react';
import { Search, Building2, Info, MessageSquare } from 'lucide-react';
import { MessageModal } from '../components/residents/MessageModal';
import { Resident } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
// --- Types ---
type ApartmentStatus = 'registered' | 'empty';
interface Apartment {
  id: string;
  number: string;
  floor: number;
  tower: string;
  status: ApartmentStatus;
}
interface Tower {
  id: string;
  name: string;
  floors: Apartment[][];
}
// --- Mock Data Generator ---
const generateTowers = (): Tower[] => {
  const towers: Tower[] = [];
  const towerNames = ['1', '2', '3'];
  const numFloors = 12;
  const aptsPerFloor = 4;
  towerNames.forEach((name) => {
    const floors: Apartment[][] = [];
    for (let f = 1; f <= numFloors; f++) {
      const floorApts: Apartment[] = [];
      for (let a = 1; a <= aptsPerFloor; a++) {
        const aptNum = `${f}${a.toString().padStart(2, '0')}`;
        floorApts.push({
          id: `T${name}-F${f}-A${a}`,
          number: aptNum,
          floor: f,
          tower: name,
          status: Math.random() > 0.4 ? 'registered' : 'empty'
        });
      }
      floors.push(floorApts);
    }
    towers.push({
      id: name,
      name: `Torre ${name}`,
      floors: floors.reverse()
    });
  });
  return towers;
};
const towersData = generateTowers();
// --- Components ---
const ApartmentCell = ({
  apt,
  isMatch,
  onMessage




}: {apt: Apartment;isMatch: boolean;onMessage: () => void;}) => {
  const isRegistered = apt.status === 'registered';
  return (
    <motion.button
      layout
      initial={false}
      onClick={isRegistered ? onMessage : undefined}
      disabled={!isRegistered}
      animate={{
        scale: isMatch ? 1.15 : 1,
        backgroundColor: isMatch ?
        '#fbbf24' :
        isRegistered ?
        '#ccfbf1' :
        '#f5f5f4',
        borderColor: isMatch ? '#f59e0b' : isRegistered ? '#99f6e4' : '#e7e5e4',
        boxShadow: isMatch ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none'
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className={`
        relative flex items-center justify-center h-8 w-full rounded border text-[10px] font-medium
        ${isRegistered ? 'cursor-pointer hover:ring-2 hover:ring-teal-400' : 'cursor-default'}
        ${isMatch ? 'z-10 text-amber-900 font-bold' : isRegistered ? 'text-teal-700' : 'text-stone-400'}
      `}
      title={
      isRegistered ?
      `Apto ${apt.number} - Click para enviar mensaje` :
      `Apto ${apt.number} - Sin registro`
      }>

      {apt.number}
      {isRegistered &&
      <MessageSquare className="absolute -top-1 -right-1 h-3 w-3 text-teal-600 opacity-0 group-hover:opacity-100" />
      }
    </motion.button>);

};
const TowerStructure = ({
  tower,
  searchTerm,
  onSelectApartment




}: {tower: Tower;searchTerm: string;onSelectApartment: (apt: Apartment) => void;}) => {
  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-[240px]">
      {/* Tower Label - Now at the top */}
      <div className="mb-2 text-sm font-bold text-stone-600">{tower.name}</div>

      {/* Roof Decoration */}
      <div className="w-full flex flex-col items-center">
        <div className="w-2 h-6 bg-stone-300 mb-[-2px]" />
        <div className="w-16 h-4 bg-stone-800 rounded-t-lg" />
        <div
          className="w-full h-8 bg-stone-700 rounded-t-full relative overflow-hidden"
          style={{
            clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)'
          }}>

          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-stone-600 rounded-full" />
        </div>
      </div>

      {/* Building Body */}
      <div className="w-full bg-white border-x-2 border-stone-300 shadow-xl relative">
        <div className="absolute inset-y-0 left-2 w-[1px] bg-stone-100" />
        <div className="absolute inset-y-0 right-2 w-[1px] bg-stone-100" />

        <div className="p-3 space-y-2">
          {tower.floors.map((floor, i) =>
          <div key={i} className="grid grid-cols-4 gap-1.5">
              {floor.map((apt) => {
              const isMatch =
              searchTerm.length > 0 && apt.number.includes(searchTerm);
              return (
                <ApartmentCell
                  key={apt.id}
                  apt={apt}
                  isMatch={isMatch}
                  onMessage={() => onSelectApartment(apt)} />);


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
export function ResidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  const [activeTowerIndex, setActiveTowerIndex] = useState(0);
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
  const handleSendMessage = (message: string, isAnonymous: boolean) => {
    console.log(
      `Sending message to Torre ${selectedApartment?.tower} Apto ${selectedApartment?.number}: ${message} (Anonymous: ${isAnonymous})`
    );
  };
  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 min-h-screen bg-stone-50 max-w-7xl mx-auto">
      {/* Header with Search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">
              Directorio de Vecinos
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Toca un apartamento para enviar un mensaje
            </p>
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
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-teal-100 border border-teal-200" />
            <span>Registrado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-stone-100 border border-stone-200" />
            <span>Sin registrar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-400 border border-amber-500" />
            <span>Búsqueda</span>
          </div>
        </div>
      </div>

      {/* Towers Visualization */}
      <div className="p-4 lg:p-10 bg-gradient-to-b from-blue-50/30 to-stone-50 rounded-2xl border border-stone-200">
        {/* Mobile Tower Tabs - Only visible on mobile */}
        <div className="lg:hidden mb-6">
          <div className="flex justify-center gap-2">
            {towersData.map((tower, index) =>
            <button
              key={tower.id}
              onClick={() => setActiveTowerIndex(index)}
              className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeTowerIndex === index ? 'bg-teal-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:border-teal-200'}
                `}>

                {tower.name}
              </button>
            )}
          </div>
        </div>

        {/* Mobile: Single Tower View */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTowerIndex}
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              transition={{
                duration: 0.2
              }}
              className="flex justify-center">

              <TowerStructure
                tower={towersData[activeTowerIndex]}
                searchTerm={searchTerm}
                onSelectApartment={setSelectedApartment} />

            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {towersData.map((_, index) =>
            <button
              key={index}
              onClick={() => setActiveTowerIndex(index)}
              className={`
                  w-2 h-2 rounded-full transition-all
                  ${activeTowerIndex === index ? 'bg-teal-500 w-6' : 'bg-stone-300 hover:bg-stone-400'}
                `} />

            )}
          </div>
        </div>

        {/* Desktop: Grid View - Unchanged */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8 items-end justify-items-center">
            {towersData.map((tower) =>
            <TowerStructure
              key={tower.id}
              tower={tower}
              searchTerm={searchTerm}
              onSelectApartment={setSelectedApartment} />

            )}
          </div>

          {/* Ground Line */}
          <div className="h-2 bg-stone-200 w-full mt-[-10px] rounded-full opacity-50" />
        </div>
      </div>

      {/* Info Message */}
      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl max-w-2xl mx-auto">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Si no aparece aquí el nombre, es porque nadie de ese apartamento se ha
          registrado aún.
        </p>
      </div>

      {selectedApartment &&
      <MessageModal
        isOpen={!!selectedApartment}
        onClose={() => setSelectedApartment(null)}
        recipientApartment={`Torre ${selectedApartment.tower} - Apto ${selectedApartment.number}`}
        onSend={handleSendMessage} />

      }
    </div>);

}