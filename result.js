const resultUsers = document.querySelector("#resultUsers");
results = [];

for (let i = 0; i < window.localStorage.length; i++) {
  let pair = {};
  let key = window.localStorage.key(i);
  let value = window.localStorage.getItem(key);

  pair["name"] = key;
  pair["value"] = value;
  results.push(pair);
}

results.sort(function (a, b) {
  return b.value - a.value;
});
console.log(results);

for (let i = 0; i < results.length; i++) {
  resultUsers.innerHTML += `
  <tr>
    <th scope="row">${i + 1}</th>
    <td>${results[i].name}</td>
    <td>${results[i].value}</td>
  </tr>
`;
  if (i == 4) break;
}
