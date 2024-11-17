$(document).ready(() => {
  localStorage.clear();
  $("#formLogin").on("submit", function (e) {
    login(e);
  });
});

let login = (e) => {
  e.preventDefault();
  spinner();
};
