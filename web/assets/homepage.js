fetch('/retuserdetails')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("password").value = user.password;
    });
    })
    .catch(error => {
        console.error('Error:', error);
    });




function openProfilePopup() {
    // Display the profile popup
    const profilePopup = document.getElementById('profilePopup');
   
    profilePopup.style.display = 'flex';
}
function closeProfilePopup() {
    // Close the profile popup
    const profilePopup = document.getElementById('profilePopup');
    profilePopup.style.display = 'none';
}
function enableEditing() {
    const form = document.getElementById('profileForm');
    const inputs = form.getElementsByTagName('input');
    const saveChangesButton = document.getElementById('saveChanges');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute('disabled');
    }

    saveChangesButton.removeAttribute('disabled');
}

function togglePassword() {
    const passwordField = document.getElementById('password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

function logout() {
    // Add logic to log out the user
    alert('Logout button clicked');
}

// Additional function for form submission (modify as needed)
// document.getElementById('profileForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     // Add logic to handle form submission and update data in the database
//     alert('Form submitted! Implement server-side logic for database update.');
// });




