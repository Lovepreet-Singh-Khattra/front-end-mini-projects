const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const successMsg = document.getElementById('successMsg');

    showSignup.addEventListener('click', () => {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      successMsg.style.display = 'none';
      clearErrors();
    });

    showLogin.addEventListener('click', () => {
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
      successMsg.style.display = 'none';
      clearErrors();
    });

    function clearErrors() {
      document.querySelectorAll('.error-msg').forEach(el => {
        el.style.display = 'none';
      });
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      let hasError = false;

      if (!isValidEmail(email)) {
        document.getElementById('login-email-error').style.display = 'block';
        hasError = true;
      }

      if (password.length < 1) {
        document.getElementById('login-password-error').style.display = 'block';
        hasError = true;
      }

      if (!hasError) {
        // Just a demo success message (no real backend)
        successMsg.textContent = 'Login successful! (This is a demo)';
        successMsg.style.display = 'block';
        loginForm.reset();
      }
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;

      let hasError = false;

      if (name.length < 2) {
        document.getElementById('signup-name-error').style.display = 'block';
        hasError = true;
      }

      if (!isValidEmail(email)) {
        document.getElementById('signup-email-error').style.display = 'block';
        hasError = true;
      }

      if (password.length < 6) {
        document.getElementById('signup-password-error').style.display = 'block';
        hasError = true;
      }

      if (password !== confirm) {
        document.getElementById('signup-confirm-error').style.display = 'block';
        hasError = true;
      }

      if (!hasError) {
        // Just a demo success message (no real backend)
        successMsg.textContent = 'Account created successfully! (This is a demo)';
        successMsg.style.display = 'block';
        signupForm.reset();

        // Automatically switch to login after 1.5 seconds
        setTimeout(() => {
          signupForm.style.display = 'none';
          loginForm.style.display = 'block';
          successMsg.style.display = 'none';
        }, 1500);
      }
    });