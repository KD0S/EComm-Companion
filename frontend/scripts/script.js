const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
        width: 200,
        height: 200,
    },
    fps: 30,
});
const btn = document.getElementById('submitButton')
const  promptBar = document.getElementById('search')

btn.addEventListener('click', ()=> {
    let prompt = promptBar.value
    getPrompt(prompt);
})
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

async function getPrompt(prompt)
{
axios
    .get(
        `http://localhost:3001/api/products/chat`,
        { params: { description: `${prompt}` } }
    )
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
}

async function getUser(result) {
    try {
      const response = await axios.get(`http://localhost:3001/api/products/${result}`);
      document.getElementById('result').innerHTML = `
    <div class="productcard">
    <div class="headingContainer">
    <h1 class="cardHeading">Product Information</h1>
    <img class="cardImage" src="${response.data.imageUrl}"/>
    </div>
    <h1 class="carddata">Name : ${response.data.name}</h1>
    <h1 class="carddata">Brand : ${response.data.brand}</h1>
    <h1 class="carddata">Price : ${response.data.price}</h1>
    </div>
    `;
    } catch (error) {
      console.error(error);
      return null;
    }
  }