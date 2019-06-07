const okBtn = document.getElementById('ok-btn');
const cancelBtn = document.getElementById('cancel-btn');

const inputs = document.querySelectorAll('li'); // array of all <li> items

okBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  inputs.forEach((el) => {
      FieldCheck(el); // it goes above each <li> item and call function for inspection which message need to be called
  });
});

// Erase all inputs fields
cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  inputs.forEach((el) => {
      const input = el.childNodes[1];
      input.value = '';
  })
})

//this function checks class of every input field and call appropriate func to show arror message 
const FieldCheck = (el) => {
    const input = el.childNodes[1];
    const error = el.childNodes[3];
    switch(input.id) {
      case 'name':
          nameCheck(input, error);
          break;
      case 'adres-1':
          lengthCheck('Enter name in range 1 - 100 symbols', 100, input, error);
          break;
      case 'city':
          lengthCheck('Enter adres in range 1 - 50 symbols', 50, input, error);
          break;
      case 'state':
          stateCheck(input, error);
          break;
      case 'zip':
          lengthCheck('Enter 5 digits', 5, input, error); 
          break;
    }
};

// if no number is in your input this function should return null or vice versa it will return array
const hasNumber = (input) => {
    var r = /\d+/;
    return input.match(r);
};

const stateCheck = (input, error) => {
    if(!input.value) {
      errMsg('Choose you state', input, error);
    } else {
      hideError(input, error);
    }
};

const hideError = (input, error) => {
    error.textContent = '';
    input.classList.remove('border-danger');
};

//Check name field for it has no number and appropriate length
const nameCheck = (input, error) => {
    const data = input.value;
    const checkData = hasNumber(data);
    if(data.length == 0 || data.length > 100 ) {
        errMsg('Enter name in range 1 - 100 symbols', input, error);
    } else if(checkData) {
        errMsg('Use onle a - z', input, error);
      
    } else if(data.length > 0 || data.length < 100 || !parseInt(data)) {
        hideError(input, error);
    }
};

// Check apprepriate length of input
const lengthCheck = (str, number, input, error) => {
    if(input.value.length == 0 || input.value.length > number ) {
      errMsg(str, input, error);
    } else if(input.value.length > 0 || input.value.length < number) {
      hideError(input, error);
      }
};

// SHow aprropriate error message
const errMsg = (msg, input, error) => {
    error.textContent = msg;
    error.classList.add('error');
    input.classList.add('border-danger');
};



