import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css'

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroImg from '../../assets/heroes.png';

export default function Login() {
  const [id, setId] = useState('')

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu cadastro</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
          </Link>
        </form>


      </section>
      <img src={heroImg} alt="Heroes" />
    </div>
  );
}
