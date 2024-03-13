// 1. Form Extension

export const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'ext_form' || trace.payload.name === 'ext_form',
    render: ({ trace, element }) => {

      const { user_name, user_email, user_phone } = trace.payload
      const formContainer = document.createElement('form')
  
      formContainer.innerHTML = `
            <style>
              label {
                font-size: 0.8em;
                color: #888;
              }
              input[type="text"], input[type="email"], input[type="tel"] {
                width: 100%;
                border: none;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                background: transparent;
                margin: 5px 0;
                outline: none;
              }
              .phone {
                width: 150px;
              }
              .invalid {
                border-color: red;
              }
              .submit {
                background: #28D1BE;
                border: none;
                color: white;
                padding: 10px;
                border-radius: 5px;
                width: 100%;
                cursor: pointer;
              }
            </style>
  
            <label for="name">Votre nom</label>
            <input type="text" class="name" name="name" required value="${user_name || 'Paul-Emile'}"><br><br>
  
            <label for="email">Email</label>
            <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Invalid email address" value="${user_email}"><br><br>
  
            <label for="phone">Téléphone (optionnel)</label>
            <input type="tel" class="phone" name="phone" value="${user_phone}"><br><br>
  
            <input type="submit" class="submit" value="Envoyer">
          `
  
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault()
  
        const name = formContainer.querySelector('.name')
        const email = formContainer.querySelector('.email')
        const phone = formContainer.querySelector('.phone')
  
        if (
          !name.checkValidity() ||
          !email.checkValidity() ||
          !phone.checkValidity()
        ) {
          name.classList.add('invalid')
          email.classList.add('invalid')
          phone.classList.add('invalid')
          return
        }
  
        formContainer.querySelector('.submit').remove()
  
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: { name: name.value, email: email.value, phone: phone.value },
        })
      })
  
      element.appendChild(formContainer)
    },
  }
  
  