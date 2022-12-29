'use strict';

function confirmDelete() {
    if (document.querySelector('.btnDel')) {
        let btnDel = document.querySelectorAll('.btnDel')
        btnDel.forEach(btn => {
            btn.addEventListener('click', event => {
                if (confirm('Deseja mesmo apagar este registro?')) {
                    return true;
                } else {
                    event.preventDefault();
                }
            })
        })
    }
}

confirmDelete()