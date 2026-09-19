import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

interface ThingsToDoProps {
  data: {
    id: number;
    title: string;
    description: string;
    time: string;
    image: string;
    type: string;
  }[];
  destinationName?: string;
}

export default function ThingsToDo({ data, destinationName }: ThingsToDoProps) {
  return (
    <div className="pt-4 relative">
      <h3 className="text-2xl font-serif text-[#17211D] font-bold mb-6">Things to Do {destinationName ? `in ${destinationName}` : ''}</h3>
      
      <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {data.map((item) => (
          <div key={item.id} className="min-w-[240px] md:min-w-[260px] max-w-[280px] bg-white rounded-xl border border-[#E2E7E3] overflow-hidden shrink-0 group hover:shadow-lg transition-shadow">
            <div className="relative h-40 w-full overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-[#0B2522]">
                {item.type}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-[#17211D] mb-1">{item.title}</h4>
              <p className="text-xs text-[#66736D] mb-4 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-[11px] font-medium text-[#66736D]">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </div>
                <button className="w-6 h-6 rounded-full bg-[#F7F7F2] flex items-center justify-center text-[#17211D] group-hover:bg-[#F4A62A] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* See All Card */}
        <div className="min-w-[120px] flex items-center justify-center shrink-0">
           <button className="w-12 h-12 rounded-full bg-white border border-[#E2E7E3] shadow-sm flex items-center justify-center text-[#17211D] hover:border-[#087F5B] hover:text-[#087F5B] transition-colors">
             <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
}
