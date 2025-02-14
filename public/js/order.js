document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.delete-order').forEach(function (button) {
        button.addEventListener('click', function () {
            const orderId = this.getAttribute('data-order-id');
            deleteOrder(orderId);
        });
    });
});

function deleteOrder(orderId) {
    fetch('/admin/orders/' + orderId, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            location.reload();
        } else {
            console.error('Failed to delete order');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}