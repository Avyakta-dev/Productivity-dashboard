import { useState } from 'react';

const QUOTE_API = 'https://api.quotable.io/random';

// Used only if the API call fails — so the card never shows a dead end.
const FALLBACK_QUOTES = [
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
  { text: 'Small daily improvements are the key to staggering long-term results.', author: 'Robin Sharma' },
  { text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' },
  { text: 'You don\u2019t have to be great to start, but you have to start to be great.', author: 'Zig Ziglar' },
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let hasFetchedInitialQuote = false; // module flag: "has the first fetch happened?"

export default function MotivationQuote() {
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'done'
  const [isFallback, setIsFallback] = useState(false);

  const fetchQuote = () => {
    setStatus('loading');
    fetch(QUOTE_API)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        setQuote({ text: data.content, author: data.author });
        setIsFallback(false);
        setStatus('done');
      })
      .catch(() => {
        // API is down — fall back to a random quote from the hardcoded
        // list instead of leaving the card blank or stuck on an error.
        setQuote(pickRandom(FALLBACK_QUOTES));
        setIsFallback(true);
        setStatus('done');
      });
  };

  if (!hasFetchedInitialQuote) {
    hasFetchedInitialQuote = true;
    fetchQuote();
  }

  return (
    <div className="quote-card">
      {status === 'loading' && <p className="status-text">Fetching some motivation…</p>}

      {status === 'done' && quote && (
        <>
          <blockquote>
            “{quote.text}”
            — {quote.author}
          </blockquote>
          {isFallback && (
            <p className="status-text">Showing an offline quote — couldn't reach the quote service.</p>
          )}
        </>
      )}

      <button className="nb-btn" onClick={fetchQuote} disabled={status === 'loading'}>
        New Quote
      </button>
    </div>
  );
}