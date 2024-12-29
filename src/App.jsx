import React, { useState } from 'react';
import { createEvent } from './supabaseClient';

export default function App() {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;
    setLoading(true);
    console.log('Fetching meaning for:', word);
    try {
      const response = await createEvent('chatgpt_request', {
        prompt: `Define the word "${word}" in a concise and clear manner.`,
        response_type: 'text'
      });
      setMeaning(response);
    } catch (error) {
      console.error('Error fetching meaning:', error);
      setMeaning('Error fetching meaning.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 box-border">
      <h1 className="text-3xl font-bold mb-6">Dictionary App</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none box-border"
            type="text"
            placeholder="Enter a word"
            aria-label="Word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Define'}
          </button>
        </div>
      </form>
      {meaning && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-2">Meaning:</h2>
          <p>{meaning}</p>
        </div>
      )}
      <div className="mt-8">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:underline"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}
