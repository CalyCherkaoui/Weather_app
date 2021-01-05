// display error

const displayError = (error) => {
  const errorCard =  document.createElement('div');
  errorCard.setAttribute('id', 'error_card');
  errorCard.textContent = error.message;
  return errorCard;
}

export {displayError};