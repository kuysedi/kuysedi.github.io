function download() {
  const url = document.getElementById('urlInput').value.trim();
  const format = document.getElementById('formatSelect').value;
  const status = document.getElementById('status');

  if (!url) {
    status.textContent = "Please enter a YouTube URL.";
    return;
  }

  status.textContent = `Preparing to download ${format.toUpperCase()}...`;

  fetch("http://localhost:3000/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: url, format: format })
  })
  .then(response => response.blob())
  .then(blob => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `download.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    status.textContent = "Download started!";
  })
  .catch(err => {
    console.error(err);
    status.textContent = "Error downloading. Please try again.";
  });
}
