const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
        width: 200,
        height: 200,
    },
    fps: 30,
});

scanner.render(success, error);

function success(result)
{
    document.getElementById('result').innerHTML = `
    <h2>Success!<h2>
    <h2>${result}</h2>
    `;

    scanner.clear();
    document.getElementById('reader').remove();

}

function error(err)
{
    console.error(err);
}
