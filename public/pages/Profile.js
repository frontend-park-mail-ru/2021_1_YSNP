export class Profile {
    constructor(parent) {
        this.__parent = parent;
    }

    render() {
        this.__parent.innerHTML = '';

        this.__parent.insertAdjacentHTML('beforeend', `
            <div>Profile</div>
        `);
    }
}