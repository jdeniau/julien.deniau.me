function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function translate() {
  var langCode = getParameterByName("lang");
  if (!langCode) {
    return;
  }

console.log('start translate');
  var elements = document.querySelectorAll('[data-trans-' + langCode + ']');
  console.log(elements.length);

  for (var i = 0; i < elements.length; i++) {
    const element = elements[i];

    const translationContent = element.getAttribute('data-trans-' + langCode);
    if (!translationContent) {
      continue;
    }

    element.innerText = translationContent;
  }
}

translate();
