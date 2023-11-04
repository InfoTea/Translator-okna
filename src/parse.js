import translate from 'google-translate-api';

const getSplitByCondition = (text) => {
  parttern = /^Для марки.*:([^:]+)$/;
  const match = text.match(parttern);

  if (match) {
    const result = match[1];
    return result;
  }
  return text;
};

async function fromRusToKaz(text) {
  const sourceLanguage = 'ru'; // Source language (Russian)
  const targetLanguage = 'kk'; // Target language (Kazakh)

  try {
    const translation = await translate(text, {
      from: sourceLanguage,
      to: targetLanguage,
    });
  } catch (error) {
    console.error('Translation error:', error);
  }
  return translation.text;
}

export default () => {
  const table = document.getElementById('mainTab:reportDataForm:reportDataPG');
  const tbody = table.firstChild;
  const rows = tbody.childNodes;

  document
    .querySelectorAll(
      'textarea[aria-readonly="false"]:not([disabled="disabled"])'
    )
    .forEach((targetCell) => {
      const fromCell = targetCell.parentNode.previousSibling;
      targetCell.focus();

      const innerText = fromCell.textContent;
      const splitedText = getSplitByCondition(innerText);
      const translatedText = fromRusToKaz(splitedText);
      targetCell.value = splitedText;

      const changeValue = new Event('change', {
        bubbles: true,
      });

      targetCell.dispatchEvent(changeValue);
    });
};
