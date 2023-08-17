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
      document.getElementById('result').innerHTML = `
    <h1>Product Information</h1>
    <h1>Name : ${response.data.name}</h1>
    <h1>Brand : ${response.data.brand}</h1>
    <h1>Price : ${response.data.price}</h1>
    `;
    } catch (error) {
      console.error(error);
      return null;
    }
  }