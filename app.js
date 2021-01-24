// Müşteri Sınıfı
class Customer {
    constructor(name, surname, konforPuan, hizmetPuan, personelPuan, averageCustomerPoint) {
        this.name = name;
        this.surname = surname;
        this.konforPuan = konforPuan;
        this.hizmetPuan = hizmetPuan;
        this.personelPuan = personelPuan;
        this.averageCustomerPoint = averageCustomerPoint;
    }
}

//Arayüze direkt ulaşım
class UI {
    constructor() {
        this.customerName = "#name";
        this.customerSurname = "#surname";
        this.konfor = "#konfor";
        this.hizmet = "#hizmet";
        this.personel = "#personel";
        this.averagePoint = "#averagePoint";
        this.addButton = "#addBtn";
        this.customerList = "#customerList";
        this.deleteButton = '.deleteBtn';
        this.listItems = '#customerList td';
        this.konforPoint = '#konforPoint';
        this.hizmetPoint = '#hizmetPoint';
        this.personelPoint = '#personelPoint';
    }
    hideCard() {
        document.querySelector(this.customerList).style.display = 'none';

    }
}



var musteriler = [];

let ui = new UI();

if (musteriler.length == 0) {
    ui.hideCard();
}

//Müşterileri depolamaya kaydetme
function customerGetFromLS() {

    if (localStorage.length > 0) {
        var customers = JSON.parse(localStorage.getItem('musteriler'));

        customers.forEach(musteri => {

            customerAddStorage(musteri.name, musteri.surname, musteri.konforPuan, musteri.hizmetPuan, musteri.personelPuan, musteri.averageCustomerPoint);
            customerShowOnUI(musteri.name, musteri.surname, musteri.konforPuan, musteri.hizmetPuan, musteri.personelPuan);

        })

    }

}

//Silme işlemini depolamadan da yapma
function deleteFromLS(name, surname) {


    let customers = JSON.parse(localStorage.getItem('musteriler'));
    customers.forEach((musteri, index) => {
        if (musteri.name == name, musteri.surname == surname) {
            customers.splice(index, 1);
        }

    });

    localStorage.setItem('musteriler', JSON.stringify(customers));
}

//Müşterileri depolamaya ekleme
function customerAddStorage(name, surname, k, h, p, averageCustomerPoint) {

    let customer = new Customer(name, surname, k, h, p, averageCustomerPoint);

    musteriler.push(customer);

    let jsonMusteriler = JSON.stringify(musteriler);

    localStorage.setItem('musteriler', jsonMusteriler);

}

//Müşterileri ekranda gösterme
function customerShowOnUI(name, surname, k, h, p) {

    document.querySelector(ui.customerList).style.display = 'table-row-group';

    let html = `
        <tr>
            <td>${name}</td>
            <td>${surname}</td>
            <td>10/${k}</td>
            <td>10/${h}</td>
            <td>10/${p}</td>
            <td>
            <i class="fas fa-user-times mr-1 "></i>
            <button type="submit" class="btn btn-danger btn-sm" id='deleteBtn'> Kaydı Sil</button>
            </td>
        </tr>
    `;
    showAverageOnUI();
    document.querySelector(ui.customerList).innerHTML += html;


}

//Ortalamayı ekranda gösterme
function showAverageOnUI() {

    let point = 0;
    let konforPoint = 0;
    let hizmetPoint = 0;
    let personelPoint = 0;

    musteriler.forEach(customer => {

        point += parseFloat(customer.averageCustomerPoint);
        konforPoint += customer.konforPuan;
        hizmetPoint += customer.hizmetPuan;
        personelPoint += customer.personelPuan;

    })

    point = point / musteriler.length;
    konforPoint = konforPoint / musteriler.length;
    hizmetPoint = hizmetPoint / musteriler.length;
    personelPoint = personelPoint / musteriler.length;

    document.querySelector(ui.averagePoint).textContent = point.toFixed(2);
    document.querySelector(ui.konforPoint).textContent = konforPoint.toFixed(2);
    document.querySelector(ui.hizmetPoint).textContent = hizmetPoint.toFixed(2);
    document.querySelector(ui.personelPoint).textContent = personelPoint.toFixed(2);

}

//Kolaylık olması açısından inputları temizleme
function clearInputs() {

    document.querySelector(ui.customerName).value = '';
    document.querySelector(ui.customerSurname).value = '';
    document.querySelector(ui.konfor).value = '';
    document.querySelector(ui.hizmet).value = '';
    document.querySelector(ui.personel).value = '';

}

customerGetFromLS();

//Click listenerlarımız
document.querySelector(ui.addButton).addEventListener('click', Add);
document.querySelector(ui.customerList).addEventListener('click', Delete);

//Müşteri ekleme
function Add(e) {


    const name = document.querySelector(ui.customerName).value;
    const surname = document.querySelector(ui.customerSurname).value;
    const k = parseFloat(document.querySelector(ui.konfor).value);
    const h = parseFloat(document.querySelector(ui.hizmet).value);
    const p = parseFloat(document.querySelector(ui.personel).value);
    const averageCustomerPoint = ((k + p + h) / 3).toFixed(2);


    if (name == '' || surname == '' || k == '' || h == '' || p == '' || isNaN(k, p, h) || k < 0 || k > 10 || p < 0 || p > 10 || h < 0 || h > 10) {

        alert('Lütfen bütün bilgileri eksiksiz ve doğru giriniz.');

    } else {

        customerAddStorage(name, surname, k, h, p, averageCustomerPoint);
        customerShowOnUI(name, surname, k, h, p);

    }

    clearInputs();

    console.log(musteriler);

    e.preventDefault();
}

//Müşteri Silme
function Delete(e) {


    if (e.target.id == 'deleteBtn') {

        var list = e.target.parentNode.parentNode;
        var name = list.children[0].innerHTML;
        var surname = list.children[1].innerHTML;

        e.target.parentElement.parentElement.remove();


        deleteFromLS(name, surname);


        setTimeout("location.reload(true);", 50);
    }


    e.preventDefault();
}

