import Image from "next/image";

type Conference = {
  name: string;
  title: string;
  time: string;
  img: string;
  info: string;
};

export default function ModalConference({
  conference,
  onClose,
}: {
  conference: Conference | null;
  onClose: () => void;
}) {
  if (!conference) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-0"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-2xl sm:max-w-3xl w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-amber-500"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row items-center gap-4 self-start sm:pl-10">
            <Image
              src={conference.img}
              alt={`Foto de ${conference.name}`}
              width={100}
              height={100}
              className="w-16 h-16 sm:w-30 sm:h-30 rounded-full object-cover border-2 border-amber-500"
            />
            <p className="text-xl sm:text-4xl font-semibold text-white">{conference.name}</p>
          </div>

          <h3 className="sm:text-3xl text-xl font-bold text-center">
            {conference.title}
          </h3>

          <time className="text-xl text-amber-400 font-bold">
            {conference.time}
          </time>
          <p className="text-lg sm:text-xl text-gray-300">{conference.info}</p>
        </div>
      </div>
    </div>
  );
}
