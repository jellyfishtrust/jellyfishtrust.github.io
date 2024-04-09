import { useCallback, useEffect, useState } from 'react';
import './App.css';

const MOCK_UNIQUE_SCOPE = '<unique-scope>'

function App() {
  const persistedPw = localStorage.getItem(`${MOCK_UNIQUE_SCOPE}-password`);
  const persistedConfirm = localStorage.getItem(`${MOCK_UNIQUE_SCOPE}-confirm`);
  const [username, setUsername] = useState(localStorage.getItem(`${MOCK_UNIQUE_SCOPE}-username`) ?? '')
  const [password, setPassword] = useState(persistedPw ?? '')
  const [confirm, setConfirm] = useState(persistedConfirm ?? '')
  const [pwMatch, setPwMatch] = useState(persistedPw === persistedConfirm);

  useEffect(() => {
    localStorage.setItem(`${MOCK_UNIQUE_SCOPE}-username`, username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem(`${MOCK_UNIQUE_SCOPE}-password`, password);
    setPwMatch(password === confirm)
  }, [confirm, password]);

  useEffect(() => {
    localStorage.setItem(`${MOCK_UNIQUE_SCOPE}-confirm`, confirm);
    setPwMatch(password === confirm)
  }, [confirm, password]);

  const submit = useCallback((e) => {
    e.preventDefault();
    if (username && password && confirm && pwMatch) {
      alert(`${username} signed up!`)
    }
  }, [confirm, password, username, pwMatch]);

  const pwFeedback = `Passwords ${pwMatch ? '' : 'do not'} match${pwMatch ? '!' : ' :('}`;
  return (
    <div className="App">
      <form onSubmit={submit}>
        <label htmlFor='username'>
          Username
        </label>
        <input type='text' placeholder='Username' name='username' id='username' autoComplete='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='password'>
          Password
        </label>
        <input type='password' placeholder='Password' name='password' id='password' autoComplete='new-password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor='confirm'>
          Confirm Password
        </label>
        <input type='password' placeholder='Confirm Password' name='confirm' id='confirm' autoComplete='new-password' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {Boolean(password?.length && confirm?.length) && <p className={pwMatch ? '' : 'error'}>{pwFeedback}</p>}
        <button type='submit' />
      </form>
    </div>
  );
}

export default App;
