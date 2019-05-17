function signUp(event) {
  event.preventDefault();

  const userData = {
    firstName: $('#first-name-input')
      .val()
      .trim(),
    lastName: $('#last-name-input')
      .val()
      .trim(),
    userName: $('#username-input')
      .val()
      .trim(),
    email: $('#email-input')
      .val()
      .trim(),
    password: $('#password-input')
      .val()
      .trim(),
    age: $('#age-input').val(),
    gender: $('#gender-input')
      .val()
      .trim(),
    movies: [
      $('#movie1-input').val().trim(),
      $('#movie2-input').val().trim(),
      $('#movie3-input').val().trim(),
      $('#movie4-input').val().trim(),
      $('#movie5-input').val().trim()
    ]
  };

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.userName || !userData.gender || !userData.age) {
    return swal({
      title: "You're missing something!",
      icon: 'error'
    });
  }
  console.log(userData);

  $.ajax({
      url: '/api/user/register',
      method: 'POST',
      data: userData
    })
    .then(function (userData) {
      console.log(userData);
      return swal({
        title: userData.message,
        icon: 'success'
      });
    })
    .then(function () {
      // custom bootstrap method
      $('#signup').tab('hide');
      $('#login').tab('show');
    })
    .catch(err => {
      console.log(err);
      return swal({
        title: err.responseJSON.message,
        icon: 'error'
      });
    });
}

// log user in
function login(event) {
  event.preventDefault();

  const userData = {
    // email: $('#email-input-login')
    userName: $('#userName-input-login')
      .val()
      .trim(),
    password: $('#password-input-login')
      .val()
      .trim()
  };


  // if (!userData.email || !userData.password)
  if (!userData.userName || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error'
    });
  }

  $.ajax({
      url: '/api/user/login',
      method: 'POST',
      data: userData
    })
    .then(function (accessToken) {
      console.log(accessToken);
      localStorage.setItem('accessToken', accessToken);
      getUserProfile();
    })
    .catch(err => {
      console.log(err);
      return swal({
        title: err.responseJSON.error,
        icon: 'error'
      });
    });
}

// log user out
function logout() {
  localStorage.removeItem('accessToken');
  $('#user-info').hide();
  $('#user-tabs, #forms, #right-column-title').show();
  $('#login').tab('show');
}

// get user profile
function getUserProfile() {
  const token = localStorage.getItem('accessToken');

  $.ajax({
      url: '/api/user',
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(function (userData) {
      console.log(userData);
      $('#user-tabs, #forms, #right-column-title').hide();
      $('#user-info').show();
      $('#full-name').text(userData.fullName);
    })
    .catch(err => {
      console.log(err);
      handleError(err.responseJSON);
    });
}

$(document).ready(function() {

  $("#login-form").on('submit', login);
  $('#signup-form').on('submit', signUp);

})