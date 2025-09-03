import React, { useState } from 'react';

const LoginPage = ({ roommates, onLogin }) => {
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleLogin = (e) => {
e.preventDefault();
const userEmail = email.toLowerCase().trim();
const foundRoommate = roommates.find(r => r.email.toLowerCase() === userEmail);

if (foundRoommate) {
onLogin(foundRoommate);
setError('');
} else {
setError('Email not found. Please try again.');
}
};

return (
<div className="login-form-container">
<h2 className="page-title">Login</h2>
<form className="login-form" onSubmit={handleLogin}>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Enter your email"
required
/>
<button type="submit">Log In</button>
</form>
{error && <p className="error-message">{error}</p>}
</div>
);
};

export default LoginPage;