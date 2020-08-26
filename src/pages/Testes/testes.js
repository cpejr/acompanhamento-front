import React from 'react';

export default function Testes() {
  const [formData, setFormData] = React.useState({
    nome: "",
    email: "",
    senha: "",
  });

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  React.useEffect(() => {
    console.debug(formData)
  }, [formData])

  return (
    <div>
      <input type="text" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChangeInput} />
      <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChangeInput} />
      <input type="password" placeholder="Senha" name="senha" value={formData.senha} onChange={handleChangeInput} />
      <button type="submit">Submit</button>
    </div>
  );
}
