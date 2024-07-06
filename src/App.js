import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const searchRepo = async () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a repository name');
      return;
    }

    setResult(null);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`);
      const data = await response.json();
      const repos = data.items;

      if (repos.length === 0) {
        setResult([]);
        return;
      }

      setResult(repos);
    } catch (error) {
      setError('Error fetching repositories.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>GitHub Explorer</h1>
      <div className="search-box">
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a repository..."
        />
        <button onClick={searchRepo}>Search</button>
      </div>
      <div id="result">
        {error && <p>{error}</p>}
        {result && result.length === 0 && <p>No repositories found.</p>}
        {result && result.map(repo => (
          <div key={repo.id} className="repo">
            <h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.full_name}
              </a>
            </h3>
            <p>{repo.description}</p>
            <div className="repo-details">
              <img src={repo.owner.avatar_url} alt={`${repo.owner.login}'s profile`} />
              <div className="info">
                <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="Owner Icon" width="16" height="16" />
                <strong>Owner:</strong> {repo.owner.login}
              </div>
              <div className="info">
                <img src="https://img.icons8.com/ios-filled/50/000000/star.png" alt="Stars Icon" width="16" height="16" />
                <strong>Stars:</strong> {repo.stargazers_count}
              </div>
              <div className="info">
                <img src="https://img.icons8.com/ios-filled/50/000000/code-fork.png" alt="Forks Icon" width="16" height="16" />
                <strong>Forks:</strong> {repo.forks_count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;