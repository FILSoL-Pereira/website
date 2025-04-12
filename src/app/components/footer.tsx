export default function Footer() {
  return (
    <footer className="w-full bg-amber-500 text-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Créditos */}
        <div className="text-center sm:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FLISoL Pereira. Todos los derechos reservados.
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            
          </a>
        </div>
      </div>
    </footer>
  );
}
