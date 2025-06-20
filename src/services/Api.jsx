// src/services/Api.jsx

const API_URL = 'http://localhost:3001'; // seu backend local

export const buscarMensagens = async () => {
  const res = await fetch(`${API_URL}/mensagens`);
  if (!res.ok) throw new Error('Erro ao buscar mensagens');
  return await res.json();
};

export const enviarMensagem = async (mensagem) => {
  const token = localStorage.getItem('token'); // se usa autenticação
  const res = await fetch(`${API_URL}/mensagens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(mensagem)
  });

  if (!res.ok) throw new Error('Erro ao enviar mensagem');
  return await res.json();
};
