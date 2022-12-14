const fetch = require('node-fetch')
async function foo() {
    let obj;
  
    const res = await fetch('https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=akkuya&api_key=12e12b0d510784ca126139b82dcee704&format=json')
  
    obj = await res.json();
    
    let x = obj.user['image'][0]['#text']
    
}
console.log()