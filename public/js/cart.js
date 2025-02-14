window.addEventListener('DOMContentLoaded', (event) => {
    adjustProductsSectionHeight();
});

function adjustProductsSectionHeight() {
    var productsSection = document.getElementById('products');
    var tableHeight = productsSection.querySelector('table').clientHeight;
    var headerHeight = productsSection.querySelector('thead').clientHeight;
    var totalRowsHeight = 0;

    productsSection.querySelectorAll('tbody tr').forEach((row) => {
        totalRowsHeight += row.clientHeight;
    });

    productsSection.style.height = (tableHeight + headerHeight + totalRowsHeight) + 'px';
}

document.addEventListener('DOMContentLoaded', function () {
document.querySelectorAll('.remove-item').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        var productId = this.getAttribute('data-product-id');
        removeItem(productId);
    });
});
});

function removeItem(productId) {
fetch('/remove-item/' + productId, {
    method: 'DELETE',
})
.then(response => {
    if (response.ok) {
        location.reload();
    } else {
        console.error('Failed to remove item');
    }
})
.catch(error => {
    console.error('Error:', error);
});
}

