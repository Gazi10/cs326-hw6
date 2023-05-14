class WordScoreBoard {
  constructor() {
    this.words = [];
  }

  async saveWordScore(name, word, score) {
    this.words.push({ name, word, score });
    const response = await fetch('/wordScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, word, score })
    });

    if (!response.ok) {
      throw new Error('Failed to save word score on server.');
    }
  }

  render(element) {
    let html = '<h1>Word Scores</h1>';
    html += '<table>';
    this.words.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }
}

class GameScoreBoard {
  constructor() {
    this.game = [];
  }

  render(element) {
    let html = '<h1>Game Score</h1>';
    html += '<table>';
    this.game.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }

  async saveGameScore(name, score) {
    this.game.push({ name, score });

    const response = await fetch('/gameScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, score })
    });

    if (!response.ok) {
      throw new Error('Failed to save word score on server.');
    }
  }
}

class TopWordAndGameScoreBoard {
  async render(element) {
    const wordScoresResponse = await fetch('/highestWordScores');
    if (!wordScoresResponse.ok) {
      throw new Error('Failed to fetch top word scores from server.');
    }
    const topWordScores = await wordScoresResponse.json();
    
    const gameScoresResponse = await fetch('/highestGameScores');
    if (!gameScoresResponse.ok) {
      throw new Error('Failed to fetch top game scores from server.');
    }
    const topGameScores = await gameScoresResponse.json();
    
    let html = '<h1>Top 10 Word Scores</h1>';
    html += '<table>';
    topWordScores.forEach(score => {
      html += `
        <tr>
          <td>${score.name}</td>
          <td>${score.score}</td>
        </tr>
      `;
    });
    html += '</table>';

    let html2 = '<h1>Top 10 Game Scores</h1>';
    html2 += '<table>';
    topGameScores.forEach(score => {
      html2 += `
        <tr>
          <td>${score.name}</td>
          <td>${score.score}</td>
        </tr>
      `;
    });
    html2 += '</table>';
    element.innerHTML = html + html2;
  }
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
