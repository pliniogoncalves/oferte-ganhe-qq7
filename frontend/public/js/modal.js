function showModal(title, message, confirmCallback = null) {
    const modalLabel = document.getElementById('modalLabel');
    const modalMessage = document.getElementById('modalMessage');
    const confirmButton = document.getElementById('modalConfirmButton');

    modalLabel.textContent = title;
    modalMessage.textContent = message;

    if (confirmCallback) {
        confirmButton.style.display = 'inline-block';
        confirmButton.onclick = () => {
            confirmCallback();
            bootstrap.Modal.getInstance(document.getElementById('customModal')).hide();
        };
    } else {
        confirmButton.style.display = 'none';
    }

    const modal = new bootstrap.Modal(document.getElementById('customModal'));
    modal.show();
}
