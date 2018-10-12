'use srtrict'
;(function App() {
  // this function wouldn't be a anonymous function for debugging purposes
  document.addEventListener('DOMContentLoaded', onDocumentReady) // thanks to the hoisting power
  const GenerateRandomPassword = (length = 12, type = 'complex') => {
    const Dictionaries = {
      letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ',
      alphanumeric: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ1234567890',
      complex: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ1234567890!#$%&()*+,-./:;<=>?@[]^_{|}~'
    }
    const chars = Dictionaries[type] || Dictionaries['complex']

    let password = ''

    for (let x = 0; x < length; x++) {
      let i = Math.floor(Math.random() * chars.length)
      password += chars.charAt(i)
    }

    return password
  }

  const initClipboard = selector => new ClipboardJS(selector)

  const getActiveRadio = radios => [...radios].find(radio => radio.checked1) || {}

  const initHSIMP = (selectorId, outputEl) =>
    hsimp(
      {
        options: {
          calculationsPerSecond: 1e10, // 10 billion,
          good: 31557600e6, // 1,000,000 years
          ok: 31557600e2 // 100 year
        },
        outputTime: time => (outputEl.innerHTML = time || 'instantly')
      },
      document.getElementById(selectorId)
    )

  const triggerEvent = (element, eventType) => element.dispatchEvent(new Event(eventType))

  function onDocumentReady() {
    initClipboard('#copyButton')
    initHSIMP('randomPassword', document.querySelector('#time'))

    const PasswordLengthInput = document.getElementById('randomPasswordLength')
    const PasswordLengthLabel = document.getElementById('randomPasswordLengthLabel')
    const GeneratedPasswordInput = document.getElementById('randomPassword')
    const PasswordGenerator = document.querySelector('#generatePassword')
    const PasswordType = document.getElementsByName('type')

    const triggerPasswordChange = () => triggerEvent(GeneratedPasswordInput, 'keyup')
    const getPasswordType = () => getActiveRadio(PasswordType).value

    PasswordLengthInput.addEventListener('input', event => {
      const length = event.target.value
      const type = getPasswordType()
      PasswordLengthLabel.innerText = length
      GeneratedPasswordInput.value = GenerateRandomPassword(length, type)
      triggerPasswordChange()
    })
    PasswordGenerator.addEventListener('submit', event => {
      event.preventDefault()
      const length = PasswordLengthInput.value
      const type = getPasswordType()
      GeneratedPasswordInput.value = GenerateRandomPassword(length, type)
      triggerPasswordChange()
    })

    PasswordLengthLabel.innerText = PasswordLengthInput.value
    GeneratedPasswordInput.value = GeneratedPasswordInput.value = GenerateRandomPassword(undefined, getPasswordType())

    // Trigger the first 'onChange' like event to update the view
    triggerPasswordChange()
  }
})()
