import Registry from "../components/registry";

export default function Register() {
  return (
    <main className="min-h-screen bg-cover bg-no-repeat pt-4"
    style={{
      backgroundImage: 'url("./assets/images/pattern-lines.svg"), url("./assets/images/pattern-circle.svg"), url("./assets/images/pattern-squiggly-line-top.svg"), url("./assets/images/pattern-squiggly-line-bottom.svg"), url("./assets/images/background-desktop.png")',
      backgroundPosition: 'center, bottom right 20%, top right, bottom left, center',  // Ajusta según el diseño
      backgroundSize: ' cover, 20%, 30%, 50%, cover',  // Ajusta según el diseño
    }}>
      <Registry />
    </main>
  );
}
