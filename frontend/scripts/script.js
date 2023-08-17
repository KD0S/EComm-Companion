const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
        width: 200,
        height: 200,
    },
    fps: 30,
});

scanner.render(success, error);

async function success(result)
{
    document.getElementById('result').innerHTML = `
    <h2>Success!<h2>
    <h2>${result}</h2>
    `;

    getUser(result);

    scanner.clear();
    document.getElementById('reader').remove();

}

function error(err)
{
    console.error(err);
}

async function getUser(result) {
    try {
      const response = await axios.get(`http://localhost:3001/api/products/${result}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }