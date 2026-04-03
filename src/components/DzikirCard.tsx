import { motion } from "motion/react";
import { DzikirItem } from "../types";

interface Props {
  item: DzikirItem;
  index: number;
  key?: string;
}

export default function DzikirCard({ item, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50 hover:shadow-md transition-shadow mb-4"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-emerald-800 font-bold text-lg">{item.judul}</h3>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
          {item.pengulangan}
        </span>
      </div>
      
      <div className="mb-6">
        <p 
          className="text-right text-3xl leading-relaxed font-arabic text-slate-800 mb-4 select-all notranslate"
          dir="rtl"
          translate="no"
        >
          {item.arab}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-emerald-600 italic text-sm leading-relaxed notranslate" translate="no">
          {item.latin}
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          {item.arti}
        </p>
        {item.sumber && (
          <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
            Sumber: {item.sumber}
          </p>
        )}
      </div>
    </motion.div>
  );
}
