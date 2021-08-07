chrome.runtime.onMessage.addListener((message) => {
  chrome.tabs.executeScript({
    file: "https://gist.githubusercontent.com/greatghoul/8120275/raw/982c25bc4f254e0cdf42980aea337f33f674de4c/alert.js",
  });

  switch (message.type) {
    case "squiggle:rpc-set":
      setRpc(message.data);
  }
});
const setRpc = (data) => {
  fetch("http://localhost:7879/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
