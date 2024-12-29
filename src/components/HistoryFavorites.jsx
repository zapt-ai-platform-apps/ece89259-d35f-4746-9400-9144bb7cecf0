import React from 'react';

export default function HistoryFavorites({ history, favorites, handleHistoryClick, toggleFavorite }) {
  return (
    <>
      {history.length > 0 && (
        <div className="mt-6 w-full max-w-sm h-full">
          <h2 className="text-xl font-semibold mb-2">Search History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <button
                  onClick={() => handleHistoryClick(item)}
                  className="text-teal-500 hover:underline cursor-pointer"
                >
                  {item}
                </button>
                <button
                  onClick={() => toggleFavorite(item)}
                  className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                >
                  {favorites.includes(item) ? '★' : '☆'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {favorites.length > 0 && (
        <div className="mt-6 w-full max-w-sm h-full">
          <h2 className="text-xl font-semibold mb-2">Favorites</h2>
          <ul>
            {favorites.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => handleHistoryClick(item)}
                  className="text-teal-500 hover:underline cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}