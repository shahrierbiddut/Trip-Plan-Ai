import { Waves, Car, Mountain, Utensils, Sun, Users } from "lucide-react";

interface WhyLoveItProps {
  data: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];
}

const iconMap: Record<string, React.ElementType> = {
  waves: Waves,
  car: Car,
  mountain: Mountain,
  utensils: Utensils,
  sun: Sun,
  users: Users,
};

export default function WhyLoveIt({ data }: WhyLoveItProps) {
  return (
    <div className="bg-white border border-[#E2E7E3] rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-serif text-[#17211D] font-bold mb-6">Why Travelers Love It</h3>
      <div className="flex flex-col gap-5">
        {data.map((item) => {
          const Icon = iconMap[item.icon] || Waves;
          return (
            <div key={item.id} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#E8F3EF] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-[#087F5B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#17211D] text-sm mb-1">{item.title}</h4>
                <p className="text-[#66736D] text-sm">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
