function toggleVisibility(id, shouldShow) {
    var element = document.getElementById(id);
    if (shouldShow) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
}