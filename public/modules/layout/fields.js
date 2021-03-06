import fieldTemplate from '../../components/RegistrationPanel/Fields/Field.hbs';
import fieldPhoneTemplate from '../../components/RegistrationPanel/Fields/FieldPhone.hbs';
import fieldSelectTemplate from '../../components/RegistrationPanel/Fields/FieldSelect.hbs';
import fieldAvatarTemplate from '../../components/RegistrationPanel/Fields/FieldAvatar.hbs';
import fieldTextAreaTemplate from '../../components/RegistrationPanel/Fields/FieldTextArea.hbs';
import fieldMultiPhotoTemplate from '../../components/RegistrationPanel/Fields/FieldMultiPhoto.hbs';

import {http} from '../http/http.js';
import {backUrls} from '../urls/backUrls.js';

/***
 * @author Max Torzhkov, Ivan Gorshkov
 *
 * Object of input fields
 * @return {Object} - fields of registration
 */
export const baseRegistration = {
    name: {
        title: 'Имя*',
        placeholder: 'Имя',
        inputType: 'text',
        id: 'name',
        dataAction: 'inputEmpty',
        params: '',
        template: fieldTemplate.bind()
    },
    surname: {
        title: 'Фамилия*',
        placeholder: 'Фамилия',
        inputType: 'text',
        id: 'surname',
        dataAction: 'inputEmpty',
        params: '',
        template: fieldTemplate.bind()
    },
    phone: {
        title: 'Телефон*',
        placeholder: 'Телефон',
        inputType: 'tel',
        id: 'phone',
        dataAction: 'inputPhone',
        params: '',
        template: fieldPhoneTemplate.bind()
    },
    password: {
        title: 'Пароль*',
        placeholder: 'Пароль',
        inputType: 'password',
        id: 'password',
        dataAction: 'changePwd',
        params: '',
        template: fieldTemplate.bind()
    },
    passwordConfirm: {
        title: 'Повторите пароль*',
        placeholder: 'Пароль',
        inputType: 'password',
        id: 'passwordConfirm',
        dataAction: 'inputConfirmPwd',
        params: '',
        template: fieldTemplate.bind()
    },
    mail: {
        title: 'Почта',
        placeholder: 'Почта',
        inputType: 'email',
        id: 'mail',
        dataAction: 'inputMail',
        params: '',
        template: fieldTemplate.bind()
    },
    date: {
        title: 'Дата рождения',
        placeholder: 'дд-мм-гггг',
        inputType: 'date',
        id: 'date',
        dataAction: 'inputEmpty',
        params: 'min="1890-01-01"',
        template: fieldTemplate.bind()
    },
    sex: {
        title: 'Пол',
        id: 'sex',
        template: fieldSelectTemplate.bind(),
        options: [{
            value: 'notstated',
            title: 'Не указано'
        }, {
            value: 'female',
            title: 'Женский'
        }, {
            value: 'male',
            title: 'Мужской'
        }]
    },
    avatar: {
        title: 'Фото',
        template: fieldAvatarTemplate.bind()
    }
};

/***
 *
 */
async function getCategories() {
    return http.get(backUrls.categories);
}

// eslint-disable-next-line init-declarations
export let categories;

// /***
//  * @author Ivan Gorshkov
//  *
//  * arrat of types product
//  * @type {({title: string}|{title: string})[]}
//  */
// const getOptionsType = [
//     {title: 'Новое'},
//     {title: 'Б/у'}
// ];


/***
 * @author Max Torzhkov, Ivan Gorshkov
 *
 * Object of input fields
 * @return {Object} - fields of createForm
 */
export const baseCreateProduct = {
    name: {
        title: 'Название*',
        placeholder: 'Название товара',
        inputType: 'text',
        id: 'nameInput',
        dataAction: 'inputEmpty',
        template: fieldTemplate.bind()
    },
    categories: {
        title: 'Категория*',
        placeholder: 'Категория',
        inputType: 'select',
        id: 'categorySelect',
        dataAction: 'inputEmpty',
        template: fieldSelectTemplate.bind(),
        options: []
    },
    price: {
        title: 'Цена*',
        placeholder: 'Цена (₽)',
        inputType: 'text',
        id: 'priceInput',
        dataAction: 'priceInput',
        template: fieldTemplate.bind()
    },
    description: {
        title: 'Описание*',
        placeholder: 'Описание',
        inputType: 'textarea',
        id: 'textareaInput',
        dataAction: 'textareaInputEmpty',
        template: fieldTextAreaTemplate.bind()
    },
    avatar: {
        title: 'Фото*',
        template: fieldMultiPhotoTemplate.bind()
    },
    address: {
        title: 'Адрес*',
        placeholder: 'Укажите на карте адрес',
        inputType: 'text',
        id: 'addressInput',
        dataAction: 'tapMap',
        template: fieldTemplate.bind(),
        params: ''
    }
};

getCategories()
    .then(({data}) => {
        categories = data;
        baseCreateProduct.categories.options = categories;
    });