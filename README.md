# Sala DM Online · Tratamento integral da onicocriptose

Landing page de inscrição para a aula online e ao vivo com o **Prof. Ítalo Ventura** (Instituto Ítalo Ventura) e a **Dra. Letícia Helen** (Grupo DM), divulgada no VI Fórum de Podiatria da Sobende SP.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | A landing page completa (imagens e estilos já embutidos) |
| `email/img/` | Imagens usadas nos e-mails de lembrete (precisam ficar públicas) |
| `email-templates/` | E-mails de lembrete em HTML (1 dia antes e 1 hora antes) |
| `apps-script/planilha.gs` | Script do Google Apps Script que grava as inscrições na planilha |
| `netlify.toml` | Configuração de publicação no Netlify |

## Para onde vão as inscrições

O formulário envia **nome, WhatsApp e e-mail** para a planilha Google
**Leads – Sala DM Online Onicocriptose**, através do app da Web do Apps Script.
A URL fica no bloco `CONFIG` no fim do `index.html` (`planilhaUrl`).

## Editar dados da aula

No fim do `index.html`, bloco `CONFIG`:

```js
data: "Data a confirmar",       // ex.: "25 de outubro de 2026"
horario: "Horário a confirmar", // ex.: "20h às 21h30"
plataforma: "Online e ao vivo",
```

## Publicar no Netlify a partir do GitHub

1. Netlify → **Add new site → Import an existing project → GitHub**
2. Escolha este repositório
3. **Base directory:** vazio (ou `sala-dm-online`, se o repositório tiver outras pastas)
4. **Build command:** vazio · **Publish directory:** `.`
5. Deploy. Cada `git push` publica de novo automaticamente.

## E-mails de lembrete

Antes de usar os arquivos de `email-templates/`, troque:
- `SEU-SITE.netlify.app` pelo domínio real do site (imagens)
- `[DATA DA AULA]`, `[HORÁRIO]` e `[LINK DA AULA]`
