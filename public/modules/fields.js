import fieldTemplate from '../components/RegistrationPanel/Fields/Field.hbs';
import fieldPhoneTemplate from '../components/RegistrationPanel/Fields/FieldPhone.hbs';
import fieldSelectTemplate from '../components/RegistrationPanel/Fields/FieldSelect.hbs';
import fieldAvatarTemplate from '../components/RegistrationPanel/Fields/FieldAvatar.hbs';
import fieldTextAreaTemplate from '../components/RegistrationPanel/Fields/FieldTextArea.hbs';
import fieldMultiPhotoTemplate from '../components/RegistrationPanel/Fields/FieldMultiPhoto.hbs';


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
        mail: {
            title: 'Почта*',
            placeholder: 'Почта',
            inputType: 'email',
            id: 'mail',
            dataAction: 'inputMail',
            params: '',
            template: fieldTemplate.bind()
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
        date: {
            title: 'Дата рождения*',
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
 * @author Ivan Gorshkov
 *
 * array of categories
 * @type {({title: string}|{title: string}|{title: string}|{title: string}|{title: string})[]}
 */
const getOptionsCategories = [
    {title: 'Автомобиль'},
    {title: 'Электроника'},
    {title: 'Одежда'},
    {title: 'Хобби'},
    {title: 'Запчасти'},
    {title: 'Спорт'},
    {title: 'Животные'},
    {title: 'Услуги'}
];

/***
 * @author Ivan Gorshkov
 *
 * arrat of types product
 * @type {({title: string}|{title: string})[]}
 */
const getOptionsType = [
    {title: 'Новое'},
    {title: 'Б/у'}
    ];


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
            template: fieldSelectTemplate.bind(),
            options: getOptionsType
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
            title: 'Фото',
            template: fieldMultiPhotoTemplate.bind()
        },
        address: {
            title: 'Адрес',
            placeholder: 'Укажите на карте адрес',
            inputType: 'text',
            id: 'addressInput',
            dataAction: 'tapMap',
            template: fieldTemplate.bind(),
            params: ''
        }
    };
