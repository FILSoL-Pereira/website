type CardProps = {
  number: number;
  title: string;
  description: string;
};

export default function Card({ number, title, description }: CardProps) {
  return (
    <div className="bg-white shadow-md p-6 text-center hover:scale-105 active:scale-105 transition-transform duration-300 mask mask-hexagon w-64 h-64">
      <div className="text-amber-600 text-5xl font-bold mb-2">{number}</div>
      <h3 className="text-xl text-amber-500 font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
