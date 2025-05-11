import React from 'react';
import { ExternalLink } from 'lucide-react';

const Header = ({
  title,
  subtitle,
  showButton = false,
  buttonText = '',
  onButtonClick,
  showInput = false,
  inputValue = '',
  onInputChange,
}) => {
  return (
    <header className="flex justify-between items-center bg-white rounded-2xl p-8 shadow-xl flex-wrap gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {showInput && (
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={inputValue}
            onChange={onInputChange}
            className="border border-gray-300 rounded px-4 py-2"
          />
        )}

        {showButton && (
          <button
            onClick={onButtonClick}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
          >
            {buttonText}
            {buttonText.toLowerCase().includes('informe') && <ExternalLink size={18} />}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
