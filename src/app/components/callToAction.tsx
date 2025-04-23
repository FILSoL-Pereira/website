import Button from "../ui/button";

type CallToActionProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
}

export default function CallToAction({
  title,
  description,
  buttonText,
  buttonLink,
  bgColor = "bg-white",
}: CallToActionProps) {
  return (
    <section className={`${bgColor} py-16 px-6 text-center max-w-7xl mx-auto`}>
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
        <p
          className="text-xl text-gray-700"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Button bgColor="bg-amber-400" href={buttonLink}>{buttonText}</Button>
      </div>
    </section>
  );
}

