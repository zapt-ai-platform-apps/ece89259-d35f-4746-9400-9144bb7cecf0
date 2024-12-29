import React, { useState, useEffect } from 'react';
import { createEvent } from './supabaseClient';
import DictionaryForm from './components/DictionaryForm';
import HistoryFavorites from './components/HistoryFavorites';

export default function App() {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('wordHistory')) || [];
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteWords')) || [];
    setHistory(storedHistory);
    setFavorites(storedFavorites);
    console.log('Initialized history and favorites from local storage');
  }, []);

  useEffect(() => {
    localStorage.setItem('wordHistory', JSON.stringify(history));
    console.log('Updated local storage with new history');
  }, [history]);

  useEffect(() => {
    localStorage.setItem('favoriteWords', JSON.stringify(favorites));
    console.log('Updated local storage with new favorites');
  }, [favorites]);

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
      setHistory((prevHistory) => [word, ...prevHistory.slice(0, 9)]);
      console.log(`Added "${word}" to history`);
    } catch (error) {
      console.error('Error fetching meaning:', error);
      setMeaning('Error fetching meaning.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (selectedWord) => {
    if (favorites.includes(selectedWord)) {
      setFavorites(favorites.filter((item) => item !== selectedWord));
      console.log(`Removed "${selectedWord}" from favorites`);
    } else {
      setFavorites([selectedWord, ...favorites]);
      console.log(`Added "${selectedWord}" to favorites`);
    }
  };

  const handleHistoryClick = async (selectedWord) => {
    setWord(selectedWord);
    setLoading(true);
    console.log(`Fetching meaning for history item: ${selectedWord}`);
    try {
      const response = await createEvent('chatgpt_request', {
        prompt: `Define the word "${selectedWord}" in a concise and clear manner.`,
        response_type: 'text'
      });
      setMeaning(response);
      setHistory((prevHistory) => [selectedWord, ...prevHistory.filter(word => word !== selectedWord)]);
      console.log(`Moved "${selectedWord}" to top of history`);
    } catch (error) {
      console.error('Error fetching meaning:', error);
      setMeaning('Error fetching meaning.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 box-border h-full">
      <h1 className="text-3xl font-bold mb-6">Dictionary App</h1>
      <DictionaryForm
        word={word}
        setWord={setWord}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      {meaning && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-2">Meaning:</h2>
          <p>{meaning}</p>
        </div>
      )}
      <HistoryFavorites
        history={history}
        favorites={favorites}
        handleHistoryClick={handleHistoryClick}
        toggleFavorite={toggleFavorite}
      />
      <div className="mt-8">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:underline cursor-pointer"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}