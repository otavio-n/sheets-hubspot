# Integração Google Sheets - HubSpot
Este projeto envia contatos salvos numa planilha Google para a plataforma Hubspot CRM.

## Como executar o código?
Para executar este código é esperado que o usuário tenha instalado na máquina o gerenciador de pacotes NPM.
### Google Sheets
- É necessário ter um serviço no Google Cloud ativo para o Google Sheets.
- Gere as credenciais em formato JSON para o acesso a API.
- As credenciais devem ser salvas na pasta raiz deste projeto com o nome `credentials.json`. 
- Crie uma planilha no Google Sheets com as seguintes colunas ordernadas dessa forma:
--   Nome da empresa
--   Nome completo
--   Email
--   Telefone
--   Website 
- Compartilhe a planilha com o email gerado ao criar o serviço no Google Cloud.
- Para mais informações recorra a documentação:  https://developers.google.com/sheets/api

### HubSpot
- É necessário ter uma conta/cadastro na plataforma HubSpot.
- Crie um aplicativo privado com a permissão `crm.objects.contacts.write` e gere o API token de acesso.
- Para mais informações recorra a documentação: https://developers.hubspot.com/docs/api/overview

### Variáveis de ambiente
- Crie um arquivo `.env` na raiz do projeto com as variáveis:
--HUBSPOT_ACCESS_TOKEN = "TOKEN-DE-ACESSO-DO-HUBSPOT"
--GOOGLE_SHEET_ID = "ID-DA-PLANILHA-CRIADA"
conforme o arquivo exemplo `.env.example` deste repositório.

### Comando
Após as configurações, basta realizar o comando `npm run start`.
Todas as linhas/contatos da planilha devem ser salvas na plataforma HubSpot automaticamente.