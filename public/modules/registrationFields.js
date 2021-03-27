
export const baseRegistration = {
        name: {
            title: 'Имя*',
            placeholder: 'Имя',
            inputType: 'text',
            id: 'name',
            dataAction: 'inputEmpty',
            params: ''
        },
        surname: {
            title: 'Фамилия*',
            placeholder: 'Фамилия',
            inputType: 'text',
            id: 'surname',
            dataAction: 'inputEmpty',
            params: ''
        },
        phone: {
            title: 'Телефон*',
            placeholder: 'Телефон',
            inputType: 'tel',
            id: 'phone',
            dataAction: 'inputPhone',
            params: ''
        },
        mail: {
            title: 'Почта*',
            placeholder: 'Почта',
            inputType: 'email',
            id: 'mail',
            dataAction: 'inputMail',
            params: ''
        },
        password: {
            title: 'Пароль*',
            placeholder: 'Пароль',
            inputType: 'password',
            id: 'password',
            dataAction: 'changePwd',
            params: ''
        },
        passwordConfirm: {
            title: 'Повторите пароль*',
            placeholder: 'Пароль',
            inputType: 'password',
            id: 'passwordConfirm',
            dataAction: 'inputConfirmPwd',
            params: ''
        },
        date: {
            title: 'Дата рождения*',
            placeholder: 'дд-мм-гггг',
            inputType: 'date',
            id: 'date',
            dataAction: 'inputEmpty',
            params: 'min="1890-01-01"'
        }
    };


const getOptionsCategories = [
    'Автомобиль',
    'Электроника',
    'Одежда',
    'Хобби',
    'Запчасти',
    'Спорт',
    'Животные',
    'Услуги'
];

const getOptionsType = [
        'Новое',
        'Б/у'
    ];


/***
 * @author Max Torzhkov
 *
 * Object of input fields
 * @return {Object} - fields of createForm
 * @private
 */
export const baseCreateProduct = {
        name: {
            title: 'Название*',
            placeholder: 'Название товара',
            inputType: 'text',
            id: 'nameInput',
            dataAction: 'inputEmpty'
        },
        categories: {
            title: 'Категория*',
            placeholder: 'Категория',
            inputType: 'select',
            id: 'categorySelect',
            dataAction: 'inputEmpty',
            options: getOptionsCategories
        }, /*
            subCategories: {
                title: 'Подкатегория*',
                placeholder: 'Подкатегория',
                inputType: 'select',
                id: 'subcategorySelect',
                dataAction: 'inputEmpty',
                options: this.__getOptionsSubcategories()
            },*/
        type: {
            title: 'Тип*',
            placeholder: 'Тип',
            inputType: 'select',
            id: 'typeSelect',
            dataAction: 'inputEmpty',
            options: getOptionsType
        },
        price: {
            title: 'Цена*',
            placeholder: 'Цена (₽)',
            inputType: 'text',
            id: 'priceInput',
            dataAction: 'priceInput'
        },
        description: {
            title: 'Описание*',
            placeholder: 'Описание',
            inputType: 'textarea',
            id: 'textareaInput',
            dataAction: 'textareaInputEmpty'
        }/*,
            place: {
                title: 'Местоположение*',
                placeholder: 'Местоположение',
                inputType: 'text',
                id: 'placeInput',
                dataAction: 'inputEmpty'
            }*/
    };
