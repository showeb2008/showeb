// Google OAuth 2.0 Configuration



function handleCredentialResponse(response) {
  const idToken = response.credential;
  // Send the ID token to your server for verification
  fetch('/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: idToken }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Add the account to the list
        const accountsList = document.getElementById('accounts-list');
        const accountItem = document.createElement('li');
        accountItem.textContent = data.email;
        accountsList.appendChild(accountItem);

        // Show the accounts and channel sections
        document.getElementById('accounts-section').classList.remove('hidden');
        document.getElementById('channel-section').classList.remove('hidden');
      } else {
        alert('Failed to verify token.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Initialize Google Sign-In
window.onload = function () {
  google.accounts.id.initialize({
    client_id: 'YOUR_GOOGLE_CLIENT_ID',
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById('gmail-login'),
    { theme: 'outline', size: 'large' } // Customization options
  );
};

// Subscribe Button Logic
document.getElementById('subscribe-button').addEventListener('click', () => {
  const channelLink = document.getElementById('channel-link').value;
  if (!channelLink) {
    alert('Please enter a valid YouTube channel link.');
    return;
  }

  // Send the channel link to the server
  fetch('/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ channelLink }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Subscribed successfully!');
      } else {
        alert('Failed to subscribe.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
