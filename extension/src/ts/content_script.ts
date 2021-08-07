document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage(
    {
      type: "squiggle:rpc-set",
    },
    function (response) {
      console.log(response);
    }
  );
});
setInterval(() => 0, 1000);
