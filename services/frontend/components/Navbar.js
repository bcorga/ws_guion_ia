export default function Navbar() {
    return (
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold" ><a href="/">Logo Web</a></div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#recursos">Recursos</a></li>
              <li><a href="/about">Sobre Nosotros</a></li>
              <li><a href="#tipos">Tipos de Guiones</a></li>
              <li><a href="/products">Productos</a></li>
              <li><a href="/faq">Preguntas y Respuestas</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
          <div className="space-x-4">
            <button
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded"
              onClick={() => (window.location.href = '/login')}
            >
              Acceder
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded">
              <a href="/register">Registrarse</a>
           </button>
          </div>
        </div>
      </header>
    );
  }  