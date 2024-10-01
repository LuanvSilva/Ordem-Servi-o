## Rota de Login

**Descrição:**
Esta rota é responsável por autenticar um usuário no sistema.

**Método HTTP:** POST

**URL:** /api/v1/auth/logar

**Parâmetros:**

| Parâmetro | Tipo | Descrição | Obrigatório |
|---|---|---|---|
| email | string | Endereço de email do usuário | Sim |
| senha | string | Senha do usuário | Sim |

**Resposta:**

| Código de status | Descrição | Corpo da resposta |
|---|---|---|
| 200 | Login bem-sucedido | Objeto contendo informações do usuário logado |
| 400 | Requisição inválida | Objeto contendo mensagem de erro e campo inválido |
| 500 | Erro interno do servidor | Objeto contendo mensagem de erro genérica |

**Exemplo de requisição:**

```json
{
  "email": "teste@gamil.com", //E-mail padrão contendo @ e .com
  "senha": "minha1SenhaForte@" // Senha: Deve conter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial. 
}
```

**Exemplo de resposta true:**
```json 

{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "exemplo: fhfslprubd_kfb%ifhdwq4d53w4d5w4d44434D3",
    "refreshToken": "exemplo: a25lej2heje1whbx_%$NGVG&MNGDW#$"
  }
}
```

