import { type AdminCard, type AdminModalType } from "../../data/adminCards";

interface AdminCardGridProps {
  cards: AdminCard[];
  onSelect: (type: AdminModalType) => void;
}

const AdminCardGrid = ({ cards, onSelect }: AdminCardGridProps) => {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <button
          key={card.type}
          onClick={() => onSelect(card.type)}
          className={`group relative overflow-hidden rounded-3xl bg-linear-to-br ${card.gradient} text-left p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer`}
        >
          <card.icon className="w-10 h-10 text-white/90 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
          <p className="text-white/80 text-sm mb-4">{card.description}</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white/90">
            {card.team}
          </span>
        </button>
      ))}
    </section>
  );
};

export default AdminCardGrid;

