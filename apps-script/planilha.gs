/**
 * Sala DM Online · Onicocriptose
 * Recebe as inscrições da landing page e grava na planilha
 * "Leads – Sala DM Online Onicocriptose".
 *
 * Como publicar: Implantar > Nova implantação > Tipo: App da Web
 *   Executar como: Eu  ·  Quem pode acessar: Qualquer pessoa
 * Copie a URL que termina em /exec e cole no CONFIG.planilhaUrl da página.
 */

const PLANILHA_ID = '1EST6QyR-4DHP_BvQWSBtBLXBQ4p6DL6SmcVIjlmeHXY';
const CABECALHO = ['Data/hora', 'Nome', 'WhatsApp', 'E-mail', 'Origem', 'Página'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (d.website) return resposta({ ok: true });              // robô: descarta
    if (!d.email) return resposta({ ok: false, erro: 'sem e-mail' });

    const aba = SpreadsheetApp.openById(PLANILHA_ID).getSheets()[0];
    if (aba.getLastRow() === 0) aba.appendRow(CABECALHO);

    aba.appendRow([
      Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss'),
      limpar(d.nome),
      limpar(d.whatsapp_formatado || d.whatsapp),
      limpar(d.email).toLowerCase(),
      limpar(d.origem),
      limpar(d.url)
    ]);
    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// abrir a URL /exec no navegador mostra se o app está no ar
function doGet() {
  return resposta({ ok: true, status: 'online' });
}

// evita que um texto começando com = + - @ vire fórmula na planilha
function limpar(v) {
  v = String(v == null ? '' : v).trim().slice(0, 300);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
