// Generates and downloads a file based on the selected type
function downloadFile(type) {
    let content = "";
    let filename = "";
    let filetype = "text/plain";
  
    if (type === "js") {
      content = `
  function replaceImages() {
    const allImages = document.getElementsByTagName("img");
    for (let i = 0; i < allImages.length; i++) {
      const imageNumber = (i % 10) + 1;
      allImages[i].src = \`https://t3chiejack.github.io/Images/\${imageNumber}.png\`;
    }
  }
  
  const observer = new MutationObserver(replaceImages);
  observer.observe(document.body, { childList: true, subtree: true });
  replaceImages();
      `;
      filename = "image-replacer.js";
    } else if (type === "manifest") {
      content = `
  {
    "manifest_version": 3,
    "name": "Image Replacer Tool",
    "version": "1.0",
    "content_scripts": [
      {
        "matches": ["<all_urls>"],
        "js": ["image-replacer.js"]
      }
    ]
  }
      `;
      filename = "manifest.json";
      filetype = "application/json";
    } else if (type === "css") {
      content = `
  body {
    font-family: Arial, sans-serif;
  }
  header {
    text-align: center;
    padding: 20px;
    background-color: #3498db;
    color: white;
  }
  h1, h2 {
    margin: 10px;
  }
  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow-x: auto;
  }
      `;
      filename = "style.css";
      filetype = "text/css";
    }
  
    const blob = new Blob([content], { type: filetype });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
  