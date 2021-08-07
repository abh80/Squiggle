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
