import _ from 'lodash';
class StoreName {
    constructor() {
        this.data = [
            { prefix: 'Hi', postfix: '' },
            { prefix: 'Pik', postfix: '' },
            { prefix: 'Mega', postfix: '' },
            { prefix: 'Micro', postfix: '' },
            { prefix: 'Space', postfix: '' },
            { prefix: 'Up', postfix: '' },
            { prefix: 'By', postfix: '' },
            { prefix: 'Jet', postfix: '' },
            { prefix: '', postfix: 'Nice' },
            { prefix: '', postfix: 'Good' },
            { prefix: '', postfix: 'Group' },
            { prefix: '', postfix: 'Make' },
            { prefix: '', postfix: 'Levo' },

        ]
    }

    getData() {
        return this.data;
    }

    getDataGenerate(name) {
            return this.data.map(item => {
                        return { name: (item.prefix + name + item.postfix).toLowerCase(), title: item.prefix + ' ' + _.startCase(_.toLower(name)) + ' ' + item.postfix };
                    })
    }
}

export default new StoreName();
