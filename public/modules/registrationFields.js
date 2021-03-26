
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
