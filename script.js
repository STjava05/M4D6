


//*Request API 
async function getApi() {
    try {

        let datas = window.localStorage.getItem("data");
        if (datas == null) {

            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();

            // Transformazione di data in JSON
            const students = JSON.stringify(data);
            // Stockage delle informazioni dentro lo localStorage
            window.localStorage.setItem("data", students);
        } else {
            return JSON.parse(datas);
        }

    } catch (error) {
        console.log(error);
    }
}
class User {
    constructor(id, name, username, email) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
    users() {
        let root = document.getElementById('root');
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let tdName = document.createElement('td');
        let tdUsername = document.createElement('td');
        let tdEmail = document.createElement('td');

        th.innerHTML = this.id;
        tdName.innerHTML = this.name;
        tdUsername.innerHTML = this.username;
        tdEmail.innerHTML = this.email;

        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdUsername);
        tr.appendChild(tdEmail);

        root.appendChild(tr);
    }
}

//*Function render the data
function render() {
    getApi().then(data => {
        data.forEach(element => {
            console.log(element);
            let user = new User(element.id, element.name, element.username, element.email);
            user.users();
        });
    });
}

//*Function SearchValue
function searchValue(params) {
    let div = document.getElementById('search');
    div.classList.remove('disabled');

    let input = div.querySelector('input');
    console.log(input);

    input.addEventListener('keyup', function () {
        let root = document.getElementById('root');


        ///*switch case
        switch (params) {
            case 'Name':
                root.innerHTML = "";

                getApi().then(data => {

                    let filterData = data.filter(element => element.name.toLowerCase().includes(input.value.toLowerCase()));
                    filterData.forEach(element => {
                        let user = new User(element.id, element.name, element.username, element.email);
                        user.users();
                    });


                });
                break;
            case 'UserName':
                root.innerHTML = "";

                getApi().then(data => {

                    let filterData = data.filter(element => element.username.toLowerCase().includes(input.value.toLowerCase()));
                    filterData.forEach(element => {
                        let user = new User(element.id, element.name, element.username, element.email);
                        user.users();
                    });


                });
                break;
            case 'E-mail':
                root.innerHTML = "";

                getApi().then(data => {

                    let filterData = data.filter(element => element.email.toLowerCase().includes(input.value.toLowerCase()));
                    filterData.forEach(element => {
                        let user = new User(element.id, element.name, element.username, element.email);
                        user.users();
                    });


                });
                break;
            default:
                console.log('Default Error');
        }
    });


}


function main() {
    render();

    //*Event Listener
    let ul = document.getElementById('menu');
    let span = document.getElementById('drop');


    ul.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', function () {
            let section = a.innerText;
            span.innerText = "";
            span.innerText = section;
            searchValue(span.innerText)
        });
    });





}





window.onload = main;



