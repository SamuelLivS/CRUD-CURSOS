'use strict';

function formValidade() {
    if (document.querySelector('#form')) {

        let form = document.querySelector('#form');

        function sendForm(event) {

            event.preventDefault();

            // Recuperando os dados que o usuário colocou no form
            let curso = {
                'curso': form.childNodes[3].childNodes[1].value.toLowerCase(),
                'professor': form.childNodes[7].childNodes[1].value.toLowerCase()
            }

            // Recuperando objetos com todos os cursos e professores cadastrados
            // E filtrando se algum deles é igual aos dados inseridos pelo usuário
            let courseExists = validateCourse().filter(course => course.curso === curso.curso && course.professor === curso.professor)
            // O filter vai retornar uma lista contendo todos os registros que são iguais ao que o usuário inseriu
            // Caso nenhum registro seja igual será retornado uma lista vazia []

            // Verifica se o  curso existe no database
            // Caso exista uma mensagem de erro irá aparecer
            // Se a lista que courseExists armazena não estiver vazia, quer dizer que já existe um curso
            // Igual ao que o usuário inseriu, logo não será possível a inserção
            if (!(courseExists.length > 0)) {

                let data = new FormData(form);
                let ajax = new XMLHttpRequest();
                let token = document.querySelectorAll('input')[0].value;

                ajax.open('POST', form.action);
                ajax.setRequestHeader('X-CSRF-TOKEN', token);
                ajax.onreadystatechange = () => {

                    if (ajax.status === 200 && ajax.readyState === 4) {

                        let result = document.querySelector('#result');

                        document.querySelector('#btn-close').addEventListener('click', (event) => {
                            event.preventDefault()
                            let result = document.querySelector('#result');
                            result.classList.add('none')
                            form.childNodes[10].disabled = false
                        })

                        result.childNodes[1].innerHTML = 'Curso cadastrado com sucesso!';
                        result.classList.add('alert-success');
                        form.childNodes[10].disabled = true
                        displayToggle(result)
                        setTimeout(() => result.classList.remove('alert-success'), 3000)
                    }
                }

                ajax.send(data);
                form.reset();
            } else {
                let result = document.querySelector('#result');
                result.childNodes[1].innerHTML = '<strong>Error:</strong> Curso já cadastrado!';
                result.classList.add('alert-danger');
                form.childNodes[10].disabled = true
                displayToggle(result)
                setTimeout(() => result.classList.remove('alert-danger'), 3000)
            }
        }

        form.addEventListener('submit', sendForm, false);

    }
}
formValidade()

// Recuperando dados para impedir cadastros duplicados
function validateCourse() {
    // URL para acessar a rota especifica para recuperar os dados
    let url = "http://127.0.0.1:8000/listdatabase";

    // corpo da requisição
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    // envio da requisição
    xhttp.send();

    // back-end retorna um json com todos os registros
    // converter json para objeto
    let dataJson = JSON.parse(xhttp.response)

    // acessa o objeto que contem uma lista, e percorre essa lista, pegando apenas os 
    // nomes dos cursos e dos professores, coloca num outro objeto e retorna para a variável coursesName
    let coursesName = dataJson.models_to_return.map(course => {
        return {
            "curso": course.curso.toLowerCase(),
            "professor": course.professor.toLowerCase()
        }
    })
    // retorna lista de objetos
    return coursesName
}

// Mudando estado de visibilidade do caixa de notificação
function displayToggle(result) {
    result.classList.remove('none')
    setTimeout(() => {
        result.classList.add('none')
        form.childNodes[10].disabled = false
    }, 5000);
}

let form = document.querySelector('#form')
console.log(form)