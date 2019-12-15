function serverMan(whatYouWant,prams='',key='',tab=1) {
  let cont = encodeURIComponent(prams);
  if(encodeURIComponent(prams) === '%5Bobject%20Object%5D'){
    cont = prams;
  }
  const result = fetch(
    `http://localhost:8000/api/${whatYouWant}?prams=${JSON.stringify({
      value: cont
    })}&key=${key}&tab=${tab}`,
    {
      mode: "cors"
    }
  )
    .then(e => e.json())
    .catch(err => console.log("ERROR:", err));
  return result;
}

export default serverMan;
